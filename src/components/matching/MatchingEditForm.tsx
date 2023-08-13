import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  KeyPairs,
  editMatchingAtom,
  matchingReadingAtom,
} from "../../store/atom";
import { MatchingTextArea, MatchingWrapper } from "../../styles/MatchingStyle";

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
          onChange={displayContent}
          minLength={5}
          maxLength={200}
        ></MatchingTextArea>
        <div>{contentText.length}/200</div>
      </MatchingWrapper>
    </>
  );
};

export default MatchingEditForm;
