import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { TranslationAtom } from "../store/atom";
import { Link } from "react-router-dom";

const Login = () => {
  const [currentlang, setLang] = useRecoilState(TranslationAtom);
  const { t, i18n } = useTranslation();
  const languageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    i18n.changeLanguage(currentlang);
  }, []);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(i18n.language);
    console.log(currentlang);
  };

  return (
    <div>
      <header>
        {t(`header.login`)}
        <div ref={languageRef}>
          {t(`header.language`)}
          <ul>
            <li onClick={() => handleChangeLanguage("ko")}>한국어</li>
            <li onClick={() => handleChangeLanguage("en")}>English</li>
          </ul>
        </div>
      </header>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default Login;
