import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { InfiniteScrollGrid } from "../components/matching/InfiniteScrollGrid";
import { useRoutePageFunc } from "../hooks/useRoutePageFunc";

const MatchingMain = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const navigate = useRoutePageFunc;

  return (
    <>
    <HeaderWrapper>
      <h2>Friend Matching</h2>
    </HeaderWrapper>
    <MainWrapper>
      <FilterWapper />
      <ArticleWrapper>
        <TitleAndWriteWrapper>
          <h3>Recommended Friends</h3>
          <button onClick={navigate('matching/register')}>Write</button>
        </TitleAndWriteWrapper>
        <InfiniteScrollGrid />
      </ArticleWrapper>
    </MainWrapper>
    </>
  );
};

export default MatchingMain;

const HeaderWrapper = styled.div`
  display: flex;
  flex-basis: 8%;
  width: 100%;
  background-color: gray;
  & > h2{
    margin: 0px;
    padding: 0px;
  }
`

const MainWrapper = styled.div`
  display: flex;
  flex-basis: 95%; // height
  width: 100%;
  background-color: green;
  justify-content: space-between;
`


const FilterWapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 18%;
  height: 70%;
  background-color: red;
`

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 80%;
  flex-direction: column;
  background-color: blue;
`
const TitleAndWriteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid white;
  align-items: center;
  height: 9%;
  & > h3{
    margin: 0% 0% 0% 2%;
  }
  & > button{
    height: 70%;
    padding : 0% 5% 0% 5%;
    margin-right: 2%;
  }
`