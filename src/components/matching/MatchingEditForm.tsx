import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  KeyPairs,
  editMatchingAtom,
  matchingReadingAtom,
} from "../../store/atom";
import { MatchingWrapper } from "../../styles/MatchingStyle";
import { styled } from "styled-components";

const MatchingEditForm = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const props = useRecoilValue(matchingReadingAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const KRproperties = props.post_kr as KeyPairs<string, number>;
  const [text, setText] = useState(
    t(`signup.previous`) === "Previous step"
      ? (Engproperties.title as string)
      : (KRproperties.title as string)
  );
  const [contentText, setContentText] = useState(
    t(`signup.previous`) === "Previous step"
      ? (Engproperties.content as string)
      : (KRproperties.content as string)
  );
  useEffect(() => {
    registerProp((prev) => ({
      ...prev,
      title: text,
      content: contentText,
    }));
  }, []);
  const registerProp = useSetRecoilState(editMatchingAtom);
  const displayText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    registerProp((prev) => ({
      ...prev,
      title: newText,
    }));
  };
  const displayContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContentText(newContent);
    registerProp((prev) => ({
      ...prev,
      content: newContent,
    }));
  };
  return (
    <>
      <MatchingWrapper className="edittitle">
        <Text>Titles</Text>
        <TitleInput
          placeholder={
            t(`matching.register`) === "register"
              ? "write your title(Less than 50)"
              : "제목을 입력해주세요(50자 이내)"
          }
          maxLength={50}
          minLength={2}
          type="text"
          value={text}
          onChange={displayText}
        />
      </MatchingWrapper>
      <MatchingWrapper className="editcontent">
        <Text>Content</Text>
        <div style={{ flexDirection: "column" }}>
          <ContentInput
            placeholder={
              t(`matching.register`) === "register"
                ? "Input your content(Less than 200)"
                : "내용을 입력해주세요(200자 이내)"
            }
            value={contentText}
            onChange={displayContent}
            minLength={5}
            maxLength={200}
          ></ContentInput>
        </div>
      </MatchingWrapper>
    </>
  );
};

export default MatchingEditForm;

export const Text = styled.div`
  color: rgba(34, 170, 85, 0.98);
  font-size: 20px;
  font-weight: 500;
  &.interest {
    position: relative;
    left: 10%;
    top: 3%;
  }
`;

export const TitleInput = styled.input`
  width: 45vw;
  height: 21px;
  padding: 12px 18px;
  gap: 8px;
  border-radius: 5px;
  border: 1px solid #2a5;
  &:focus {
    outline: none;
  }
`;

export const ContentInput = styled.textarea`
  width: 45vw;
  height: 20vh;
  padding: 12px 18px;
  gap: 8px;
  border-radius: 5px;
  border: 1px solid #2a5;
  &:focus {
    outline: none;
  }
`;
