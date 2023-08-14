import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 1.5rem;
  color: lightgray;

  position: absolute;
  width: 12px;
  /* overflow: hidden; */

  &:nth-of-type(5) {
    transform: translate(48px);
  }
  &:nth-of-type(4) {
    transform: translate(72px);
  }
  &:nth-of-type(3) {
    transform: translate(96px);
  }
  &:nth-of-type(2) {
    transform: translate(120px);
  }
  &:nth-of-type(1) {
    transform: translate(144px);
  }
`;

interface StarProps {
  onClickRating: (value: number) => void;
  value: number;
}

const StarInput = (props: StarProps) => {
  const handleClickRatingInput = () => {
    props.onClickRating(props.value);
  };

  return (
    <>
      <Input
        type="radio"
        name="rating"
        id={`star${props.value}`}
        value={props.value}
      />
      <Label onClick={handleClickRatingInput} htmlFor={`star${props.value}`}>
        <FaStar />
      </Label>
    </>
  );
};

export default StarInput;
