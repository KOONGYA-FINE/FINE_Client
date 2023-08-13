import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { MatchingButton, MatchingWrapperBox } from "../styles/MatchingStyle";
import { CommonFlex } from "../common/commonstyle";
import { PostMatchingWritingApi } from "../apis/matchingWriting";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { UserInfoAtom, registerMatchingAtom } from "../store/atom";
import { useWithRoutePageFunc } from "../hooks/useRoutePageFunc";
import MatchingInterestRegister from "../components/matching/MatchingInterestRegister";
import MatchingWritingForm from "../components/matching/MatchingWritingForm";
import useGetToken from "../hooks/useGetToken";

const RegisterMatching = () => {
  const { t } = useTranslation();
  useGetLanguage();
  useGetToken();
  const registerProp = useRecoilValue(registerMatchingAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const navigate = useWithRoutePageFunc();
  const resetRegisterProp = useResetRecoilState(registerMatchingAtom);
  const matchingRegister = async () => {
    const result = await PostMatchingWritingApi(
      registerProp.title,
      userInfo.user.id,
      registerProp.content,
      registerProp.interest,
      t(`matching.register`) === "register" ? "en" : "ko",
      userInfo.token.access_token
    );
    if (typeof result !== "string") {
      alert("Success!");
      resetRegisterProp();
      navigate("matching/main");
    } else {
      alert(result);
    }
  };
  return (
    <>
      <MatchingWrapperBox className="edit">
        <MatchingWritingForm />
        <MatchingInterestRegister />
      </MatchingWrapperBox>
      <CommonFlex>
        {registerProp.title.length > 2 &&
        registerProp.content.length > 10 &&
        registerProp.interest.length > 2 ? (
          <MatchingButton onClick={matchingRegister}>
            {t(`matching.register`)}
          </MatchingButton>
        ) : (
          <MatchingButton className="unvalid">
            {t(`matching.register`)}
          </MatchingButton>
        )}
      </CommonFlex>
    </>
  );
};

export default RegisterMatching;
