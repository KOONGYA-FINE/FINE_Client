import React from 'react'
import { styled } from 'styled-components'
import { postType } from '../../apis/matchingGet'
import { useNavigate } from 'react-router-dom'

// export type postType = {
//     post_id: number,
//     username: string,
//     school: string,
//     gender: string,
//     nation: number,
//     created_at: string,
//     updated_at: string,
//     title: string,
//     content: string,
//     image: string,
//     interest: string,
//     user_id: number,
// }

export const CardBox = (props:postType) => {
    const navigate = useNavigate();
    const DateArr = (props.created_at)?.split("T");
    const filterArr = (props.interest)?.split(" ");
    const handleClick = () => {
        navigate(`${props.post_id}`);
    }
  return (
    <ArticleCardBox onClick={handleClick}>
        <ContentBox>
            <InfoWithScrapbox>
                <PostDate>{DateArr[0]}</PostDate>
            </InfoWithScrapbox>
            <Title>{props.title}</Title>
            <FilterBox>
                {filterArr && filterArr.map((filter) => (<Filter>{filter}</Filter>))}
            </FilterBox>
        </ContentBox>
        <NameBox>
            <div>{props.username}</div>
            <div>{props.school}</div>
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
    width: 90%;
    flex-basis: 70%;
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
