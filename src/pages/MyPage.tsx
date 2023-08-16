import React, { useEffect, useState } from 'react'
import { Container, Wrapper } from '../common/commonstyle'
import { HeaderCompo } from '../components/utils/HeaderCompo'
import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { UserInfoAtom } from '../store/atom'
import { GetProfileApi } from '../apis/mypagapis'
import useGetToken from '../hooks/useGetToken'
import {BsLink45Deg} from "react-icons/bs"
import { ViewUserInfoBox } from '../components/mypage/ViewUserInfoBox'
import { EditUserInfoBox } from '../components/mypage/EditUserInfoBox'
import { useParams } from 'react-router-dom'

export const MyPage = () => {
    const {username} = useParams();

    useGetToken();
    const userInfo = useRecoilValue(UserInfoAtom);

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

    useEffect(()=>{
        getProfile();
        console.log(username);
        console.log(userInfo.user.username);
    }, [])

    useEffect(()=>{
        getProfile();
    }, [isEditing, username])

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
    flex-basis: 30%;
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