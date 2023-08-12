import { useTranslation } from "react-i18next";
import { CommonFlex, Header } from "../../common/commonstyle";
import { useRecoilState } from "recoil";
import { TranslationAtom } from "../../store/atom";
import { useRef } from "react";
import "../../common/font.css";
import { styled } from "styled-components";
import icons from "../../common/icons";
import {
  useRoutePageFunc,
  useWithRoutePageFunc,
} from "../../hooks/useRoutePageFunc";
import { KatahdinFont } from "../../styles/loginFontStyle";
import { LogoutApi } from "../../apis/loginapi";

export const HeaderCompo = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const displayLanguageButton = refreshToken ? false : true;
  const languageRef = useRef<null | HTMLDivElement>(null);
  const [langInfo, setLangInfo] = useRecoilState(TranslationAtom);
  const { i18n } = useTranslation();
  const handleChangeLanguage = () => {
    if (langInfo === "en") {
      i18n.changeLanguage("ko");
      setLangInfo("ko");
    } else {
      i18n.changeLanguage("en");
      setLangInfo("en");
    }
  };
  const token = localStorage.getItem("access_token") as string;
  const navigate = useWithRoutePageFunc();
  const logoutFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await LogoutApi(token);
    if (result !== false) {
      alert("로그아웃 되었습니다");
      localStorage.clear();
      navigate("");
    } else {
      alert("failed");
    }
  };
  return (
    <Header>
      <CommonFlex>
        <LogoImage src="/FineLogo.png" />
        <KatahdinFont>FINE</KatahdinFont>
      </CommonFlex>
      <CommonFlex>
        <PoppinsFont>Home</PoppinsFont>
        <PoppinsFont onClick={useRoutePageFunc("matching/main")}>
          Friend Matching
        </PoppinsFont>
        <PoppinsFont>Restaurant review</PoppinsFont>
      </CommonFlex>
      <CommonFlex ref={languageRef}>
        {displayLanguageButton && (
          <>
            {icons.globe}
            <ChangeLanguageBtn onClick={() => handleChangeLanguage()}>
              {langInfo === "ko" ? "KOR" : "ENG"}
            </ChangeLanguageBtn>
          </>
        )}
        {token && (
          <>
            <LoginButton onClick={logoutFunc}>Logout</LoginButton>
          </>
        )}
        {!token && (
          <LoginButton
            onClick={() => {
              navigate("");
            }}
          >
            Login
          </LoginButton>
        )}
      </CommonFlex>
    </Header>
  );
};

const LogoImage = styled.img`
  width: 79px;
  height: 66px;
`;

const PoppinsFont = styled.button`
  color: #000;
  font-family: "Poppins";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  border-color: transparent;
`;

const ChangeLanguageBtn = styled.div`
  padding: 0px;
  background-color: transparent;
  border-color: transparent;
  color: #676363;
  font-family: "Poppins";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 20px;
`;

const LoginButton = styled.button`
  border-radius: 5px;
  background-color: rgba(34, 170, 85, 0.98);
  padding: 8px 20px;
  gap: 8px;
  border-color: transparent;
  color: white;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
`;
