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
    <PostWrapper>
    <ArticleHeader>
        <div className='title'>Title</div>
        <div className='name-date'>
            <div>Written By</div>
            <div>Date</div>
        </div>
    </ArticleHeader>
    {(props.writePostIsNull)?
        <ArticleWrapper>
            <div>Upload your First Post and make Friends!</div>
        </ArticleWrapper> 
        :
        <ArticleWrapper>
            {(currentLang=="en") ?
                (props.ENPosts).map((post: postType, idx: number) => (
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post_id}`)}}>
                    <div className='title'>{post.title}</div>
                    <div className='name-date'>
                        <div>{post.username}</div>
                        <div>{post.created_at.split('T')[0]}</div>
                    </div>
                </ArticleBox>
                ))
                :
                (props.KOPosts).map((post: postType, idx: number) => (
                <ArticleBox key={idx} onClick={()=>{navigate(`/matching/main/${post.post}`)}}>
                    <div className='title'>{post.title}</div>
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
