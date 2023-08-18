import { styled } from "styled-components";

export const MatchingWrapper = styled.div`
  margin: 0px 2%;
  width: 96%;
  display: flex;
  &.title {
    height: 30%;
    padding: 10px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    border-top: 1px solid #000;
    border-bottom: 1px solid rgba(151, 151, 151, 0.6);
    .titleFont {
      font-size: 25px;
      font-weight: 500;
    }
    .interestWrapper {
      display: flex;
    }
  }
  &.interest {
    height: 12%;
    background-color: orange;
  }
  &.content {
    height: 45%;
    padding: 10px;
    flex-wrap: wrap;
  }
  &.img {
    height: 25%;
    background-color: green;
  }
  &.edittitle {
    height: 20px;
  }
  &.editcontent {
    height: 40%;
    background-color: rgba(95, 0, 255, 0.1);
    flex-direction: column;
    align-items: flex-end;
  }
  &.select {
    height: 40%;
    background-image: url(/interestWrapper.png);
    background-size: cover;
    flex-wrap: wrap;
    overflow: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const MatchingWrapperBox = styled.div`
  width: 80vw;
  height: 35vh;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 4% auto 0px;
  &.edit {
    height: 60vh;
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
  margin: 0px 5px;
  &:disabled {
    background-color: rgba(151, 151, 151, 0.6);
  }
  &:hover {
    border-color: transparent;
  }
  &.unvalid {
    background: rgba(151, 151, 151, 1);
  }
  &.cancel {
    background-color: white;
    color: black;
    border-color: rgba(151, 151, 151, 0.6);
  }
  &.moving {
    background-color: transparent;
    color: rgba(34, 170, 85, 0.98);
  }
`;

export const MatchingTextArea = styled.textarea`
  width: 98.5%;
  height: 90%;
`;
