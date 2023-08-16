import { useEffect, useState } from "react";
import StarEvaluation from "../utils/StarEvaluation";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerProps, submitPlaceRegisterAtom } from "../../store/atom";
import FoodReviewPhoto from "./FoodReviewPhoto";

const FoodRegisterForm = () => {
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
      <div>맛집이름이 무엇인가요?</div>
      <input value={registerProp.name} disabled />
      <div>맛집 위치가 어디인지 알려주세요!</div>
      <input value={registerProp.address} disabled />
      <div>음식종류를 선택해주세요</div>
      <div>{submitProp.tag}</div>
      <div>맛집의 별점</div>
      <StarEvaluation />
      <div>맛집이 어떤점에서 좋았나요?</div>
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
