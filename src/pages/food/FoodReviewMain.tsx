import React, { useState } from 'react'
import { Container, Wrapper } from '../../common/commonstyle'
import { HeaderCompo } from '../../components/utils/HeaderCompo'
import { styled } from 'styled-components'
import { FilterInfiniteScrollFoodGrid, foodGetType } from '../../components/food/FilterInfiniteScrollFoodGrid'
import { useNavigate } from 'react-router-dom'

export const FoodReviewMain = () => {
    const navigate = useNavigate();
    const [tag, setTag] = useState<string|null>(null);
    const [page, setPage] = useState<number>(1);
    const foodBlankDatas : foodGetType[] = [];
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
  return (
    <Container>
      <HeaderCompo />
      <Wrapper className="matching">
        <SearchWrapper />
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
            <FilterInfiniteScrollFoodGrid 
            selectedTag={tag}
            page={page}
            foodData={foodData}
            foodBlankDatas={foodBlankDatas}
            setPage={setPage}
            setFoodData={setFoodData} />
        </ArticleWrapper>
      </Wrapper>
    </Container>
  )
}

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 20vh;
    width: 100%;
    background-color: red;
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