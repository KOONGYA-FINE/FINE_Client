import { useRecoilValue } from "recoil";
import useGetReviewProps from "../../hooks/useGetReviewProps";
import { KeyPairs, reviewReadingAtom } from "../../store/atom";
import { useEffect } from "react";
import useCheckMine from "../../hooks/useCheckMine";
import { useNavigate } from "react-router-dom";

const FoodEdit = () => {
  useGetReviewProps();
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  const checkMine = useCheckMine(propInfo.user as number);
  const navigate = useNavigate();
  useEffect(() => {
    if (checkMine === false) {
      alert("This page can be access only writer");
      navigate("/matching/main");
    }
  }, []);
  return <div>{propInfo.content}</div>;
};

export default FoodEdit;
