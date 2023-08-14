import styled from "styled-components";
import { useState } from "react";
import StarInput from "./StarInput";

const Base = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1.4rem;
  line-height: 100%;
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: yellowgreen;
  }
`;

const StarEvaluation = () => {
  const [rating, setRating] = useState(0);

  const handleClickRating = (value: number) => {
    setRating(value);
  };

  return (
    <Base>
      <Name>별점</Name>
      <RatingField>
        <StarInput onClickRating={handleClickRating} value={5} />
        <StarInput onClickRating={handleClickRating} value={4} />
        <StarInput onClickRating={handleClickRating} value={3} />
        <StarInput onClickRating={handleClickRating} value={2} />
        <StarInput onClickRating={handleClickRating} value={1} />
      </RatingField>
      <RatingValue>{rating}</RatingValue>
    </Base>
  );
};

export default StarEvaluation;
