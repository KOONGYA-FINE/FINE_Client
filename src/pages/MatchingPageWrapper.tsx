import { Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";
import { Outlet } from "react-router-dom";
import { registerProps } from "../store/atom";
import { useResetRecoilState } from "recoil";
import { HeaderWrapper } from "./MatchingMain";

const MatchingPageWrapper = () => {
  const resetRegisterProp = useResetRecoilState(registerProps);
  resetRegisterProp();
  return (
    <Container>
      <HeaderCompo />
      <HeaderWrapper>
        <h2>Friend Matching</h2>
      </HeaderWrapper>
      <Wrapper className="matching">
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default MatchingPageWrapper;
