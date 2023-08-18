import React from 'react'
import { styled } from 'styled-components'

interface LandingMatchingProps {
  title: string;
  interest: string;
  username: string;
  school: string;
}

export const MachingCardBox: React.FunctionComponent<LandingMatchingProps> = (props) => {
  const filterArr = (props.interest)?.split(" ");
  return (
    <CardBox>
      <h3>{props.title}</h3>
      <FilterBox>
        {filterArr && filterArr.map((filter) => (<Filter>{filter}</Filter>))}
      </FilterBox>
      <UserInfoBox>
        <h2>{props.username}</h2>
        <div>{props.school}</div>
      </UserInfoBox>
    </CardBox>
  )
}

const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 25%;
    justify-content: space-between;
    align-items: flex-start;
    height: 70%;
    box-shadow: 5px 10px 20px #22aa5684;
    /* border: 1px solid black; */
    margin: 0 20px 0 0;
    & > h3 {
      padding: 0 0 0 10px;
      margin: 30% 0 0 0;
    }
`
const FilterBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 90%;
    gap: 5px 5px;
    padding: 0 0 0 10px;
    /* border: 1px solid black; */
`

const Filter = styled.div`
  display:inline-block;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  height: 25px;
  padding: 1% 5% 1% 5%;
`

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: flex-start;
  height: 20%;
  margin: 0 0 5% 5%;
  & > h2 {
    margin: 0;
    padding: 0;
  }
  & > div{
    padding: 0 0 0 2px;
  }
`