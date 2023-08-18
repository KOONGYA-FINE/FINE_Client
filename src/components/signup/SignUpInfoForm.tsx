import Select from 'react-select'
import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useGetLanguage } from '../../hooks/useGetLanguage'
import { useRecoilValue } from 'recoil'
import { TranslationAtom } from '../../store/atom'
import { genderOptionsEN, genderOptionsKO, nationOptionsEN, nationOptionsKO } from '../../store/optiondata'
import { FC, useState } from 'react'
import { SignUpUserInfoApi } from '../../apis/signupapi'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserInfoAtom } from '../../store/atom'

interface UserInfoValue {
    name: string
    nation: number
    birth: string
    school: string
    gender: string
}

const SignUpInfoForm : FC = () => {
    const currentLang = useRecoilValue(TranslationAtom)
    const { t } = useTranslation()
    useGetLanguage()
    const navigate = useNavigate();
    const {register, watch, control, formState:{errors, isValid}} = useForm<UserInfoValue>({mode: "onChange"})
    const userInfo = useRecoilValue(UserInfoAtom);

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // console.log(userInfo.token)
        // console.log(userInfo.token['access_token'])
        const result = await SignUpUserInfoApi(watch("name"), watch("nation"), watch("birth"), watch("school"), watch("gender"), userInfo.token['access_token']);
        if (result === false) {
            alert("오류");
        } else {
            alert("회원가입 성공!");
            console.log(result.data)
            navigate('/');
        }
    };

  return (
    <>
    <h3>{t(`signup.personal`)}</h3>
    <Form>
        <Label>{t(`signup.name`)}<MandatoryBtn>*</MandatoryBtn></Label>
        <Input {...register("name", { required: true })} type="name" placeholder="enter your name" />
        <Label>{t(`signup.birth`)}<MandatoryBtn>*</MandatoryBtn></Label>
        <Input {...register("birth", { required: true })} type="date" />
        <Label>{t(`signup.gender`)}<MandatoryBtn>*</MandatoryBtn></Label>
        <Controller 
            name="gender"
            control={control}
            render={({field: {onChange, value}}) => (
                <Select 
                options={(currentLang === "en") ? genderOptionsEN : genderOptionsKO}
                value={(currentLang === "en") ? 
                    genderOptionsEN.find((c) => c.value === value) 
                    :
                    genderOptionsKO.find((c) => c.value === value)
                }
                onChange={(option) => (onChange(option?.value))} />
        )} />
        <Label>{t(`signup.nationality`)}<MandatoryBtn>*</MandatoryBtn></Label>
        <Controller 
            name="nation"
            control={control}
            render={({field: {onChange, value}}) => (
                <Select 
                options={(currentLang === "en") ? nationOptionsEN : nationOptionsKO}
                value={(currentLang === "en") ? 
                    nationOptionsEN.find((c) => c.value === value) 
                    :
                    nationOptionsKO.find((c) => c.value === value)
                }
                onChange={(option) => (onChange(option?.value))} />
        )} />
        <Label>{t(`signup.school`)}<MandatoryBtn>*</MandatoryBtn></Label>
        <Input {...register("school", { required: true })} type="text" />

        <FormSubmitButtonWrapper>
            <PrevPageButton>{t(`signup.previous`)}</PrevPageButton>
            <SubmitButton 
            className={isValid ? "" : "unvalid"}
            type="submit"
            disabled={!isValid}
            onClick={onSubmit}>{t(`signup.complete`)}</SubmitButton>
        </FormSubmitButtonWrapper>
    </Form>
    </>
  )
}

export default SignUpInfoForm

const Form = styled.form`
    display: flex;
    width : 70%;
    flex-direction: column;
`

const Label = styled.div`
    display: flex;
    justify-content: left;
    margin-top : 10px;
`

const Input = styled.input`
    display: flex;
    flex-basis : 70%;
`

const FormSubmitButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20%;
    flex-basis: 80%;
    height: 15%;
`
const PrevPageButton = styled.button`
    display: flex;
    color: white;
    background-color: #22AA55;
`

const SubmitButton = styled.button`
    display: flex;
    color: white;
    background-color: #22AA55;
    &.unvalid {
    background: rgba(151, 151, 151, 1);
    }
`

const MandatoryBtn = styled.a`
    color: red;
`