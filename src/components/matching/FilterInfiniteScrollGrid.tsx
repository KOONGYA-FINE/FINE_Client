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
    isClicked: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    ENPosts: postType[];
    KOPosts: postType[];
    setENPosts: React.Dispatch<React.SetStateAction<postType[]>>;
    setKOPosts: React.Dispatch<React.SetStateAction<postType[]>>;
}

export const FilterInfiniteScrollGrid: React.FunctionComponent<FilterProps> = (props) => {
    const currentlang = useRecoilValue(TranslationAtom);
    const postList : postType[] = [];
    // const [page, setPage] = useState(1);
    // const [ENPosts, setENPosts] = useState<postType[]>(postList);
    // const [KOPosts, setKOPosts] = useState<postType[]>(postList);

    // const genderStr = (props.gender===null)? ``:`&gender=${props.gender}`;
    // const nationStr = (props.nation===null)? ``:`&nation=${props.nation}`;
    // const interestStr = (props.interest===null)? ``:`&interest=${props.interest}`;

    const getPosts = async() => {
        // const result = await GetFilteredMatchingPostApi(page, interestStr, nationStr, genderStr); 
        const result = await GetFilteredMatchingPostApi(props.page, props.interest, props.gender, props.nation); 
        if(result===false) {
            alert("불러오기 오류 발생");
        } else if(result?.status===404) {
            alert("마지막 포스트까지 모두 불러왔습니다.");
        } else {
            console.log(`page=${props.page}불러오기`);
            props.setENPosts((props.ENPosts).concat(result?.data['post_en']));
            console.log(props.ENPosts);
            props.setKOPosts((props.KOPosts).concat(result?.data['post_kr']));
            console.log(props.KOPosts);
            props.setPage(props.page+1);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        // setENPosts(postList);
        // setKOPosts(postList);
        props.page===1 && getPosts();
    }, [props.isClicked])

    const ref = createRef<HTMLDivElement>();
    const handleScroll = useCallback((): void => {
        const innerHeight = ref?.current?.clientHeight;
        const scrollHeight = ref?.current?.scrollHeight;
        const scrollTop = ref?.current?.scrollTop;
        
        if (props.ENPosts!==postList){
            if(innerHeight&&scrollHeight&&scrollTop){
                if(Math.round(scrollTop+innerHeight) >= scrollHeight){
                    getPosts();
                }
            }
        }
    }, [props.page, props.ENPosts]);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [handleScroll]);
  return (
    <FlexScrollBox>
        <ArticleWrapper ref={ref}>
            {props.ENPosts&&(currentlang==="en" ?
                (props.ENPosts).map((post:postType, idx:number) => (
                <CardBox 
                key={idx}
                post_id={post!.post_id}
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
                (props.KOPosts).map((post:postType, idx:number) => (
                <CardBox 
                key={idx}
                post_id={post!.id}
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