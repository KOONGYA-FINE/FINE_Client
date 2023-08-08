import { Article, Container, Header, Wrapper } from "../common/commonstyle";
import SignUpInfoForm from "../components/signup/SignUpInfoForm";

const SignupInfo = () => {
  return (
    <Container>
      <Header>헤더</Header>
      <Wrapper>
        <Article>여기에 이미지</Article>
        <Article>
          <SignUpInfoForm />
        </Article>
      </Wrapper>
    </Container>
  );
};

export default SignupInfo;
