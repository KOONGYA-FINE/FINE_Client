import { useTranslation } from "react-i18next";
import { CommonFlex } from "../common/commonstyle";
import {
  MatchingButton,
  MatchingWrapper,
  MatchingWrapperBox,
} from "../styles/MatchingStyle";
import { useGetLanguage } from "../hooks/useGetLanguage";
import {
  useRoutePageFunc,
  useWithRoutePageFunc,
} from "../hooks/useRoutePageFunc";
import { useRecoilValue } from "recoil";
import { KeyPairs, UserInfoAtom, matchingReadingAtom } from "../store/atom";
import useGetMatchingProps from "../hooks/useGetMatchingProps";
import { useParams } from "react-router-dom";

const Matching = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const { t } = useTranslation();
  useGetLanguage();
  const props = useRecoilValue(matchingReadingAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  useGetMatchingProps();
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const KRproperties = props.post_kr as KeyPairs<string, number>;
  const navigate = useWithRoutePageFunc();
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
      {userInfo.user.id === Engproperties.user_id ? (
        <CommonFlex>
          <button onClick={() => navigate(`matching/main/${numberIdx}/edit`)}>
            수정
          </button>
          <button>버튼</button>
        </CommonFlex>
      ) : null}
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
