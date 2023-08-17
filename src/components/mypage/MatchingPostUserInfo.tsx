import React from 'react'
import { postType } from '../../apis/matchingGet';
import { useRecoilValue } from 'recoil';
import { TranslationAtom } from '../../store/atom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface matchingPostsWritedProps {
    writePostIsNull: boolean,
    ENPosts: postType[],
    KOPosts: postType[],
}

export const MatchingPostUserInfo:React.FunctionComponent<matchingPostsWritedProps> = (props) => {
    const currentLang = useRecoilValue(TranslationAtom);
    const navigate = useNavigate();
  return (
    <>
    {(props.writePostIsNull)?
        <ArticleWrapper>
            <div>Upload your First Post and make Friends!</div>
        </ArticleWrapper> 
        :
        <ArticleWrapper>
            {(currentLang=="en") ?
                (props.ENPosts).map((post: postType, idx: number) => (
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post_id}`)}}>
                    <div>{post.title}</div>
                    <div>{post.username}</div>
                    <div>{post.created_at}</div>
                </ArticleBox>
                ))
                :
                (props.KOPosts).map((post: postType, idx: number) => (
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post}`)}}>
                    <div>{post.title}</div>
                    <div>{post.username}</div>
                    <div>{post.created_at}</div>
                </ArticleBox>
                ))
            }
        </ArticleWrapper>
    }
    </>
  )
}

const ArticleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 30vh;
    width: 98%;
    overflow-y: scroll;
    background-color: yellowgreen;
`
const ArticleBox = styled.div`
    display: flex;
    height: 10%;
    width: 100%;
`