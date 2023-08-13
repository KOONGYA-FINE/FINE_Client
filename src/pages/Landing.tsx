import React from 'react'
import { Article, Container, Wrapper } from '../common/commonstyle'
import { HeaderCompo } from '../components/utils/HeaderCompo'
import { styled } from 'styled-components'
import { MatchingCard } from '../components/landing/MatchingCard'

export const Landing = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className='landing'>
        <MainInfo>
            <h2>Find your friends with</h2>
            <h1>FINE</h1>
            <button>Sign Up</button>
        </MainInfo>
        <MenuInfo>
            <div className='card-box'>카드1</div>
            <div className='card-box'>카드2</div>
            <div className='card-box'>카드3</div>
        </MenuInfo>
        <MatchingDescription>description</MatchingDescription>
        <MatchingCard />
        <RestaurantInfo />
      </Wrapper>
    </Container>
  )
}

const MatchingDescription = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 20vh;
    background-color: blue;
`

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 60vh;
    justify-content: center;
    align-items: flex-start;
    background-color: green;
    & > h2 {
        margin-left: 5%;
        margin-bottom: 2px;
        padding: 0px;
    }
    & > h1{
        margin-left: 5%;
        margin-top: 2px;
        padding: 0px;
    }
    & > button{
        margin-left: 5%;
        background-color: transparent;
        width : 20%;
        display: flex;
        justify-content: flex-start;
        color: white;
        border-radius: 0px;
        border-bottom : 1px solid white;
    }
`

const MenuInfo = styled.div`
    display: flex;
    flex-basis: 50vh;
    justify-content: center;
    align-items: center;
    gap: 2%;
    background-color: coral;
    &> .card-box{
        display: flex;
        flex-basis: 30%;
        align-items: center;
        height : 50%;
        border: 2px solid white;
        border-radius: 10px;
    }
`

const RestaurantInfo = styled.div`
    display: flex;
    flex-basis: 80vh;
    background-color: yellow;
`