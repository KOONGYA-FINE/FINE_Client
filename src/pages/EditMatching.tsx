import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { CommonFlex } from "../common/commonstyle";
import { MatchingWrapper, MatchingWrapperBox } from "../styles/MatchingStyle";
import { KeyPairs, UserInfoAtom, matchingReadingAtom } from "../store/atom";
import { useNavigate, useParams } from "react-router-dom";
import { getPostMatchingApi } from "../apis/matchingWriting";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";

const EditMatching = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const userInfo = useRecoilValue(UserInfoAtom);
  const resetUserInfo = useResetRecoilState(UserInfoAtom);
  const [props, setProps] = useRecoilState(matchingReadingAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const KRproperties = props.post_kr as KeyPairs<string, number>;
  const navigate = useNavigate();
  const getMatchingProps = async (postId: number, token: string) => {
    const result = await getPostMatchingApi(postId, token);
    if (result === "Not found.") {
      alert("This is not exist paper");
      navigate(-1);
    } else if (result === "Given token not valid for any token type") {
      alert("Please login first");
      resetUserInfo();
      navigate("/");
    } else {
      setProps({
        post_en: result?.data.post_en,
        post_kr: result?.data.post_kr,
      });
    }
  };
  useEffect(() => {
    getMatchingProps(numberIdx, userInfo.token.access_token);
    console.log(props);
    console.log(userInfo.token.access_token);
  }, [idx]);
  return (
    <>
      <MatchingWrapperBox className="edit">
        <MatchingWrapper className="title">매칭</MatchingWrapper>
        <MatchingWrapper className="editcontent">내용</MatchingWrapper>
        <MatchingWrapper className="select">아래로 내려가려나?</MatchingWrapper>
      </MatchingWrapperBox>
      <CommonFlex>
        <button>버튼</button>
      </CommonFlex>
    </>
  );
};

export default EditMatching;
