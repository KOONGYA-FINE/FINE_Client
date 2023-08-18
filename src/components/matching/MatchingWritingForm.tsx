import React, { useState } from "react";
import { MatchingWrapper } from "../../styles/MatchingStyle";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { registerMatchingAtom } from "../../store/atom";
import { ContentInput, Text, TitleInput } from "./MatchingEditForm";

const MatchingWritingForm = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [contentText, setContentText] = useState("");
  const registerProp = useSetRecoilState(registerMatchingAtom);
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
      </MatchingWrapper>
    </>
  );
};

export default MatchingWritingForm;
