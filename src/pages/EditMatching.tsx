import { useRecoilValue, useResetRecoilState } from "recoil";
import { CommonFlex } from "../common/commonstyle";
import {
  MatchingButton,
  MatchingWrapper,
  MatchingWrapperBox,
} from "../styles/MatchingStyle";
import {
  KeyPairs,
  UserInfoAtom,
  editMatchingAtom,
  matchingReadingAtom,
} from "../store/atom";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import useGetMatchingProps from "../hooks/useGetMatchingProps";
import useGetinterestArray from "../hooks/interestArray";
import { editMatchingApi } from "../apis/matchingWriting";
import MatchingEditForm from "../components/matching/MatchingEditForm";

const EditMatching = () => {
  const { t } = useTranslation();
  useGetLanguage();
  useGetMatchingProps();
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const props = useRecoilValue(matchingReadingAtom);
  const editProps = useRecoilValue(editMatchingAtom);
  const resetEditProps = useResetRecoilState(editMatchingAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const interest = Engproperties.interest as string;
  const interestArray = useGetinterestArray();
  let checkItems: string[] = [];
  const userInfo = useRecoilValue(UserInfoAtom);
  const navigate = useNavigate();
  {
    Engproperties && Engproperties!.interest
      ? (checkItems = interest.split(" "))
      : (checkItems = [interest]);
  }
  const matchingEdit = async () => {
    const result = await editMatchingApi(
      numberIdx,
      userInfo.user.id,
      t(`matching.register`) === "register" ? "en" : "ko",
      editProps.title,
      editProps.content,
      userInfo.token.access_token
    );
    if (typeof result !== "string") {
      alert("Success!");
      resetEditProps();
      setTimeout(() => {
        navigate(`/matching/main/${numberIdx}`, { replace: true });
      }, 1300);
    } else {
      alert(result);
    }
  };
  return (
    <>
      <MatchingWrapperBox className="edit">
        <MatchingEditForm />
        <MatchingWrapper className="select">
          {interestArray.map((el) => {
            return (
              <>
                <input
                  type="checkbox"
                  name={el.id}
                  checked={checkItems.includes(el.id) ? true : false}
                />
                <label>{el.content}</label>
              </>
            );
          })}
        </MatchingWrapper>
      </MatchingWrapperBox>
      <CommonFlex>
        <MatchingButton onClick={matchingEdit}>
          {t(`matching.register`)}
        </MatchingButton>
      </CommonFlex>
    </>
  );
};

export default EditMatching;
