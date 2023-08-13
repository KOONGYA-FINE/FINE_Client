import React, { SetStateAction, createRef, useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { CardBox } from './CardBox'
import { GetFilteredMatchingPostApi, postType } from '../../apis/matchingGet';
import { useRecoilValue } from 'recoil';
import { TranslationAtom } from '../../store/atom';

interface FilterProps {
    gender : string;
    // nation : Number|null;
    nation : string;
    interest : string;
    isClicked : number;
}

export const FilterInfiniteScrollGrid: React.FunctionComponent<FilterProps> = (props) => {
    const currentlang = useRecoilValue(TranslationAtom);
    const postList : postType[] = [];
    const [page, setPage] = useState(1);
    const [ENPosts, setENPosts] = useState<postType[]>(postList);
    const [KOPosts, setKOPosts] = useState<postType[]>(postList);

    // const genderStr = (props.gender===null)? ``:`&gender=${props.gender}`;
    // const nationStr = (props.nation===null)? ``:`&nation=${props.nation}`;
    // const interestStr = (props.interest===null)? ``:`&interest=${props.interest}`;

    const getPosts = async() => {
        // const result = await GetFilteredMatchingPostApi(page, interestStr, nationStr, genderStr); 
        const result = await GetFilteredMatchingPostApi(page, props.interest, props.gender, props.nation); 
        if(result===false) {
            alert("불러오기 오류 발생");
        } else{
            console.log(`page=${page}불러오기`);
            setENPosts(ENPosts.concat(result.data['post_en']));
            console.log(ENPosts);
            setKOPosts(KOPosts.concat(result.data['post_ko']));
            console.log(KOPosts);
            setPage(page+1);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        setPage(1);
        setENPosts(postList);
        setKOPosts(postList);
        page===1 && getPosts();
    }, [props.isClicked])

    const ref = createRef<HTMLDivElement>();
    const handleScroll = useCallback((): void => {
        const innerHeight = ref?.current?.clientHeight;
        const scrollHeight = ref?.current?.scrollHeight;
        const scrollTop = ref?.current?.scrollTop;
        
        if(innerHeight&&scrollHeight&&scrollTop){
            if(Math.round(scrollTop+innerHeight) >= scrollHeight){
                getPosts();
            }
        }
    }, [page, ENPosts]);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [handleScroll]);
  return (
    <FlexScrollBox>
        <ArticleWrapper ref={ref}>
            {ENPosts&&(currentlang==="en" ?
                ENPosts.map((post:postType, idx:number) => (
                <CardBox 
                key={idx}
                post_id={post.post_id}
                username={post.username}
                school={post.school}
                gender={post.gender}
                nation={post.nation}
                created_at={post.created_at}
                updated_at={post.updated_at} 
                title={post.title}
                content={post.content}
                image={post.image}
                interest={post.interest}
                user_id={post.user_id} />
                )) 
                :
                KOPosts.map((post:postType, idx:number) => (
                <CardBox 
                key={idx}
                post_id={post.post_id}
                username={post.username}
                school={post.school}
                gender={post.gender}
                nation={post.nation}
                created_at={post.created_at}
                updated_at={post.updated_at} 
                title={post.title}
                content={post.content}
                image={post.image}
                interest={post.interest}
                user_id={post.user_id} />
                ))
            )}
        </ArticleWrapper>
      </FlexScrollBox>
  )
}

const FlexScrollBox = styled.div`
  /* flex-basis: 80%; */
  display: flex;
  height: 68vh;
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