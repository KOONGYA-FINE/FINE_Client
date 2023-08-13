import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components'
import { TranslationAtom } from '../../store/atom';
import { postType } from '../../apis/matchingGet';
import { GetMatchingPostsForLandingApi } from '../../apis/landingapi';

export const MatchingCard = () => {
    const currentlang = useRecoilValue(TranslationAtom);
    const postList : postType[] = [];
    const [ENPosts, setENPosts] = useState<postType[]>(postList);
    const [KOPosts, setKOPosts] = useState<postType[]>(postList);

    useEffect(()=>{
        getPosts();
    }, [])

    const getPosts = async() => { 
        const result = await GetMatchingPostsForLandingApi(); 
        if(result===false) {
            alert("불러오기 오류 발생");
        } else{
            console.log(result.data['post_en'][0])
            setENPosts(ENPosts.concat([result.data['post_en'][0], result.data['post_en'][1], result.data['post_en'][2]]));
            setKOPosts(KOPosts.concat([result.data['post_kr'][0], result.data['post_kr'][1], result.data['post_kr'][2]]));
        }
    }
  return (
    <>
    <CardWrapper>
        {ENPosts&&(currentlang==="en") ? 
        ENPosts.map((post, idx:number) => 
        (<CardBox key={idx}>
            <h3>{post.title}</h3>
        </CardBox>))
        :
        KOPosts.map((post, idx:number) => 
        (<CardBox key={idx}>
            <h3>{post.title}</h3>
        </CardBox>))
        }
    </CardWrapper>
    </>
  )
}

const CardWrapper = styled.div`
    display: flex;
    flex-basis: 60vh;
    justify-content: flex-end;
    align-items: center;
    gap: 2%;
    background-color: skyblue;
`

const CardBox = styled.div`
    display: flex;
    flex-basis: 20%;
    align-items: center;
    height: 70%;
    border: 2px solid white;
    border-radius: 10px;
`