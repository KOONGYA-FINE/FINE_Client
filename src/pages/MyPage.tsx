import React, { useEffect, useState } from 'react'
import { Container, Wrapper } from '../common/commonstyle'
import { HeaderCompo } from '../components/utils/HeaderCompo'
import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { UserInfoAtom } from '../store/atom'
import { GetProfileApi, GetScrapPostsApi, GetWritePostsApi } from '../apis/mypagapis'
import useGetToken from '../hooks/useGetToken'
import {BsLink45Deg} from "react-icons/bs"
import { ViewUserInfoBox } from '../components/mypage/ViewUserInfoBox'
import { EditUserInfoBox } from '../components/mypage/EditUserInfoBox'
import { useParams } from 'react-router-dom'
import { postType } from '../apis/matchingGet'
import { MatchingScrapUserInfo } from '../components/mypage/MatchingScrapUserInfo'
import { MatchingPostUserInfo } from '../components/mypage/MatchingPostUserInfo'

export interface scarpPostsType{
    id: number,
    username: string,
    title_en: string,
    title_kr: string,
    created_at: string,
    is_deleted: boolean,
    user: string,
    post_en: number,
    post_kr: number,
}

export const MyPage = () => {
    const {username} = useParams();

    useGetToken();
    const userInfo = useRecoilValue(UserInfoAtom);
    const [buttonScrap, setButtonScrap] = useState(false);

    // const access_token = userInfo.token['access_token'];
    const [name, setName] = useState<string>('');
    const [school, setSchool] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [image, setImage] = useState<string|null>('');
    const [gender, setGender] = useState<string>('');
    const [nation, setNation] = useState<string>('');
    const [KONation, setKONation] = useState<string>('');
    const [dateJoined, setDateJoined] = useState<string>('');
    const [SNSLink, setSNSLink] = useState<string|null>('');

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const handelBtnClick = () => {
        setIsEditing(true);
    }

    const getProfile = async() => {
        const result = await GetProfileApi(localStorage.getItem("access_token") as string, username);
        console.log(result);
        if (result === false){
            alert('오류 발생, 다시 시도해주세요');
        } else if (result === 'Authentication credentials were not provided.'){
            alert('로그인해주세요');
        } else if (result === 'Given token not valid for any token type'){
            alert('재로그인해주세요');
        } else if (result === 'user profile not found'){
            alert('존재하지 않는 유저입니다.');
        } else {
            setName(result.data.info.username);
            setSchool(result.data.info.school);
            setBirth(result.data.info.birth);
            setImage(result.data.info.image);
            setGender(result.data.info.gender);
            setNation(result.data.info.nation);
            setKONation(result.data.info.nation_KR);
            setDateJoined(result.data.info.date_joined);
            setSNSLink(result.data.info.sns);
        }
    }

    const postList : postType[] = [];
    const [writePostIsNull, setWritePostIsNull] = useState(false);
    const [ENPosts, setENPosts] = useState<postType[]>(postList);
    const [KOPosts, setKOPosts] = useState<postType[]>(postList);

    const getWritePosts = async() => {
        const result = await GetWritePostsApi(localStorage.getItem("access_token") as string, username);
        console.log(result);
        if (result === 401){
            alert("다시 로그인 해주세요");
        } else if (result === 404) {
            setWritePostIsNull(true);
        } else if (result === false){
            alert("오류 발생");
        } else {
            setENPosts((ENPosts).concat(result.data['post_en']))
            setKOPosts((KOPosts).concat(result.data['post_kr']))
        }
    }

    const scrapPostList : scarpPostsType[] = [];
    const [scrapPostIsNull, setScrapPostIsNull] = useState(false);
    const [scrapPosts, setScrapPosts] = useState<scarpPostsType[]>(scrapPostList);

    const getScrapPosts = async() => {
        const result = await GetScrapPostsApi(localStorage.getItem("access_token") as string, username);
        console.log(result);
        if (result === 401){
            alert("다시 로그인 해주세요");
        } else if (result === 404) {
            setScrapPostIsNull(true);
        } else if (result === false){
            alert("오류 발생");
        } else {
            console.log("스크랩 데이터");
            console.log(result.data.saved_post);
            setScrapPosts((scrapPosts).concat(result.data.saved_post));
        }
    }

    // useEffect(()=>{
    //     getProfile();
    //     getWritePosts();
    //     getScrapPosts();
    //     console.log("첫번째 useEffect")
    //     console.log(username);
    //     console.log(userInfo.user.username);
    // }, [username])

    useEffect(()=>{
        getProfile();
        getWritePosts();
        getScrapPosts();
        console.log("두번째 useEffect");
        console.log(username);
        console.log(userInfo.user.username);
    }, [username])

  return (
    <Container>
      <HeaderCompo />
      <Wrapper className='mypage'>
        <MyPageTitle>
            <h2>View Profile</h2>
        </MyPageTitle>
        <ProfileWrapper>
            <ProfileImg>
                {(image!==null) ? 
                    <img src={image} />
                    :
                    <img src={'MyPageIcon.png'} />
                }
            </ProfileImg>
            <ProfileInfo>
                <ProfileNameAndLink>
                    <h2>{name}    
                        {(SNSLink!==null) ? 
                        <a href={SNSLink} target='_blank'><BsLink45Deg className='link' /></a> 
                        :
                        <BsLink45Deg className='link' />
                        }
                    </h2>
                </ProfileNameAndLink>
                <div>{school}</div>
            </ProfileInfo>
            <ProfileChangeButtonWrapper>
                { (isEditing === false ) && (username === userInfo.user.username) &&
                    <button onClick={handelBtnClick}>edit profile</button>
                }
            </ProfileChangeButtonWrapper>
        </ProfileWrapper>
        {(isEditing === false) ? 
            <ViewUserInfoBox 
            name={name}
            birth={birth}
            gender={gender}
            SNSLink={SNSLink}
            nation={nation}
            KONation={KONation} />
            :
            <EditUserInfoBox 
            name={name}
            birth={birth}
            gender={gender}
            SNSLink={SNSLink}
            image={image}
            isEditing={isEditing}
            token={userInfo.token.access_token}
            setName={setName}
            setSNSLink={setSNSLink}
            setIsEditing={setIsEditing} />
        }
        {(username === userInfo.user.username)&&
            <ArticleAndButtonWrapper>
                <SelectButtonWrapper>
                    <button onClick={() => setButtonScrap(false)}>Posts</button>
                    <button onClick={() => setButtonScrap(true)}>Scraped</button>
                </SelectButtonWrapper>
                {(buttonScrap)?
                    <MatchingScrapUserInfo
                    scrapPostIsNull={scrapPostIsNull}
                    scrapPosts={scrapPosts} />
                    :
                    <MatchingPostUserInfo
                    writePostIsNull={writePostIsNull}
                    ENPosts={ENPosts}
                    KOPosts ={KOPosts}
                     />
                }
            </ArticleAndButtonWrapper>
        }
      </Wrapper>
    </Container>
  )
}

const MyPageTitle = styled.div`
    display: flex;
    flex-basis: 10%;
    width : 100%;
    background-color: yellow;
    & > h2{
        margin: 0px;
        padding: 0px;
    }
`

const ProfileWrapper = styled.div`
    display: flex;
    height: 30vh;
    width : 90%;
    align-items: center;
    justify-content: space-around;
    margin: 2%;
    background-color: green;
`

const ProfileImg = styled.div`
    display: flex;
    height : 120px;
    width: 120px;
    background-color: red;
    overflow: hidden;
    & > img {
        object-fit:cover;
        width: 100%;
        border-radius: 40%;
    }
`

const ProfileInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex-basis: 50%;
    height: 70%;
    border: 3px solid white;
`
const ProfileNameAndLink = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > h2{
        margin: 0px 0px 5px 0px;
        padding: 0px;
        .link{
            color: white;
        }
    }
`

const ProfileChangeButtonWrapper = styled.div`
    display: flex;
    flex-basis: 30%;
    height: 70%;
    border: 3px solid white;
    justify-content: flex-end;
    & > button{
        display: flex;
        height: 25%;
        padding: 5px;
        border: 2px solid black;
    }
`

const ArticleAndButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 40vh;
    margin: 2%;
    width: 90%;
    background-color: gray;
`

const SelectButtonWrapper = styled.div`
    display: flex;
    height: 5vh;
    border: 1px solid white;
`
