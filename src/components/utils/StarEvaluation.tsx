import styled from "styled-components";
import { useState } from "react";
import StarInput from "./StarInput";
import { useSetRecoilState } from "recoil";
import { submitPlaceRegisterAtom } from "../../store/atom";

const Base = styled.section`
  display: flex;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translate(-50px, 15px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: #25ab58;
  }
`;

const StarEvaluation = () => {
  const [rating, setRating] = useState(0);
  const setSubmitProp = useSetRecoilState(submitPlaceRegisterAtom);

  const handleClickRating = (value: number) => {
    setRating(value);
    setSubmitProp((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  return (
    <Base>
      <RatingField>
        <StarInput onClickRating={handleClickRating} value={5} />
        <StarInput onClickRating={handleClickRating} value={4} />
        <StarInput onClickRating={handleClickRating} value={3} />
        <StarInput onClickRating={handleClickRating} value={2} />
        <StarInput onClickRating={handleClickRating} value={1} />
      </RatingField>
    </Base>
  );
};

export default StarEvaluation;
