import { useTranslation } from "react-i18next";
import { CommonFlex } from "../common/commonstyle";
import {
  MatchingButton,
  MatchingWrapper,
  MatchingWrapperBox,
} from "../styles/MatchingStyle";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRoutePageFunc } from "../hooks/useRoutePageFunc";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { KeyPairs, UserInfoAtom, matchingReadingAtom } from "../store/atom";
import { getPostMatchingApi } from "../apis/matchingWriting";

const Matching = () => {
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
    } else if (
      result === "Given token not valid for any token type" ||
      result === "Authorization header must contain two space-delimited values"
    ) {
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
      <MatchingWrapperBox>
        <MatchingWrapper className="title">매칭</MatchingWrapper>
        <MatchingWrapper className="interest">
          아래로 내려가려나?
        </MatchingWrapper>
        <MatchingWrapper className="content">
          {t(`signup.previous`) === "Previous step"
            ? Engproperties.content
            : KRproperties.content}
        </MatchingWrapper>
        <MatchingWrapper className="img">이미지</MatchingWrapper>
      </MatchingWrapperBox>
      <CommonFlex>
        <button onClick={useRoutePageFunc(`matching/main/${numberIdx}/edit`)}>
          수정
        </button>
        <button>버튼</button>
      </CommonFlex>
      <CommonFlex>
        <MatchingButton
          onClick={useRoutePageFunc(`matching/main/${numberIdx - 1}`)}
        >
          {t(`signup.previous`)}
        </MatchingButton>
        <MatchingButton
          onClick={useRoutePageFunc(`matching/main/${numberIdx + 1}`)}
        >
          {t(`signup.next`)}
        </MatchingButton>
      </CommonFlex>
    </>
  );
};

export default Matching;
