import React from 'react'
import { styled } from 'styled-components'
import { scarpPostsType } from '../../pages/MyPage'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { TranslationAtom } from '../../store/atom';

interface ScrapUserInfoProps {
  scrapPostIsNull: boolean,
  scrapPosts: scarpPostsType[],
}

export const MatchingScrapUserInfo:React.FunctionComponent<ScrapUserInfoProps> = (props) => {
  const currentLang = useRecoilValue(TranslationAtom);
  const navigate = useNavigate();
  return (
    <>
    {(props.scrapPostIsNull)?
        <ArticleWrapper>
            <div>Upload your First Post and make Friends!</div>
        </ArticleWrapper> 
        :
        <ArticleWrapper>
            {(currentLang=="en") ?
                (props.scrapPosts).map((post: scarpPostsType, idx: number) => (post.is_deleted===false &&
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post_en}`)}}>
                    {/* <div>{post.id}</div> */}
                    <div>{post.title_en}</div>
                    <div>{post.username}</div>
                    <div>{post.created_at}</div>
                </ArticleBox>
                ))
                :
                (props.scrapPosts).map((post: scarpPostsType, idx: number) => (post.is_deleted===false &&
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post_en}`)}}>
                    {/* <div>{post.id}</div> */}
                    <div>{post.title_kr}</div>
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