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
  margin-top: 20px;
  color: #25ab58;
  background-color: rgba(240, 248, 243, 1);
  & > h2 {
    margin: 0px;
    padding: 0px;
  }
  &.search {
    justify-content: space-around;
    align-items: center;
  }
  &.register {
    margin-top: 0px;
    flex-basis: 5%;
  }
`;

export const ReviewInputWrapper = styled.div`
  width: 80vw;
  height: 93px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px auto;
  .tag {
    flex-direction: row;
  }
`;
