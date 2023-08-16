import React, { createRef, useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components'
import { TranslationAtom } from '../../store/atom';
import { getAllPlacesApi } from '../../apis/foodapi';
import { FoodCardBox } from './FoodCardBox';

export interface foodGetType {
    id: number,
    name: string,
    score: number,
    address: string,
    tag: string,
    image: string,
};

interface propsType {
    selectedTag: string|null,
    page: number,
    foodData: foodGetType[],
    foodBlankDatas: foodGetType[],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setFoodData: React.Dispatch<React.SetStateAction<foodGetType[]>>,
}

export const FilterInfiniteScrollFoodGrid = (props:propsType) => {
    // const [page, setPage] = useState<number>(1);
    // const foodBlankDatas : foodGetType[] = [];
    // const [isLoading, setIsLoading] = useState(false);
    // const [foodData, setFoodData] = useState<foodGetType[]>(foodBlankDatas);
    const getFilter = props.selectedTag===null ? '' : `&tag=${props.selectedTag}`;

    const getPlaces = async() => {
        const result = await getAllPlacesApi(props.page, getFilter); 
        if(result===false) {
            alert("불러오기 오류 발생");
        } else if(result?.status===404) {
            alert("마지막 포스트까지 모두 불러왔습니다.");
        } else {
            // console.log(result.data.data);
            props.setFoodData((props.foodData).concat(result?.data.data));
            props.setPage(props.page+1);
        }
    }

    // useEffect(() => {
    //     getPlaces();
    // }, [])

    useEffect(() => {
        // setENPosts(postList);
        // setKOPosts(postList);
        props.setFoodData(props.foodBlankDatas);
        props.page===1 && getPlaces();
    }, [props.selectedTag])

    const ref = createRef<HTMLDivElement>();
    const handleScroll = useCallback((): void => {
        const innerHeight = ref?.current?.clientHeight;
        const scrollHeight = ref?.current?.scrollHeight;
        const scrollTop = ref?.current?.scrollTop;

        if (props.foodData!==props.foodBlankDatas){
            if(innerHeight&&scrollHeight&&scrollTop){
                if(Math.round(scrollTop+innerHeight) >= scrollHeight){
                    getPlaces();
                }
            }
        }
    }, [props.page, props.foodData]);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [handleScroll]);
  return (
    <FlexScrollBox>
        <ArticleWrapper ref={ref}>
            {props.foodData && (props.foodData).map((post:foodGetType, idx:number) => (
                <FoodCardBox
                key={idx}
                id={post.id}
                name={post.name}
                score={post.score}
                address={post.address}
                tag={post.tag}
                image={post.image} />
                )) 
            }
        </ArticleWrapper>
      </FlexScrollBox>
  )
}

const FlexScrollBox = styled.div`
  /* flex-basis: 80%; */
  display: flex;
  height: 50vh;
  flex-direction: column;
`

const ArticleWrapper= styled.div`
  flex-basis: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3,1fr);
  grid-auto-flow: row;
  /* grid-auto-rows: 200px;
  grid-auto-flow: row; */
  /* grid-column: auto / span 1;
  grid-row: auto / span 1; */
  border: 5px solid red;
  grid-gap: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`