import React from "react";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { CommonFlex } from "../common/commonstyle";
import { useWithRoutePageFunc } from "../hooks/useRoutePageFunc";

const MatchingMain = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const navigate = useWithRoutePageFunc();
  return (
    <CommonFlex>
      <button onClick={() => navigate(`matching/register`)}>
        {t(`matching.writing`)}
      </button>
      <button onClick={() => navigate(`matching/main/1`)}>
        {t(`signup.previous`)}
      </button>
    </CommonFlex>
  );
};

export default MatchingMain;
