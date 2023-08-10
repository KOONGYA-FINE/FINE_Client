import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import {
  MatchingButton,
  MatchingTextArea,
  MatchingWrapper,
  MatchingWrapperBox,
} from "../styles/MatchingStyle";
import { CommonFlex } from "../common/commonstyle";
import useGetinterestArray from "../hooks/interestArray";
import { PostMatchingWritingApi } from "../apis/matchingWriting";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../store/atom";
import { useWithRoutePageFunc } from "../hooks/useRoutePageFunc";

const RegisterMatching = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const interestArray = useGetinterestArray();
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [combinedCheckItems, setCombinedCheckItems] = useState("");
  const userInfo = useRecoilValue(UserInfoAtom);
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
      setCombinedCheckItems(checkItems.join(" "));
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
      setCombinedCheckItems(checkItems.join(" "));
    }
  };
  const [text, setText] = useState("");
  const [contentText, setContentText] = useState("");
  const displayText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const navigate = useWithRoutePageFunc();
  const matchingRegister = async () => {
    const result = await PostMatchingWritingApi(
      text,
      userInfo.user.id,
      contentText,
      combinedCheckItems,
      t(`matching.register`) === "register" ? "en" : "ko",
      userInfo.token.access_token
    );
    if (typeof result !== "string") {
      alert("Success!");
      navigate("matching/main");
    } else {
      alert(result);
    }
  };
  return (
    <>
      <MatchingWrapperBox className="edit">
        <MatchingWrapper className="title">
          <input
            placeholder="제목을 입력하세요(10자 내외)"
            maxLength={10}
            minLength={2}
            type="text"
            value={text}
            onChange={displayText}
          />
        </MatchingWrapper>
        <MatchingWrapper className="editcontent">
          <MatchingTextArea
            placeholder={
              t(`matching.register`) === "register"
                ? "Input your content"
                : "내용을 입력해주세요"
            }
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            minLength={5}
            maxLength={200}
          ></MatchingTextArea>
          <div>{contentText.length}/200</div>
        </MatchingWrapper>
        <MatchingWrapper className="select">
          {interestArray.map((el) => {
            return (
              <>
                <input
                  type="checkbox"
                  name={el.id}
                  onChange={(e) => handleSingleCheck(e.target.checked, el.id)}
                  checked={checkItems.includes(el.id) ? true : false}
                />
                <label>{el.content}</label>
              </>
            );
          })}
        </MatchingWrapper>
      </MatchingWrapperBox>
      <CommonFlex>
        <MatchingButton onClick={matchingRegister}>
          {t(`matching.register`)}
        </MatchingButton>
      </CommonFlex>
    </>
  );
};

export default RegisterMatching;
