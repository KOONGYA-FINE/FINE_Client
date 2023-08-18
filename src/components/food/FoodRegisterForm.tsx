import { useEffect, useState } from "react";
import StarEvaluation from "../utils/StarEvaluation";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerProps, submitPlaceRegisterAtom } from "../../store/atom";
import FoodReviewPhoto from "./FoodReviewPhoto";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import FoodTagButton, { CheckButton } from "./FoodTagButton";
import { ReviewInputWrapper } from "../../pages/food/FoodMain";
import { styled } from "styled-components";

const FoodRegisterForm = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const registerProp = useRecoilValue(registerProps);
  const [submitProp, setSubmitProp] = useRecoilState(submitPlaceRegisterAtom);
  const [text, setText] = useState("");
  const displayText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setSubmitProp((prev) => ({
      ...prev,
      content: newText,
    }));
  };
  useEffect(() => {
    setSubmitProp((prev) => ({
      ...prev,
      name: registerProp.name,
      address: registerProp.address,
      lat: registerProp.lat,
      lng: registerProp.lng,
      tag: registerProp.tag,
    }));
  }, [registerProp]);
  return (
    <>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_name`)}</ReviewRegisterText>
        <ReviewRegisterInput value={registerProp.name} disabled />
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_location`)}</ReviewRegisterText>
        <ReviewRegisterInput value={registerProp.address} disabled />
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_tag`)}</ReviewRegisterText>
        <div style={{ display: "flex" }}>
          {submitProp.tag === "cafe" ? (
            <CheckButton disabled>{submitProp.tag}</CheckButton>
          ) : (
            <FoodTagButton />
          )}
        </div>
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_rating`)}</ReviewRegisterText>
        <StarEvaluation />
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_content`)}</ReviewRegisterText>
      </ReviewInputWrapper>
      <ReviewRegisterTextArea
        value={text}
        onChange={displayText}
        minLength={5}
        maxLength={200}
      />
      <div>{text.length}/200</div>
      <FoodReviewPhoto />
    </>
  );
};

export default FoodRegisterForm;

export const ReviewRegisterInput = styled.input`
  height: 30px;
  padding: 6px 8px;
  border: 1px solid #2a5;
  border-radius: 5px;
`;

export const ReviewRegisterText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const ReviewRegisterTextArea = styled.textarea`
  width: 80vw;
  height: 450px;
  margin-top: -20px;
`;
