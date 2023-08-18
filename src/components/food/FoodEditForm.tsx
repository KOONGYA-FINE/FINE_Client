import { useEffect, useState } from "react";
import StarEvaluation from "../utils/StarEvaluation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  KeyPairs,
  reviewReadingAtom,
  submitPlaceRegisterAtom,
} from "../../store/atom";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import FoodTagButton, { CheckButton } from "./FoodTagButton";
import { ReviewInputWrapper } from "../../pages/food/FoodMain";
import {
  ReviewRegisterInput,
  ReviewRegisterText,
  ReviewRegisterTextArea,
} from "./FoodRegisterForm";

const FoodEditForm = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  const [submitProp, setSubmitProp] = useRecoilState(submitPlaceRegisterAtom);
  const [text, setText] = useState(propInfo.content as string);
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
      name: propInfo.name as string,
      address: propInfo.address as string,
      lat: parseFloat(propInfo!.latitude as string),
      lng: parseFloat(propInfo!.longitude as string),
      tag: propInfo.tag as string,
    }));
  }, [prop]);
  return (
    <>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_name`)}</ReviewRegisterText>
        <ReviewRegisterInput value={propInfo.name} disabled />
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_location`)}</ReviewRegisterText>
        <ReviewRegisterInput value={propInfo.address} disabled />
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>{t(`review.register_tag`)}</ReviewRegisterText>
        <div style={{ display: "flex" }}>
          {propInfo.tag === "cafe" ? (
            <CheckButton disabled>{propInfo.tag}</CheckButton>
          ) : (
            <FoodTagButton />
          )}
        </div>
      </ReviewInputWrapper>
      <ReviewInputWrapper>
        <ReviewRegisterText>
          {" "}
          {t(`review.register_rating`)}
          {t(`review.rating_again`)}
        </ReviewRegisterText>
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
      {/* <FoodReviewPhoto /> */}
    </>
  );
};

export default FoodEditForm;
