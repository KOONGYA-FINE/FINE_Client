import { styled } from "styled-components";
import "../../common/font.css";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { UserInfoAtom } from "../../store/atom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginApi } from "../../apis/loginapi";
import {
  useRoutePageFunc,
  useWithRoutePageFunc,
} from "../../hooks/useRoutePageFunc";
import { regExgPassword, regExpEmail } from "../../store/regExp";
import { PoppinsFont } from "../../styles/loginFontStyle";
import { useGetLanguage } from "../../hooks/useGetLanguage";
const Loginform = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  useGetLanguage();
  const regExpEm = regExpEmail;
  const regExgPw = regExgPassword;
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const navigate = useWithRoutePageFunc();
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await LoginApi(watch("email"), watch("password"));
    if (result.status === 200) {
      setUserInfo({
        user: result.data.user,
        token: result.data.token,
      });
      alert("로그인 성공!");
      navigate("matching/1");
    } else if (result.status === 403) {
      setUserInfo({
        user: result.data.user,
        token: result.data.token,
      });
      alert(`${result.data.message}`);
      navigate("userinfo");
    } else {
      alert(`${result}`);
      () => {
        navigate("signup");
      };
    }
    console.log(userInfo);
  };
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
        <LoginButton onClick={useRoutePageFunc("signup")}>
          {t(`header.register`)}
        </LoginButton>
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
