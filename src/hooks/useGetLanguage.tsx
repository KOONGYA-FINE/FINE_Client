import { useRecoilValue } from "recoil";
import { TranslationAtom } from "../store/atom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const useGetLanguage = () => {
  const currentlang = useRecoilValue(TranslationAtom);
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(currentlang);
  }, [currentlang]);
};
