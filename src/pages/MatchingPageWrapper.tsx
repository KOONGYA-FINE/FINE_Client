import { Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";
import { Outlet } from "react-router-dom";
import { registerProps } from "../store/atom";
import { useResetRecoilState } from "recoil";
// import { HeaderWrapper } from "./MatchingMain";
import { styled } from "styled-components";

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

export const HeaderWrapper = styled.div`
  display: flex;
  flex-basis: 10%;
  width: 90%;
  align-items: flex-end;
  background-color: rgba(240, 248, 243, 1);
  & > h2 {
    margin: 0px;
    padding: 0px;
  }
`;