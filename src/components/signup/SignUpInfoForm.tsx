import Select from 'react-select'
import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useGetLanguage } from '../../hooks/useGetLanguage'
import { useRecoilValue } from 'recoil'
import { TranslationAtom } from '../../store/atom'
import { genderOptionsEN, genderOptionsKO, nationOptionsEN, nationOptionsKO } from '../../store/optiondata'
import { useState } from 'react'
import { SignUpUserInfoApi } from '../../apis/signupapi'
import { useRoutePageFunc } from '../../hooks/useRoutePageFunc'

const SignUpInfoForm = () => {
    const currentLang = useRecoilValue(TranslationAtom)
    const { t } = useTranslation()
    useGetLanguage()
    const navigate = useRoutePageFunc;
    
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [gender, setGender] = useState<string>();
    const [nation, setNation] = useState<number>();
    const [school, setSchool] = useState<string>('');

    // const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     const result = await SignUpUserInfoApi(name, nation, birth, school, gender);
    //     if (result === false) {
    //         alert("오류");
    //     } else {
    //         alert("회원가입 성공!");
    //         console.log(result.data)
    //         navigate('/');
    //     }
    // };

  return (
    <>
    <Form>
        <Label>{t(`signup.name`)}</Label>
        <Input type='text' onChange={(e) => setName(e.target.value)} />
        <Label>{t(`signup.birth`)}</Label>
        <Input type='date' onChange={(e) => setBirth(e.target.value)} />
        <Label>{t(`signup.gender`)}</Label>
        <Select options={
            (currentLang === "en") ? genderOptionsEN : genderOptionsKO }
            placeholder={<div>{t(`signup.gender`)}</div>} 
            onChange={(e) => setGender(e?.value)} />
        <Label>{t(`signup.nationality`)}</Label>
        <Select options={
            (currentLang === "en") ? nationOptionsEN : nationOptionsKO}
            placeholder={<div>{t(`signup.nationality`)}</div>}
            onChange={(e) => setNation(e?.value)} />
        <Label>{t(`signup.school`)}</Label>
        <Input type='text' onChange={(e) => setSchool(e.target.value)} />

        <FormSubmitButtonWrapper>
            <PrevPageButton>{t(`signup.previous`)}</PrevPageButton>
            <SubmitButton>{t(`signup.complete`)}</SubmitButton>
        </FormSubmitButtonWrapper>
    </Form>
    </>
  )
}

export default SignUpInfoForm

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
    background-color: green;
`

const SubmitButton = styled.button`
    display: flex;
    background-color: green
`