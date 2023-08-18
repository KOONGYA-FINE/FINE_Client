import { Article, Container, Header, Wrapper } from "../common/commonstyle";
import SignUpInfoForm from "../components/signup/SignUpInfoForm";
import { HeaderCompo } from "../components/utils/HeaderCompo";

const SignupInfo = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper>
        <Article className="signup-img"><img src="SignInImg.png" /></Article>
        <Article className="signup-form">
          <SignUpInfoForm />
        </Article>
      </Wrapper>
    </Container>
  );
};

export default SignupInfo;
