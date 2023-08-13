import { Article, Container, Header, Wrapper } from "../common/commonstyle";
import SignUpAccountForm from "../components/signup/SignUpAccountForm";

const SignupAccount = () => {
  return (
    <Container>
      <Header>헤더</Header>
      <Wrapper>
        <Article>여기에 이미지</Article>
        <Article>
          <SignUpAccountForm/>
        </Article>
      </Wrapper>
    </Container>
  );
};

export default SignupAccount;
