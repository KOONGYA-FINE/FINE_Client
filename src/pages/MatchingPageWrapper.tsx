import { Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";
import { Outlet } from "react-router-dom";

const MatchingPageWrapper = () => {
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
