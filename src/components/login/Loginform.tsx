import { styled } from "styled-components";
import "../../common/font.css";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { TranslationAtom } from "../../store/atom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Loginform = () => {
  const currentlang = useRecoilValue(TranslationAtom);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(currentlang);
  }, [currentlang]);
  return (
    <>
      <LoginInputWrapper>
        <PoppinsFont>Email Adress</PoppinsFont>
        <LoginInput />
      </LoginInputWrapper>
      <LoginInputWrapper>
        <PoppinsFont>Password</PoppinsFont>
        <LoginInput />
      </LoginInputWrapper>
      <LoginButtonWrapper>
        <LoginButton>{t(`header.login`)}</LoginButton>
        <OrPart>
          <OrLine></OrLine>
          <OrText>or</OrText>
          <OrLine></OrLine>
        </OrPart>
        <Link to="/signup">
          <LoginButton>{t(`header.register`)}</LoginButton>
        </Link>
      </LoginButtonWrapper>
    </>
  );
};

export default Loginform;

const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
const LoginButtonWrapper = styled.div`
  margin-top: 47px;
  width: 534px;
  height: 225px;
`;

const OrPart = styled.div`
  margin: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 56px;
`;

const OrLine = styled.div`
  width: 150px;
  height: 1px;
  border-bottom: solid 1px black;
`;

const OrText = styled.div`
  color: #000;
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoginButton = styled.button`
  width: 434px;
  padding: 15px;
  gap: 8px;
  border-radius: 5px;
  background: rgba(34, 170, 85, 0.98);
  color: white;
`;

export const PoppinsFont = styled.div`
  color: #000;
  font-family: "Poppins";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoginInput = styled.input`
  display: flex;
  align-items: flex-start;
  width: 434px;
  padding: 15px 0px;
  border-radius: 5px;
  border: 1px solid #000;
`;
