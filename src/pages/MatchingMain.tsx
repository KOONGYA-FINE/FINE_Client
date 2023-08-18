import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { InfiniteScrollGrid } from "../components/matching/InfiniteScrollGrid";
import { useRoutePageFunc } from "../hooks/useRoutePageFunc";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { TranslationAtom } from "../store/atom";
import {
  GenderOpt,
  InterestOpt,
  InterestOptionsEN,
  InterestOptionsKO,
  NationOpt,
  genderOptionsEN,
  genderOptionsKO,
  nationOptionsEN,
  nationOptionsKO,
} from "../store/optiondata";
import { FilterInfiniteScrollGrid } from "../components/matching/FilterInfiniteScrollGrid";
import { postType } from "../apis/matchingGet";

const MatchingMain = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const currentLang = useRecoilValue(TranslationAtom);
  const navigate = useRoutePageFunc;

  const [filterIsSelected, setFilterIsSelected] = useState<number>(1);
  const [prevFilterIsSelected, setPrevFilterIsSelected] = useState<number>(1);
  const [selectedGenderOpt, setSelectedGenderOpt] =
    useState<GenderOpt | null>();
  // const [selectedNationOpt, setSelectedNationOpt] = useState<NationOpt[]|[null]>([]);
  const [selectedNationOpt, setSelectedNationOpt] =
    useState<NationOpt | null>();
  const [selectedInterestOpt, setSelectedInterestOpt] =
    useState<InterestOpt[]>();

  const blankSpace: InterestOpt[] = [];

  const [getGender, setGetGender] = useState<string>(``);
  const [getNation, setGetNation] = useState<string>(``);
  const [getInterest, setGetInterest] = useState<string>(``);

  const [page, setPage] = useState<number>(1);
  const postList: postType[] = [];
  // const [page, setPage] = useState(1);
  const [ENPosts, setENPosts] = useState<postType[]>(postList);
  const [KOPosts, setKOPosts] = useState<postType[]>(postList);

  const handleFilterClick = () => {
    // setPrevFilterIsSelected(filterIsSelected);
    setFilterIsSelected((prev) => filterIsSelected + 1);
    const interestArr = selectedInterestOpt
      ? selectedInterestOpt.map((opt) => opt.value)
      : null;
    setGetInterest(
      interestArr !== undefined && interestArr !== null
        ? `&interest=${interestArr.join(" ")}`
        : ``
    );
    setGetGender(
      selectedGenderOpt !== undefined && selectedGenderOpt !== null
        ? `&gender=${selectedGenderOpt.value}`
        : ``
    );
    setGetNation(
      selectedNationOpt !== undefined && selectedNationOpt !== null
        ? `&nation=${selectedNationOpt.value}`
        : ``
    );
    setENPosts(postList);
    setKOPosts(postList);
    setPage(1);

    console.log(getInterest);
    console.log(getGender);
    console.log(getNation);
    // if (getGender===null && getNation===null && getInterest===null){
    //   alert('항목을 반드시 하나 이상 선택해주세요');
    // } else{
    //   setFilterIsSelected(true);
    // }
  };

  return (
    <>
      <MainWrapper>
        <FilterWapper>
          <h3>Filters</h3>
          <div className="label">Gender</div>
          <Select
            options={currentLang === "en" ? genderOptionsEN : genderOptionsKO}
            value={selectedGenderOpt}
            onChange={(opt) => setSelectedGenderOpt(opt)}
          />
          <div className="label">Nation</div>
          <Select
            options={currentLang === "en" ? nationOptionsEN : nationOptionsKO}
            value={selectedNationOpt}
            onChange={(opt) => setSelectedNationOpt(opt)}
          />
          <div className="label">Interest</div>
          <Select
            options={
              currentLang === "en" ? InterestOptionsEN : InterestOptionsKO
            }
            isMulti
            value={selectedInterestOpt}
            onChange={(opt) => setSelectedInterestOpt(blankSpace.concat(opt))}
          />
          <button onClick={handleFilterClick}>{t(`matching.search`)}</button>
        </FilterWapper>
        <ArticleWrapper>
          <TitleAndWriteWrapper>
            <h3>Recommended Friends</h3>
            <button onClick={navigate("matching/register")}>Write</button>
          </TitleAndWriteWrapper>
          {/* {getGender!==undefined && getInterest!==undefined && getNation!==undefined && filterIsSelected ?  */}
          {
            <FilterInfiniteScrollGrid
              gender={getGender}
              nation={getNation}
              interest={getInterest}
              isClicked={filterIsSelected}
              page={page}
              setPage={setPage}
              ENPosts={ENPosts}
              KOPosts={KOPosts}
              setENPosts={setENPosts}
              setKOPosts={setKOPosts}
            />
            // :
            // <InfiniteScrollGrid />
          }
        </ArticleWrapper>
      </MainWrapper>
    </>
  );
};

export default MatchingMain;

const MainWrapper = styled.div`
  display: flex;
  flex-basis: 95%; // height
  width: 100%;
  justify-content: space-between;
`;

const FilterWapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 18%;
  height: 70%;
  & > .label{
    display: flex;
    height: 5vh;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #22AA55;
    color: white;
    align-items: center;
    font-weight: bold;
    margin-top: 10px;
    padding-left: 10px;
  }
  & > h3{
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }
  & > button{
    margin-top: 20px;
    background-color: #22AA55;
    color: white;
  }
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 80%;
  flex-direction: column;
`;

const TitleAndWriteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid white;
  align-items: center;
  height: 7vh;
  & > h3 {
    margin: 0% 0% 0% 2%;
  }
  & > button {
    height: 70%;
    padding: 0% 5% 0% 5%;
    margin-right: 2%;
    color: white;
    background-color: #22AA55;
  }
`;
