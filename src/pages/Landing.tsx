import React, { useState } from 'react'
import { Article, Container, Wrapper } from '../common/commonstyle'
import { HeaderCompo } from '../components/utils/HeaderCompo'
import { styled } from 'styled-components'
import { MatchingCard } from '../components/landing/MatchingCard'
import { useTranslation } from 'react-i18next'
import { useGetLanguage } from '../hooks/useGetLanguage'
import { useNavigate } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'

export const Landing = () => {
    const { t } = useTranslation();
    useGetLanguage();
    const navigate = useNavigate();

  return (
    <Container>
      <HeaderCompo />
      <Wrapper className='landing'>
        <MainInfo>
            <h2>Connect, Check, Culminate your Korea life</h2>
            <h1>FINE</h1>
            <button onClick={()=>{navigate(`/signup`)}}>Sign Up<AiOutlineArrowRight /></button>
        </MainInfo>
        <MenuInfo>
            <MenuBox>
                <h3>Personal Profile</h3>
                <div className='menubox-content'>
                    <div>{t(`landing.about_mypage`)}</div>
                </div>
            </MenuBox>
            <MenuBox className='green-menubox'>
                <h3>Friend Matching</h3>
                <div className='menubox-content'>
                    <div>{t(`landing.about_matching`)}</div>
                </div>
            </MenuBox>
            <MenuBox>
                <h3>Restaurant Review</h3>
                <div className='menubox-content'>
                    <div>{t(`landing.about_food`)}</div>
                </div>
            </MenuBox>
        </MenuInfo>
        <MatchingDescription>
            <h3>{t(`landing.go_matching`)}</h3>
            <button onClick={()=>{navigate(`/matching/main`)}}>Go see Friend Matching<AiOutlineArrowRight /></button>
        </MatchingDescription>
        <MatchingCard />
        <RestaurantInfo />
      </Wrapper>
    </Container>
  )
}


const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 70vh;
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
        justify-content: space-between;
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
    padding: 0 5% 0 5%;
    gap: 2%;
    /* background-color: coral; */
`

const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    justify-content: center;
    align-items: center;
    height : 50%;
    /* border: 2px solid white; */
    border-radius: 10px;
    background-color: #E1F0C4;
    box-shadow: 2px 4px 9px black;
    &.green-menubox{
        color: white;
        background-color: #22AA55;
    }
    & > h3{
        /* background-color: green; */
        height: 20%;
        justify-content: flex-start;
        padding: 5px 5px 5px 5px;
        margin: 10px 0px 0px 0px;
    }
    & > .menubox-content{
        display: flex;
        width: 90%;
        height: 50%;
        justify-content: center;
        align-items: center;
    }
`

const MatchingDescription = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 20vh;
    align-items: flex-end;
    justify-content: center;
    /* background-color: yellow; */
    & > h3{
        margin : 0 10% 0 0;
    }
    & > button{
        display: flex;
        color: white;
        background-color: #22AA55;
        width: 260px;
        justify-content: space-between;
        border-radius: 5px;
        padding: 10px 25px 10px 25px;
        margin : 1% 10% 0 0;
    }
`

const RestaurantInfo = styled.div`
    display: flex;
    flex-basis: 80vh;
    background-color: yellow;
`