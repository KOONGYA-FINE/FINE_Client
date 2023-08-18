import React, { useRef, useState } from "react";
import { Container, Wrapper } from "../../common/commonstyle";
import { HeaderCompo } from "../../components/utils/HeaderCompo";
import { styled } from "styled-components";
import {
  FilterInfiniteScrollFoodGrid,
  foodGetType,
} from "../../components/food/FilterInfiniteScrollFoodGrid";
import { useNavigate } from "react-router-dom";
import { SearchFilterScrollFoodGrid } from "../../components/food/SearchFilterScrollFoodGrid";

export const FoodReviewMain = () => {
  const navigate = useNavigate();
  const [tag, setTag] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const foodBlankDatas: foodGetType[] = [];
  const inputValue = useRef<HTMLInputElement | null>(null);
  const [foodData, setFoodData] = useState<foodGetType[]>(foodBlankDatas);
  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setTag(e.currentTarget.value);
    setFoodData(foodBlankDatas);
    setPage(1);
  };
  const goSearchPage = () => {
    navigate("/food/search");
  };

  const [isSearching, setIsSearching] = useState(false);
  const [searchThing, setSearchThing] = useState<string>("");
  // const [searchThing, setSearchThing] = useState<string>();
  const handelSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const handelSearchClick = () => {
    e.preventDefault();
    setFoodData(foodBlankDatas);
    setTag(null);
    if (
      inputValue.current === null ||
      inputValue.current.value === null ||
      inputValue.current.value === ""
    ) {
      setIsSearching(false);
      setSearchThing("");
      setFoodData(foodBlankDatas);
      setPage(1);
      // console.log('setissearchingfalse');
      // console.log(inputValue.current);
      // console.log(inputValue.current?.value);
    } else {
      // console.log('setissearchingtrue');
      // console.log(inputValue.current);
      // console.log(inputValue.current?.value);
      setSearchThing(inputValue.current.value as string);
      setIsSearching(true);
      setFoodData(foodBlankDatas);
      setPage(1);
    }
  };
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className="matching">
        <SearchWrapper>
          <input placeholder="Find FINE Users Review!" ref={inputValue} />
          <button onClick={handelSearchClick}>search</button>
        </SearchWrapper>
        <HeaderWrapper>
          <HeaderBox>
            <h3>Filtered By</h3>
            <button onClick={goSearchPage}>Register</button>
          </HeaderBox>
          <FilterWrapper>
            <button value="ChineseFood" onClick={handleFilterClick}>
              ChineseFood
            </button>
            <button value="JapaneseFood" onClick={handleFilterClick}>
              JapaneseFood
            </button>
            <button value="KoreanFood" onClick={handleFilterClick}>
              KoreanFood
            </button>
            <button value="FrenchFood" onClick={handleFilterClick}>
              FrenchFood
            </button>
            <button value="FusionFood" onClick={handleFilterClick}>
              FusionFood
            </button>
            <button value="cafe" onClick={handleFilterClick}>
              cafe
            </button>
          </FilterWrapper>
        </HeaderWrapper>
        <ArticleWrapper>
          {isSearching === true && searchThing.length !== 0 ? (
            <SearchFilterScrollFoodGrid
              selectedTag={tag}
              page={page}
              foodData={foodData}
              foodBlankDatas={foodBlankDatas}
              searchThing={searchThing}
              setPage={setPage}
              setFoodData={setFoodData}
            />
          ) : (
            <FilterInfiniteScrollFoodGrid
              selectedTag={tag}
              page={page}
              foodData={foodData}
              foodBlankDatas={foodBlankDatas}
              // searchThing={searchThing}
              setPage={setPage}
              setFoodData={setFoodData}
            />
          )}
        </ArticleWrapper>
      </Wrapper>
    </Container>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 100%;
  & > input {
    height: 30%;
    width: 50%;
  }
  & > button {
    color: white;
    background-color: #22AA55;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15vh;
`;

const HeaderBox = styled.div`
  display: flex;
  height: 50%;
  justify-content: space-between;
  align-items: center;
  & > h3 {
    margin: 0px;
    padding: 0 0 0 10px;
  }
  & > button{
    color: white;
    background-color: #22AA55;
    margin-right: 10px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  height: 50%;
  gap: 10px;
  margin-left: 10px;
  & > button {
    color: white;
    height: 80%;
    padding: 0 10px 0 10px;
    background-color: #22AA55;
  }
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  flex-direction: column;
`;
