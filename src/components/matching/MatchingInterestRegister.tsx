import { useEffect, useState } from "react";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import useGetinterestArray from "../../hooks/interestArray";
import { MatchingWrapper } from "../../styles/MatchingStyle";
import { useSetRecoilState } from "recoil";
import { registerMatchingAtom } from "../../store/atom";

const MatchingInterestRegister = () => {
  useGetLanguage();
  const interestArray = useGetinterestArray();
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [combinedCheckItems, setCombinedCheckItems] = useState("");
  const registerProp = useSetRecoilState(registerMatchingAtom);
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      if (checkItems.length > 4) {
        alert("don't check over 5 interests");
      } else {
        setCheckItems((prev) => [...prev, id]);
      }
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
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
            <input
              type="checkbox"
              name={el.id}
              onChange={(e) => handleSingleCheck(e.target.checked, el.id)}
              checked={checkItems.includes(el.id) ? true : false}
            />
            <label>{el.content}</label>
          </>
        );
      })}
    </MatchingWrapper>
  );
};

export default MatchingInterestRegister;
