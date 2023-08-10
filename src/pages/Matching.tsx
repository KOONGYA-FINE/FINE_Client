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
  useGetMatchingProps();
  const props = useRecoilValue(matchingReadingAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const KRproperties = props.post_kr as KeyPairs<string, number>;
  const interest = Engproperties.interest as string;
  const interestArray = interest.split(" ");
  const navigate = useWithRoutePageFunc();
  return (
    <>
      <MatchingWrapperBox>
        <MatchingWrapper className="title">
          {" "}
          {t(`signup.previous`) === "Previous step"
            ? Engproperties.title
            : KRproperties.title}
        </MatchingWrapper>
        <MatchingWrapper className="interest">
          {interestArray.map((e) => {
            return <button>{e}</button>;
          })}
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
            {t(`matching.edit`)}
          </button>
          <button>{t(`matching.delete`)}</button>
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
