import { Article, Container, Header, Wrapper } from "../common/commonstyle";
import SignUpInfoForm from "../components/signup/SignUpInfoForm";
import { HeaderCompo } from "../components/utils/HeaderCompo";

const SignupInfo = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper>
        <Article className="signup-img">여기에 이미지</Article>
        <Article className="signup-form">
          <SignUpInfoForm />
        </Article>
      </Wrapper>
    </Container>
  );
};

export default SignupInfo;
