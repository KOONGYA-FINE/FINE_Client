interface AccountValue {
    email: string
    verifyNum: string
    password: string
    password_confirm: string
}

import { FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { regExgPassword, regExpEmail } from '../../store/regExp'
import { useTranslation } from 'react-i18next'
import { useGetLanguage } from '../../hooks/useGetLanguage'
import { useRoutePageFunc } from '../../hooks/useRoutePageFunc'
import { EmailCheckApi, SignupAccountApi } from '../../apis/signupapi'

const SignUpAccountForm: FC = () => {
    const { t } = useTranslation()
    useGetLanguage()
    const navigate = useRoutePageFunc;
    const {register, watch, formState:{errors}} = useForm<AccountValue>({mode: "onChange"})
    const passwordRef = useRef<string | null>(null)
    passwordRef.current = watch("password")

    const [user, setUser] = useState()
    const [emailIsSubmit, setEmailIsSubmit] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [verified, setVerified] = useState(false)

    const emailSubmitHandler = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await EmailCheckApi(watch("email"));
        if (result === false){
            console.log('check email')
        } else {
            setEmailIsValid(true)
        }
        setEmailIsSubmit(true)
    }

    const verifyNumSubmitHandler = () => {
        console.log('check verify num')
        setVerified(true)
    }

    // const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     const result = await SignupAccountApi(watch("email"), watch("password"));
    //     if (result === false) {
    //       alert("회원가입 오류! 다시 진행해주세요");
    //     } 
    //     else if (verified === false){
    //         alert("인증되지 않은 이메일입니다.");
    //     }
    //     else {
    //         setUser(result.data);
    //         alert("회원가입 성공!");
    //         console.log(user);
    //         navigate('userinfo');
    //     }
    // };

  return (
    <>
    <h3>{t(`signup.create`)}</h3>
    <Form>
	    <Label>{t(`signup.emailAdress`)}</Label>
        <InputwithButtonBox>
            <Input {...register("email", 
                { required: true, pattern: { 
                    value : regExpEmail,
                    message : "email address should be valid" 
                }
                })} 
            type="email"
            placeholder="xxxx@xxx.ac.kr"/>
            <VerifyButton onClick={emailSubmitHandler}>{t(`signup.checkEmail`)}</VerifyButton>
        </InputwithButtonBox>
        {errors.email && errors.email.type === "pattern" && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        {emailIsSubmit === true && ((emailIsValid === true) ? 
            <VerifyMessage>You can use this email</VerifyMessage>
            :
            <ErrorMessage>email already exist</ErrorMessage>
        )}
	    <Label>{t(`signup.verifyEmail`)}</Label>
        <InputwithButtonBox>
        	<Input {...register("verifyNum", { required: true })} type="text" />
            <VerifyButton onClick={verifyNumSubmitHandler}>Verify</VerifyButton>
        </InputwithButtonBox>
        {emailIsSubmit === true && verified===false && (
            <ErrorMessage>Please enter your verify number from your email account</ErrorMessage>
        )}
        {verified===true && (
            <VerifyMessage>verified!</VerifyMessage>
        )}
	    <Label>{t(`signup.createPassword`)}</Label>
        <Input {...register("password", 
        { required: true, minLength: 8 , pattern: regExgPassword})} type="password" />
        {errors.password&&errors.password.type === "minLength" && (
            <ErrorMessage>must be more than 8 char</ErrorMessage>
        )}
        {errors.password&&errors.password.type === "pattern" && (
            <ErrorMessage>a char or more, and a number or more</ErrorMessage>
        )}
	    <Label>{t(`signup.confirmPassword`)}</Label>
        <Input {...register("password_confirm", {
          	required: true,
            validate: {
                check: (val) => {
                    if ((passwordRef.current) !== val) {
                        return "비밀번호가 일치하지 않습니다.";
                    }
                }
            },})} type="password" />
        {errors.password_confirm && (
            <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
        )}
        <FormSubmitButtonWrapper>
            <PrevPageButton>{t(`signup.previous`)}</PrevPageButton>
            <SubmitButton onClick={navigate("userinfo")}>{t(`signup.next`)}</SubmitButton>
        </FormSubmitButtonWrapper>
    </Form>
    </>
  )
}

export default SignUpAccountForm

const Form = styled.form`
    display: flex;
    width : 60%;
    flex-direction: column;
`

const Label = styled.div`
    display: flex;
    justify-content: left;
    margin-top : 10px;
`

const InputwithButtonBox = styled.div`
    display: flex;
    flex-basis: 60%;
    height: 10%;
`

const VerifyButton = styled.button`
    display: flex;
    flex-basis: 20%;
    align-items: center;
    background-color: green;
    border-radius: 0px;
`

const Input = styled.input`
    display: flex;
    flex-basis : 70%;
`

const ErrorMessage = styled.div`
    display: flex;
    justify-content: left;
    color : red;
`

const VerifyMessage = styled.div`
    display: flex;
    justify-content: left;
    color : green;
`

// const PasswordMessage = styled.div<{isActive: boolean}>`
//     display: flex;
//     justify-content: left;
//     color: ${(props) => (props.isActive ? 'green':'red')}
// `

const FormSubmitButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20%;
    flex-basis: 80%;
    height: 15%;
`
const PrevPageButton = styled.button`
    display: flex;
    background-color: green;
`

const SubmitButton = styled.button`
    display: flex;
    background-color: green
`