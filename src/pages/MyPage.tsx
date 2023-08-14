import React from 'react'
import { Container, Wrapper } from '../common/commonstyle'
import { HeaderCompo } from '../components/utils/HeaderCompo'
import { styled } from 'styled-components'

export const MyPage = () => {
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className='mypage'>
        <MyPageTitle>
            <h2>View Profile</h2>
        </MyPageTitle>
        <ProfileWrapper>
            <ProfileImg />
            <ProfileInfo />
        </ProfileWrapper>
      </Wrapper>
    </Container>
  )
}

const MyPageTitle = styled.div`
    display: flex;
    flex-basis: 10%;
    background-color: yellow;
    & > h2{
        margin: 0px;
        padding: 0px;
    }
`

const ProfileWrapper = styled.div`
    display: flex;
    flex-basis: 40%;
    background-color: green;
`

const ProfileImg = styled.div`
    //div img로 바꾸기
    height : 70%;
    flex-basis: 20%;
    background-color: red;
`
const ProfileInfo = styled.div`
    display: flex;
    flex-basis: 40%;
    height: 70%;
    border: 3px solid white;
`