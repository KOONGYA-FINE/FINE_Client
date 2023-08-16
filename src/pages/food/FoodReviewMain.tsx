import React, { useRef, useState } from 'react'
import { Container, Wrapper } from '../../common/commonstyle'
import { HeaderCompo } from '../../components/utils/HeaderCompo'
import { styled } from 'styled-components'
import { FilterInfiniteScrollFoodGrid, foodGetType } from '../../components/food/FilterInfiniteScrollFoodGrid'
import { useNavigate } from 'react-router-dom'
import { SearchFilterScrollFoodGrid } from '../../components/food/SearchFilterScrollFoodGrid'

export const FoodReviewMain = () => {
    const navigate = useNavigate();
    const [tag, setTag] = useState<string|null>(null);
    const [page, setPage] = useState<number>(1);
    const foodBlankDatas : foodGetType[] = [];
    const inputValue = useRef<HTMLInputElement | null>(null);
    const [foodData, setFoodData] = useState<foodGetType[]>(foodBlankDatas);
    const handleFilterClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.value);
        setTag(e.currentTarget.value);
        setFoodData(foodBlankDatas);
        setPage(1);
    }
    const goSearchPage = () => {
        navigate('/food/search');
    }

    const [isSearching, setIsSearching] = useState(false);
    const [searchThing, setSearchThing] = useState<string>('');
    // const [searchThing, setSearchThing] = useState<string>();
    const handelSearchClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    // const handelSearchClick = () => {
        e.preventDefault();
        setFoodData(foodBlankDatas);
        if (inputValue.current===null || inputValue.current.value===null || inputValue.current.value===''){
            setIsSearching(false);
            setSearchThing('');
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
    }
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className="matching">
        <SearchWrapper>
            <input placeholder='Find FINE Users Review!' ref={inputValue}/>
            <button onClick={handelSearchClick}>search</button>
        </SearchWrapper>
        <HeaderWrapper>
            <HeaderBox>
                <h3>Filtered By</h3>
                <button onClick={goSearchPage}>Register</button>
            </HeaderBox>
            <FilterWrapper>
                <button value='restaurant' onClick={handleFilterClick}>restaurant</button>
                <button value='cafe' onClick={handleFilterClick}>cafe</button>
            </FilterWrapper>
        </HeaderWrapper>
        <ArticleWrapper>
            {(isSearching===true&&searchThing.length!==0)?
                <SearchFilterScrollFoodGrid
                selectedTag={tag}
                page={page}
                foodData={foodData}
                foodBlankDatas={foodBlankDatas}
                searchThing={searchThing}
                setPage={setPage}
                setFoodData={setFoodData} />
                :
                <FilterInfiniteScrollFoodGrid 
                selectedTag={tag}
                page={page}
                foodData={foodData}
                foodBlankDatas={foodBlankDatas}
                // searchThing={searchThing}
                setPage={setPage}
                setFoodData={setFoodData} />
            }
        </ArticleWrapper>
      </Wrapper>
    </Container>
  )
}

const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;
    width: 100%;
    background-color: red;
    & > input{
        height: 20%;
        width: 50%;
    }
`

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 12vh;
    background-color: yellow;
`

const HeaderBox = styled.div`
    display: flex;
    height: 50%;
    justify-content: space-between;
    & > h3 {
        margin: 0px;
        padding: 0px;
    }
`

const FilterWrapper = styled.div`
    display: flex;
    height: 50%;
    border: 2px solid black;
`
const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  flex-direction: column;
  background-color: blue;
`;