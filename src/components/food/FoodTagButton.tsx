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

const CheckButton = styled.button`
  &.checked {
    background-color: yellowgreen;
  }
`;
