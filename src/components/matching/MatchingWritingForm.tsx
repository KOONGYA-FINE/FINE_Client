import React, { useState } from "react";
import { MatchingTextArea, MatchingWrapper } from "../../styles/MatchingStyle";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { registerMatchingAtom } from "../../store/atom";

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
      <MatchingWrapper className="title">
        <input
          placeholder="제목을 입력하세요(10자 내외)"
          maxLength={50}
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
          onChange={displayContent}
          minLength={5}
          maxLength={200}
        ></MatchingTextArea>
        <div>{contentText.length}/200</div>
      </MatchingWrapper>
    </>
  );
};

export default MatchingWritingForm;
