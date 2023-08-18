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
    <PostWrapper>
    <ArticleHeader>
        <div className='title'>Title</div>
        <div className='name-date'>
            <div>Written By</div>
            <div>Date</div>
        </div>
    </ArticleHeader>
    {(props.scrapPostIsNull)?
        <ArticleWrapper>
            <div>Upload your First Post and make Friends!</div>
        </ArticleWrapper> 
        :
        <ArticleWrapper>
            {(currentLang=="en") ?
                (props.scrapPosts).map((post: scarpPostsType, idx: number) => (post.is_deleted===false &&
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post_en}`)}}>
                    <div className='title'>{post.title_en}</div>
                    <div className='name-date'>
                        <div>{post.username}</div>
                        <div>{post.created_at.split('T')[0]}</div>
                    </div>
                </ArticleBox>
                ))
                :
                (props.scrapPosts).map((post: scarpPostsType, idx: number) => (post.is_deleted===false &&
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post_en}`)}}>
                    {/* <div>{post.id}</div> */}
                    <div className='title'>{post.title_kr}</div>
                    <div className='name-date'>
                        <div>{post.username}</div>
                        <div>{post.created_at.split('T')[0]}</div>
                    </div>
                </ArticleBox>
                ))
            }
        </ArticleWrapper>
    }
    </PostWrapper>
  )
}

const PostWrapper = styled.div`
display: flex;
width: 98%;
height: 30vh;
flex-direction: column;
align-items: center;
margin-bottom: 2%;
`
const ArticleHeader = styled.div`
display: flex;
width: 98%;
height: 5vh;
background-color: #CEE9D8;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
justify-content: space-between;
align-items: center;
& > .title{
    margin-left: 5%;
    font-weight: bold;
}
& > .name-date{
    display: flex;
    width: 30%;
    justify-content: space-between;
    margin-right: 12%;
    font-weight: bold;
}
`

const ArticleWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 22vh;
width: 98%;
overflow-y: scroll;
background-color: #cee9d864;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
`
const ArticleBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: 4vh;
width: 90%;
border-bottom : 1px solid #979797;
& > .title{
    font-weight: bold;
}
& > .name-date{
    display: flex;
    width: 40%;
    justify-content: space-between;
}
`
