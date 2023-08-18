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
            <div className='name'>{props.username}</div>
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
  border: 1px solid black;
  border-radius: 10px;
  height: 270px;
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    flex-basis: 70%;
    background-color: #d3e8db9a;
    border-radius: 10px;
`

const InfoWithScrapbox = styled.div`
    display: flex;
    width: 90%;
    flex-basis: 25%;
    align-items: center;
`

const PostDate = styled.div`
    background-color: white;
    padding: 0 2px 0 2px;
    border-radius: 10px;
`

const Title = styled.h3`
    display: flex;
    flex-basis: 35%;
    width: 90%;
    text-align: start;
    align-items: flex-start;
    margin: 0px;
`

const FilterBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 90%;
    flex-basis: 40%;
`

const Filter = styled.div`
    display: flex;
    border: 1px solid #0000007e;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 30%;
    padding: 1% 4% 1% 4%;
    margin: 2%;
    color: #0000007e;
`

const NameBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: flex-start;
    justify-content: center;
    & > .name {
        font-weight: bold;
    }
`
