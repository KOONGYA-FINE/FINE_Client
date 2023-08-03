import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { TranslationAtom } from "../store/atom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Signup = () => {
  const [currentlang, setLang] = useRecoilState(TranslationAtom);
  const { t, i18n } = useTranslation();
  const languageRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    i18n.changeLanguage(currentlang);
    console.log(currentlang);
  }, []);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(i18n.language);
    console.log(currentlang);
  };
  return (
    <div>
      <header>
        {t(`header.register`)}
        <div ref={languageRef}>
          {t(`header.language`)}
          <ul>
            <li onClick={() => changeLanguage("ko")}>한국어</li>
            <li onClick={() => changeLanguage("en")}>English</li>
          </ul>
        </div>
      </header>
      <Link to="/">로그인</Link>
    </div>
  );
};

export default Signup;
