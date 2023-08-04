import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { TranslationAtom } from "../store/atom";
import { Link } from "react-router-dom";
import { Article, Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";

const Login = () => {
  const currentlang = useRecoilValue(TranslationAtom);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(currentlang);
  }, [currentlang]);

  return (
    <Container>
      <HeaderCompo />
      <Wrapper>
        <Article>여기에 메인 사진</Article>
        <Article>
          여기에 로그인 컴포넌트
          <Link to="/signup">{t(`header.register`)}</Link>
        </Article>
      </Wrapper>
    </Container>
  );
};

export default Login;
