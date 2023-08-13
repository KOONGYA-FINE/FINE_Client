import { useNavigate, useParams } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { UserInfoAtom, matchingReadingAtom } from "../store/atom";
import { getPostMatchingApi } from "../apis/matchingWriting";
import { useEffect } from "react";

const useGetMatchingProps = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const resetUserInfo = useResetRecoilState(UserInfoAtom);
  const setProps = useSetRecoilState(matchingReadingAtom);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token") as string;
  const getMatchingProps = async (postId: number, token: string) => {
    const result = await getPostMatchingApi(postId, token);
    if (result === "Not found.") {
      alert("This is not exist paper");
      navigate("/matching/main");
    } else if (
      result === "Given token not valid for any token type" ||
      result === "Authorization header must contain two space-delimited values"
    ) {
      alert("Please login first");
      resetUserInfo();
      localStorage.clear();
      navigate("/");
    } else if (result === "This post is deleted") {
      alert("This post is deleted");
      navigate("/matching/main");
    } else {
      setProps({
        post_en: result?.data.post_en,
        post_kr: result?.data.post_kr,
      });
    }
  };
  useEffect(() => {
    getMatchingProps(numberIdx, token);
  }, [idx]);
};

export default useGetMatchingProps;
