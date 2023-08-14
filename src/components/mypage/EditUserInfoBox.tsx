import React, { useRef } from 'react'
import { styled } from 'styled-components';
import { EditProfileApi } from '../../apis/mypagapis';

interface userInfoProps {
    name : string;
    // school : string;
    birth: string;
    image: string|null;
    gender: string;
    // dateJoined: string;
    SNSLink: string|null;
    isEditing: boolean;
    token: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    // setImage: React.Dispatch<React.SetStateAction<string>>;
    setSNSLink: React.Dispatch<React.SetStateAction<string|null>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditUserInfoBox:React.FunctionComponent<userInfoProps> = (props) => {
    const genderStr = (props.gender === 'M')? 'Man' : 'Woman';
    const birthStr = (props.birth).split("T");
    const newNameInput = useRef<HTMLInputElement>(null);
    const newSNSInput = useRef<HTMLInputElement>(null);
    const editInfo =async(newname:string, newsns:string) => {
        const result = await EditProfileApi(props.name, props.token, props.SNSLink, props.image, newname, newsns, undefined);
        if (result === false){
            alert("오류 발생, 다시 시도해주세요");
        } else {
            console.log(result);
        }
    }
    const handleEditBtnClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newNameInput.current===null || newSNSInput.current===null){
            alert("오류 발생");
        } else if (newNameInput.current.value===''){
            alert("이름은 반드시 필요합니다!");
        } else {
            // props.setName(newNameInput.current.value);
            // props.setSNSLink(newSNSInput.current.value);
            // props.setIsEditing(false);
            editInfo(newNameInput.current.value, newSNSInput.current.value);
        }
    }
  return (
    <UserInfoBox>
        <UserInfoHeader>
            <button onClick={handleEditBtnClick}>편집 완료</button>
        </UserInfoHeader>
        <UserInfoArticle>
            <WritingBox>
                <div className='label'>name</div>
                <input className='content' placeholder={props.name} ref={newNameInput} />
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
                <input className='content' placeholder={props.SNSLink ? props.SNSLink : 'none'} ref={newSNSInput} />
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