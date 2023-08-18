import React from 'react'
import { styled } from 'styled-components';
import {BsFillPersonCheckFill} from "react-icons/bs";

// const [name, setName] = useState<string>();
//     const [school, setSchool] = useState<string>();
//     const [birth, setBirth] = useState<string>();
//     const [image, setImage] = useState<string|null>();
//     const [gender, setGender] = useState<string>();
//     const [dateJoined, setDateJoined] = useState<string>();
//     const [SNSLink, setSNSLink] = useState<string|null>();

//     const [isEditing, setIsEditing] = useState<boolean>(false);

interface userInfoProps {
    name : string;
    // school : string;
    birth: string;
    // image: string|null;
    gender: string;
    nation: string;
    KONation: string;
    // dateJoined: string;
    SNSLink: string|null;
    // isEditing: boolean;
    // setName: React.Dispatch<React.SetStateAction<string>>;
    // setImage: React.Dispatch<React.SetStateAction<string>>;
    // setSNSLink: React.Dispatch<React.SetStateAction<string>>;
    // setIsEditing: React.Dispatch<React.SetStateAction<string>>;
}

export const ViewUserInfoBox : React.FunctionComponent<userInfoProps> = (props) => {
    const genderStr = (props.gender === 'M')? 'Man' : 'Woman';
    const birthStr = (props.birth).split("T");
  return (
    <UserInfoBox>
        <UserInfoHeader>
            <BsFillPersonCheckFill />
            <div>Profile Details</div>
        </UserInfoHeader>
        <UserInfoArticle>
            <WritingBox>
                <div className='label'>Name</div>
                <div className='content'>{props.name}</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>Nationality</div>
                <div className='content'>{props.nation}</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>Gender</div>
                <div className='content'>{genderStr}</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>Birth</div>
                <div className='content'>{birthStr}</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>SNS Link</div>
                <div className='content'>{props.SNSLink}</div>
            </WritingBox>
        </UserInfoArticle>
    </UserInfoBox>
  )
}

const UserInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width : 85%;
    height: 35vh;
    background-color: white;
    margin-bottom: 4%;
    box-shadow: 2px 4px 5px #676363;
`

const UserInfoHeader = styled.div`
    display: flex;
    height: 5vh;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid black;
    padding-left: 2%;
    gap: 2%;
    & > div{
        font-weight: bold;
        margin: 0%;
    }
`

const UserInfoArticle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 25vh;
    margin: 4% 10% 4% 10%;
`

const WritingBox = styled.div`
    display: flex;
    height: 3vh;
    & > .label{
        display: flex;
        justify-content: flex-end;
        flex-basis: 20%;
        margin-right: 10%;
        color: #676363bc;
    }
`