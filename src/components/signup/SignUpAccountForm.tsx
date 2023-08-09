interface AccountValue {
    email: string
    verifyNum: number
    password: string
    password_confirm: string
}

import { FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { regExgPassword, regExpEmail } from '../../store/regExp'
import { useTranslation } from 'react-i18next'
import { useGetLanguage } from '../../hooks/useGetLanguage'
import { EmailCheckApi, SendingVerifyApi, SignupAccountApi, VerifyCheckApi } from '../../apis/signupapi'
import { useRecoilState } from 'recoil'
import { UserInfoAtom } from '../../store/atom'
import { useNavigate } from 'react-router-dom'

const SignUpAccountForm: FC = () => {
    const { t } = useTranslation()
    useGetLanguage()
    const navigate = useNavigate();
    const {register, watch, formState:{errors, isValid}} = useForm<AccountValue>({mode: "onChange"})
    const passwordRef = useRef<string | null>(null)
    passwordRef.current = watch("password")

    const [emailIsValid, setEmailIsValid] = useState(false)
    const [verifyCodeSend, setVerifyCodeSend] = useState(false)
    const [verified, setVerified] = useState(false)
    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

    const emailSubmitHandler = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(watch("email"))
        const result = await EmailCheckApi(watch("email"));
        if (result === 400){
            alert('이미 존재하는 이메일입니다.')
            setEmailIsValid(false)
        } 
        else if (result === false){
            alert("오류 발생! 새로 고침 후 다시 진행해주세요")
        }
        else {
            setEmailIsValid(true)
            const sendEmailRes = await SendingVerifyApi(watch("email"));
            if (sendEmailRes === "email sending success") {
                setVerifyCodeSend(true)
            }
            else {
                alert("코드 전송 실패")
            }
        }
    }

    const verifyNumSubmitHandler = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('check verify num')
        const result = await VerifyCheckApi(watch("verifyNum"));
        if (result) {
            if (result === "code verification success") {
                setVerified(true);
            }
            else {
                alert("잘못된 인증코드")
            }
        }
        else {
            alert("오류 발생")
        }
        setVerified(true)
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await SignupAccountApi(watch("email"), watch("password"));
        if (result === false) {
          alert("회원가입 오류! 다시 진행해주세요");
        } 
        else {
            setUserInfo({
                user: result.data.user,
                token: result.data.token,
            });
            console.log("회원가입 성공!");
            navigate("/userinfo");
        }
    };

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
        {emailIsValid === true &&
            <VerifyMessage>You can use this email</VerifyMessage>
        }
	    <Label>{t(`signup.verifyEmail`)}</Label>
        <InputwithButtonBox>
        	<Input {...register("verifyNum", { required: true })} type="text" />
            <VerifyButton onClick={verifyNumSubmitHandler}>Verify</VerifyButton>
        </InputwithButtonBox>
        {emailIsValid === true && verifyCodeSend===true && verified===false && (
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
            <SubmitButton 
            className={isValid && verified ? "" : "unvalid"}
            type="submit"
            disabled={(!isValid)&&(!verified)}
            onClick={onSubmit}>
                {t(`signup.next`)}
            </SubmitButton>
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
    background-color: green;
    &.unvalid {
    background: rgba(151, 151, 151, 1);
    }
`