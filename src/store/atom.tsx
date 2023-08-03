import { atom } from "recoil";

export const TranslationAtom = atom<string>({
  key: "translationAtom",
  default: "en",
});
