import { useEffect, useState } from "react";
import StarEvaluation from "../utils/StarEvaluation";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerProps, submitPlaceRegisterAtom } from "../../store/atom";
import FoodReviewPhoto from "./FoodReviewPhoto";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import FoodTagButton from "./FoodTagButton";

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
      <div>{t(`review.register_name`)}</div>
      <input value={registerProp.name} disabled />
      <div>{t(`review.register_location`)}</div>
      <input value={registerProp.address} disabled />
      <div>{t(`review.register_tag`)}</div>
      <>
        {submitProp.tag === "cafe" ? (
          <button>{submitProp.tag}</button>
        ) : (
          <FoodTagButton />
        )}
      </>
      <div>{t(`review.register_rating`)}</div>
      <StarEvaluation />
      <div>{t(`review.register_content`)}</div>
      <textarea
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
