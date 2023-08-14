import React from 'react'
import { styled } from 'styled-components';

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
        <UserInfoHeader />
        <UserInfoArticle>
            <WritingBox>
                <div className='label'>name</div>
                <div className='content'>{props.name}</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>nationality</div>
                <div className='content'>데이터 없음</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>Gender</div>
                <div className='content'>{genderStr}</div>
            </WritingBox>
            <WritingBox>
                <div className='label'>birth</div>
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
    width : 90%;
    height: 30vh;
    background-color: coral;
`

const UserInfoHeader = styled.div`
    display: flex;
    flex-basis: 20%;
    background-color: green;
`

const UserInfoArticle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-basis: 70%;
    margin: 2% 10% 2% 10%;
`

const WritingBox = styled.div`
    display: flex;
    flex-basis: 10%;
    border: 1px solid white;
    & > .label{
        display: flex;
        justify-content: flex-end;
        flex-basis: 20%;
        background-color: white;
        margin-right: 10%;
    }
`