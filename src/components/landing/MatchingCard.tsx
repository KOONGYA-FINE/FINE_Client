import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components'
import { TranslationAtom } from '../../store/atom';
import { postType } from '../../apis/matchingGet';
import { GetMatchingPostsForLandingApi } from '../../apis/landingapi';
import { MachingCardBox } from './MachingCardBox';

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
        (<MachingCardBox
            key={idx}
            title={post.title}
            interest={post.interest}
            username={post.username}
            school={post.school} />))
        :
        KOPosts.map((post, idx:number) => 
        (<MachingCardBox
            key={idx}
            title={post.title}
            interest={post.interest}
            username={post.username}
            school={post.school} />))
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
    gap: 5px;
    background-image: url('LandingBack.png');
    background-size: contain;
    background-repeat: no-repeat;
    /* background-color: skyblue; */
`