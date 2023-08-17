import React from 'react'
import { foodGetType } from './FilterInfiniteScrollFoodGrid'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const FoodCardBox = (props:foodGetType) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/food/${props.id}`);
    }
  return (
    <ArticleCardBox onClick={handleClick}>
        <ContentBox>
            여기에 이미지
        </ContentBox>
        <NameBox>
            <Title>{props.name}</Title>
            <div>{props.address}</div>
            <div>{props.score}</div>
        </NameBox>
    </ArticleCardBox>
  )
}

const ArticleCardBox = styled.div`
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  height: 250px;
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-basis: 60%;
    background-color: coral;
`

const InfoWithScrapbox = styled.div`
    display: flex;
    width: 90%;
    flex-basis: 25%;
    border: 1px solid black;
`

const PostDate = styled.div`
    height: 70%;
    border: 1px solid black;
    border-radius: 5px;
`

const Title = styled.h3`
    display: flex;
    flex-basis: 35%;
    width: 90%;
    border: 1px solid black;
    align-items: flex-start;
    margin: 0px;
`

const FilterBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 90%;
    flex-basis: 40%;
    border: 1px solid black;
`

const Filter = styled.div`
    display: flex;
    background-color: gray;
    border-radius: 5px;
    height: 30%;
    padding: 1% 4% 1% 4%;
    margin: 2%;
`

const NameBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: flex-start;
`

