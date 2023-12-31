import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 92vw;
  height: 92vh;
  border-color: transparent;
  &.food {
    background-image: url(/Vector2.png);
    background-repeat: no-repeat;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-basis: 10%;
  width: 90%;
  border: 1px solid white;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-basis: 88%;
  width: 90%;
  border-color: transparent;
  &.matching {
    flex-direction: column;
  }
  &.landing {
    flex-direction: column;
    overflow: visible;
  }
  &.mypage {
    flex-direction: column;
    align-items: center;
  }
`;

export const Article = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  &.signup-img {
    flex-basis: 40%;
  }
  &.signup-form {
    flex-basis: 60%;
  }
`;

export const CommonFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.flex-end {
    margin: 0px 2%;
    width: 96%;
    justify-content: flex-end;
    padding: 0px 10px 40px 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.6);
  }
  &.space-between {
    justify-content: space-between;
  }
`;
