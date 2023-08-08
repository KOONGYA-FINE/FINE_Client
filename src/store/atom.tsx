import { atom } from "recoil";

export const TranslationAtom = atom<string>({
  key: "translationAtom",
  default: "en",
});

interface KeyPair<V> {
  [key: string]: V;
}

export const UserInfoAtom = atom<KeyPair<object>>({
  key: "userInfo",
  default: {
    user: {
      id: 0,
      email: "",
    },
    token: {
      access_token: "",
      refresh_token: "",
    },
  },
});
