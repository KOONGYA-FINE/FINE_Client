import { useRecoilValue } from "recoil";
import { Container, Wrapper } from "../common/commonstyle";
import { HeaderCompo } from "../components/utils/HeaderCompo";
import { Outlet, useParams } from "react-router-dom";
import { UserInfoAtom } from "../store/atom";

const MatchingPageWrapper = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const userInfo = useRecoilValue(UserInfoAtom);
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
