import { styled } from "styled-components";
import "../../common/font.css";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { TranslationAtom } from "../../store/atom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Loginform = () => {
  const currentlang = useRecoilValue(TranslationAtom);
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("아직 안되지롱!");
  };
  useEffect(() => {
    i18n.changeLanguage(currentlang);
  }, [currentlang]);
  const regExpEm =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}ac\.kr$/;
  const regExgPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const {
    register,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });
  return (
    <>
      <LoginInputDiv>
        <PoppinsFont>Email Adress</PoppinsFont>
        <LoginInputWrapper>
          <img src="/Letter.png" style={{ marginRight: "24px" }} />
          <LoginInput
            type="email"
            id="userEmail"
            required
            {...register("email", { required: true, pattern: regExpEm })}
          />
        </LoginInputWrapper>
        {errors.email?.type === "required" && <div>{t(`login.emailMsg`)}</div>}
        {errors.email?.type === "pattern" && <div>{t(`login.emailMsg`)}</div>}
      </LoginInputDiv>
      <LoginInputDiv>
        <PoppinsFont>Password</PoppinsFont>
        <LoginInputWrapper>
          <img src="/Lock.png" style={{ marginRight: "24px" }} />
          <LoginInput
            type={show ? "text" : "password"}
            id="userPw"
            required
            {...register("password", { required: true, pattern: regExgPw })}
          />
        </LoginInputWrapper>
        {errors.password?.type === "required" && (
          <div>{t(`login.passwordMsg`)}</div>
        )}
        {errors.password?.type === "pattern" && (
          <div>{t(`login.passwordMsg`)}</div>
        )}
      </LoginInputDiv>
      <LoginButtonWrapper>
        <LoginButton
          className={isValid ? "" : "unvalid"}
          type="submit"
          disabled={!isValid}
          onClick={onSubmit}
        >
          {t(`header.login`)}
        </LoginButton>
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

const LoginInputDiv = styled.div`
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
  &.unvalid {
    background: rgba(151, 151, 151, 1);
  }
`;

export const PoppinsFont = styled.div`
  color: #000;
  font-family: "Poppins";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoginInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 434px;
  height: 20px;
  padding: 15px 10px;
  border-radius: 5px;
  border: 1px solid #000;
`;

const LoginInput = styled.input`
  width: 85%;
  height: 20px;
  padding: 15px 10px;
  border: transparent;
`;
