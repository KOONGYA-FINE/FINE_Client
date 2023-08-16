import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getFoodInfoApi } from "../apis/foodapi";
import { reviewReadingAtom } from "../store/atom";
import { useSetRecoilState } from "recoil";

const useGetReviewProps = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const setProps = useSetRecoilState(reviewReadingAtom);
  const navigate = useNavigate();
  const getReviewProps = async (postId: number) => {
    const result = await getFoodInfoApi(postId);
    if (result === "Not found.") {
      alert("This is not exist paper");
      navigate("/matching/main");
    } else {
      setProps({ data: result?.data.data });
    }
  };
  useEffect(() => {
    getReviewProps(numberIdx);
  }, [idx]);
};

export default useGetReviewProps;
