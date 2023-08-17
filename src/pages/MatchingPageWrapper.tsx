import { Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";
import { Outlet } from "react-router-dom";
import { registerProps } from "../store/atom";
import { useResetRecoilState } from "recoil";

const MatchingPageWrapper = () => {
  const resetRegisterProp = useResetRecoilState(registerProps);
  resetRegisterProp();
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className="matching">
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default MatchingPageWrapper;
