import { Article, Container, Header, Wrapper } from "../common/commonstyle";
import SignUpAccountForm from "../components/signup/SignUpAccountForm";
import { HeaderCompo } from "../components/utils/HeaderCompo";

const SignupAccount = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper>
        <Article className="signup-img"><img src="SignInImg.png" /></Article>
        <Article className="signup-form">
          <SignUpAccountForm/>
        </Article>
      </Wrapper>
    </Container>
  );
};

export default SignupAccount;
