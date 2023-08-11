import { useTranslation } from "react-i18next";
import { CommonFlex } from "../common/commonstyle";
import { MatchingButton } from "../styles/MatchingStyle";
import { useGetLanguage } from "../hooks/useGetLanguage";
import {
  useRoutePageFunc,
  useWithRoutePageFunc,
} from "../hooks/useRoutePageFunc";
import { useRecoilValue } from "recoil";
import { KeyPairs, UserInfoAtom, matchingReadingAtom } from "../store/atom";
import useGetMatchingProps from "../hooks/useGetMatchingProps";
import { useParams } from "react-router-dom";
import { deleteMatchingApi } from "../apis/matchingWriting";
import SpecificMatchingForm from "../components/matching/SpecificMatchingForm";

const Matching = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const { t } = useTranslation();
  useGetLanguage();
  useGetMatchingProps();
  const props = useRecoilValue(matchingReadingAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const navigate = useWithRoutePageFunc();
  const deleteMatching = async () => {
    const result = await deleteMatchingApi(
      numberIdx,
      userInfo.token.access_token
    );
    if (typeof result === "string") {
      alert(result);
    } else {
      alert("delete Success!");
      navigate("matching/main");
    }
  };
  return (
    <>
      <SpecificMatchingForm />
      {userInfo.user.id === Engproperties.user_id ? (
        <CommonFlex>
          <button onClick={() => navigate(`matching/main/${numberIdx}/edit`)}>
            {t(`matching.edit`)}
          </button>
          <button onClick={deleteMatching}>{t(`matching.delete`)}</button>
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
