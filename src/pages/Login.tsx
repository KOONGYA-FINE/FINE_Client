import { Article, Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo, KatahdinFont } from "../components/utils/HeaderCompo";
import { styled } from "styled-components";
import Loginform from "../components/login/Loginform";

const Login = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper>
        <Article>여기에 메인 사진</Article>
        <Article>
          <Loginlogo src="/FineLogo.png" />
          <KatahdinFont style={{ fontSize: "30px" }}>
            WELCOME TO FINE!
          </KatahdinFont>
          <Loginform />
        </Article>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Loginlogo = styled.img`
  width: 237px;
  height: 198px;
  margin-bottom: 30px;
`;
