import { Outlet } from "react-router-dom";
import { HeaderCompo } from "../../components/utils/HeaderCompo";
import { Container, Wrapper } from "../../common/commonstyle";

const FoodMain = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className="matching">
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default FoodMain;
