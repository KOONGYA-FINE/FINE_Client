import { useEffect, useState } from "react";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import useGetinterestArray from "../../hooks/interestArray";
import { MatchingWrapper } from "../../styles/MatchingStyle";
import { useSetRecoilState } from "recoil";
import { registerMatchingAtom } from "../../store/atom";
import { styled } from "styled-components";

const MatchingInterestRegister = () => {
  useGetLanguage();
  const interestArray = useGetinterestArray();
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [combinedCheckItems, setCombinedCheckItems] = useState("");
  const registerProp = useSetRecoilState(registerMatchingAtom);
  const handleButtonCheck = (id: string) => {
    if (!checkItems.includes(id)) {
      if (checkItems.length > 4) {
        alert("don't check over 5 interests");
      } else {
        setCheckItems((prev) => [...prev, id]);
      }
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  // const handleSingleCheck = (checked: boolean, id: string) => {
  //   if (checked) {
  //     if (checkItems.length > 4) {
  //       alert("don't check over 5 interests");
  //     } else {
  //       setCheckItems((prev) => [...prev, id]);
  //     }
  //   } else {
  //     setCheckItems(checkItems.filter((el) => el !== id));
  //   }
  // };
  useEffect(() => {
    setCombinedCheckItems(checkItems.join(" "));
    registerProp((prev) => ({
      ...prev,
      interest: combinedCheckItems,
    }));
  }, [checkItems, combinedCheckItems, registerProp]);
  return (
    <MatchingWrapper className="select">
      {interestArray.map((el) => {
        return (
          <>
            <TestCheckButton
              key={el.id}
              className={checkItems.includes(el.id) ? "checked" : ""}
              onClick={() => {
                handleButtonCheck(el.id);
              }}
            >
              <input
                type="checkbox"
                name={el.id}
                style={{ display: "none" }}
                checked={checkItems.includes(el.id) ? true : false}
              />
              {el.content}
            </TestCheckButton>
          </>
        );
      })}
    </MatchingWrapper>
  );
};

export default MatchingInterestRegister;

export const TestCheckButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 30px;
  margin: 10px 15px;
  border-radius: 20px;
  &:hover {
    border-color: rgba(34, 170, 85, 0.98);
  }
  &.checked {
    background-color: rgba(34, 170, 85, 0.98);
    color: white;
  }
`;
