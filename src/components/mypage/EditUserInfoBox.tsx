import React, { useRef } from 'react'
import { styled } from 'styled-components';
import { EditProfileApi } from '../../apis/mypagapis';
import { useNavigate } from 'react-router-dom';
import useGetToken from '../../hooks/useGetToken';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../../store/atom';

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
    const navigate = useNavigate();
    const genderStr = (props.gender === 'M')? 'Man' : 'Woman';
    const birthStr = (props.birth).split("T");
    const newNameInput = useRef<HTMLInputElement>(null);
    const newSNSInput = useRef<HTMLInputElement>(null);
    const newImageInput = useRef<HTMLInputElement>(null);
    const editInfo = async(newname:string, newsns:string, newImg:File|null) => {
        let newDataJson : any = {}
        const result = await EditProfileApi(props.name, props.token, newname, newsns, newImg);
        if (result === false){
            alert("오류 발생, 다시 시도해주세요");
        } else if (result === 'username already exists'){
            alert("이미 존재하는 사용자명입니다. 수정해주세요.");
        } else if (result === 'Not an Image File'){
            alert("이미지 파일 형식으로 넘겨주세요.");
        } else if (result === 'Given token not valid for any token type') {
            alert("재로그인 후 다시 시도해주세요.");
            navigate("/login");
        } else if (result === 'Authentication credentials were not provided.') {
            alert("로그인 해주세요");
            navigate("/login");
        } else if (result === "You do not have permission to perform this action.") {
            alert("접근 권한이 없습니다.");
            navigate("/");
        } else if (result === 413){
            alert("파일 크기가 너무 큽니다!");
        } else {
            alert("수정 완료");
            if (newname===''){
                props.setIsEditing(false);
            }else {
                navigate(`/matching/main`);
                props.setIsEditing(false);
            }
        }
    }
    
    const handleEditBtnClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newName = newNameInput.current === null ? '' : newNameInput.current.value as string;
        const newSNS = newSNSInput.current === null ? '' : newSNSInput.current.value as string;
        // const newImg = (newImageInput.current === null || newImageInput.current.files === null) ? '' : newImageInput.current.files[0].name;
        
        if (!(newImageInput.current?.files)) return;
        if (newImageInput.current.files[0]?.size > 1024 ** 2){
            alert("Your image size should be smaller than 1MB");
            newImageInput.current.value = '';
        } else {
            const file = newImageInput.current.files[0];
            const newImg = (file === undefined || file === null) ? null : file;
            
            editInfo(newName, newSNS, newImg);
        }
    };

  return (
    <UserInfoBox>
        <UserInfoHeader>
            <button onClick={handleEditBtnClick}>Edit Complete</button>
        </UserInfoHeader>
        <UserInfoArticle>
            <WritingBox>
                <div className='label'>Name</div>
                <input className='content' placeholder={props.name} ref={newNameInput} />
            </WritingBox>
            <WritingBox>
                <div className='label'>Nationality</div>
                <div className='content'>데이터 없음</div>
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
                <input className='content' placeholder={props.SNSLink ? props.SNSLink : 'none'} ref={newSNSInput} />
            </WritingBox>
            <WritingBox>
                <div className='label'>Profile Image</div>
                <input className='content' type='file' accept='image/*' ref={newImageInput} />
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
    justify-content: flex-end;
    background-color: white;
    border-bottom: 1px solid black;
    padding-right: 2%;
    gap: 2%;
    & > button{
        border: 0;
        background-color: transparent;
        margin: 0%;
    }
`

const UserInfoArticle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 30vh;
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
    & input{
        border: 0;
        border-bottom: 1px solid #9797978b;
        color: #9797978b;
        width: 200px;
    }
`