import { Article, Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";
import { styled } from "styled-components";
import Loginform from "../components/login/Loginform";
import { KatahdinFont } from "../styles/loginFontStyle";

const Login = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper>
        <Article><img src="SignInImg.png" /></Article>
        <Article>
          <Loginlogo src="/FineLogoClear.png" />
          <KatahdinFont style={{ fontSize: "30px", marginBottom: "41px" }}>
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
  width: 30%;
  margin-bottom: 30px;
`;
