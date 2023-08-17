import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 92vw;
  height: 92vh;
  border: 1px solid white;
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
  border: 1px solid white;
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
`;

export const CommonFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
