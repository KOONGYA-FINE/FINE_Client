import { useRecoilState } from "recoil";
import { tagoptionData } from "../../store/tagoptionData";
import { submitPlaceRegisterAtom } from "../../store/atom";
import { styled } from "styled-components";

const FoodTagButton = () => {
  const tagButtonArray = tagoptionData;
  const [submitProp, setSubmitProp] = useRecoilState(submitPlaceRegisterAtom);
  const handleButtonClick = (tag: string) => {
    setSubmitProp((prev) => ({
      ...prev,
      tag: tag,
    }));
  };
  return (
    <>
      {tagButtonArray.map((el) => {
        return (
          <>
            <CheckButton
              key={el.content}
              className={submitProp.tag === el.content ? "checked" : ""}
              onClick={() => {
                handleButtonClick(el.content);
              }}
            >
              <input
                type="checkbox"
                name={el.content}
                value={el.content}
                style={{ display: "none" }}
                checked={submitProp.tag.includes(el.content) ? true : false}
              />
              {el.content}
            </CheckButton>
          </>
        );
      })}
    </>
  );
};

export default FoodTagButton;

export const CheckButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 30px;
  margin: 10px 15px;
  border-radius: 20px;
  &.checked {
    background-color: rgba(34, 170, 85, 0.98);
    color: white;
  }
  &:disabled {
    background-color: pink;
  }
  &:hover {
    border-color: rgba(34, 170, 85, 0.98);
  }
`;
