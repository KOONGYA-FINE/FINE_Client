import { useEffect, useState } from "react";
import StarEvaluation from "../utils/StarEvaluation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  KeyPairs,
  reviewReadingAtom,
  submitPlaceRegisterAtom,
} from "../../store/atom";

const FoodEditForm = () => {
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
      <div>맛집이름이 무엇인가요?</div>
      <input value={propInfo.name} disabled />
      <div>맛집 위치가 어디인지 알려주세요!</div>
      <input value={propInfo.address} disabled />
      <div>음식종류를 선택해주세요</div>
      <div>{submitProp.tag}</div>
      <div>맛집의 별점(다시 평가해주세요)</div>
      <StarEvaluation />
      <div>맛집이 어떤점에서 좋았나요?</div>
      <textarea
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
