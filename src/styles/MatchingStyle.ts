import { styled } from "styled-components";

export const MatchingWrapper = styled.div`
  margin: 0px 2%;
  width: 96%;
  display: flex;
  &.title {
    height: 18%;
    background-color: red;
  }
  &.interest {
    height: 12%;
    background-color: orange;
  }
  &.content {
    height: 50%;
    background-color: yellow;
    flex-wrap: wrap;
  }
  &.img {
    height: 20%;
    background-color: green;
  }
  &.editcontent {
    height: 60%;
    background-color: purple;
  }
  &.select {
    height: 22%;
    background-color: blue;
    flex-wrap: wrap;
  }
`;

export const MatchingWrapperBox = styled.div`
  width: 80%;
  height: 60%;
  border: 1px solid #000;
  border-radius: 5px;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 10% auto 0px;
  &.edit {
    height: 78%;
  }
`;

export const MatchingButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 40px;
  padding: 15px;
  gap: 8px;
  border-radius: 5px;
  background: rgba(34, 170, 85, 0.98);
  color: white;
`;
