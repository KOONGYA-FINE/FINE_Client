// import React from 'react'
import { styled } from 'styled-components'
import { Article, Container, Header, Wrapper } from '../common/commonstyle'

const Signup = () => {
  return (
    <Container>
      <Header>여기는 헤더</Header>
      <Wrapper>
        <Article>여기에 이미지</Article>
        <Article>
          <TestInputBox />
          <TestInputBox />
          <TestInputBox />
          <TestInputBox />
        </Article>
      </Wrapper>
    </Container>
  )
}

export default Signup

// 테스트용 input box
const TestInputBox = styled.div`
  display: flex;
  flex-basis: 10%;
  width: 80%;
  background-color: whitesmoke;
  margin: 5%;
`