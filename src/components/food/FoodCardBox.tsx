import React from "react";
import { foodGetType } from "./FilterInfiniteScrollFoodGrid";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const FoodCardBox = (props: foodGetType) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/food/${props.id}`);
  };
  return (
    <ArticleCardBox onClick={handleClick}>
      <ContentBox>
        <img src={props.image} />
      </ContentBox>
      <NameBox>
        <Title>{props.name}</Title>
        <div>{props.address}</div>
        <div>{props.score}</div>
      </NameBox>
    </ArticleCardBox>
  );
};

export const ArticleCardBox = styled.div`
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 5px #00000075;
  height: 300px;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-basis: 60%;
  overflow: hidden;
  & > img {
    width: 110%;
  }
`;

export const Title = styled.h3`
  display: flex;
  flex-basis: 35%;
  width: 90%;
  align-items: flex-start;
  margin: 5px 0 5px 0;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: flex-start;
  & > div {
    text-align: start;
  }
`;
