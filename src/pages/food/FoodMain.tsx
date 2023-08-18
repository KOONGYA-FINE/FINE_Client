import { Outlet } from "react-router-dom";
import { HeaderCompo } from "../../components/utils/HeaderCompo";
import { Container, Wrapper } from "../../common/commonstyle";
import { styled } from "styled-components";

const FoodMain = () => {
  return (
    <>
      <HeaderCompo />
      <Container className="food">
        <Wrapper className="matching">
          <Outlet />
        </Wrapper>
      </Container>
    </>
  );
};

export default FoodMain;

export const HeaderFoodWrapper = styled.div`
  display: flex;
  flex-basis: 10%;
  width: 100%;
  align-items: flex-end;
  background-color: rgba(240, 248, 243, 1);
  & > h2 {
    margin: 0px;
    padding: 0px;
  }
  &.search {
    margin-top: 20px;
    justify-content: space-around;
    align-items: center;
    color: #25ab58;
  }
`;
