import { useRecoilValue } from "recoil";
import { CommonFlex } from "../common/commonstyle";
import { MatchingWrapper, MatchingWrapperBox } from "../styles/MatchingStyle";
import { KeyPairs, matchingReadingAtom } from "../store/atom";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import useGetMatchingProps from "../hooks/useGetMatchingProps";

const EditMatching = () => {
  const { t } = useTranslation();
  useGetLanguage();
  useGetMatchingProps();
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const props = useRecoilValue(matchingReadingAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const KRproperties = props.post_kr as KeyPairs<string, number>;

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
