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

export const MyPage = () => {
    useGetToken();
    const userInfo = useRecoilValue(UserInfoAtom);
    // const access_token = userInfo.token['access_token'];
    // const [name, setName] = useState<string>();
    // const [school, setSchool] = useState<string>();
    // const [birth, setBirth] = useState<string>();
    // const [image, setImage] = useState<string|null>();
    // const [gender, setGender] = useState<string>();
    // const [dateJoined, setDateJoined] = useState<string>();
    // const [SNSLink, setSNSLink] = useState<string|null>();

    const imgLinkForTest = 'https://i.namu.wiki/i/XL34R5rJe_dWfnFmdlD8iVV_jltfYiIhzfVWmdbQOQEqBlsfbMjH14XQodzYK-djpVZr3r9VLSkq_LAUYxLcrRhl0zIpKGT85nn8X2uV4-eTcUo82KWpGQT6dG93NjJY601MnSxuWjNtJmnefoAxNg.webp'
    //테스트용
    const [name, setName] = useState<string>('gyeongbin');
    const [school, setSchool] = useState<string>('Chung-Ang Univ');
    const [birth, setBirth] = useState<string>('2001-04-09');
    const [image, setImage] = useState<string|null>(imgLinkForTest);
    const [gender, setGender] = useState<string>('F');
    const [dateJoined, setDateJoined] = useState<string>('2023-08-15');
    const [SNSLink, setSNSLink] = useState<string|null>('https://www.instagram.com/gydotb/');

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const handelBtnClick = () => {
        setIsEditing(true);
    }

    // const getProfile = async() => {
    //     const result = await GetProfileApi(userInfo.token.access_token, userName);
    //     console.log(result);
    //     setName(result.data.info.username);
    //     setSchool(result.data.info.school);
    //     setBirth(result.data.info.birth);
    //     setImage(result.data.info.image);
    //     setGender(result.data.info.gender);
    //     setDateJoined(result.data.info.date_joined);
    //     setSNSLink(result.data.info.sns);
    // }

    // useEffect(()=>{
    //     getProfile();
    // }, [])

  return (
    <Container>
      <HeaderCompo />
      <Wrapper className='mypage'>
        <MyPageTitle>
            <h2>View Profile</h2>
        </MyPageTitle>
        <ProfileWrapper>
            <ProfileImg>
                <img src={imgLinkForTest} />
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
                { (isEditing === false ) &&
                    <button onClick={handelBtnClick}>edit profile</button>
                }
            </ProfileChangeButtonWrapper>
        </ProfileWrapper>
        {(isEditing === false) ? 
            <ViewUserInfoBox 
            name={name}
            birth={birth}
            gender={gender}
            SNSLink={SNSLink} />
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