import { atom } from "recoil";

export const TranslationAtom = atom<string>({
  key: "translationAtom",
  default: "en",
});

export interface KeyPair<V> {
  [key: string]: V;
}

export interface KeyPairs<V, U> {
  [key: string]: V | U;
}

export const UserInfoAtom = atom({
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

// eslint-disable-next-line react-refresh/only-export-components
export const matchingReadingAtom = atom<KeyPair<object>>({
  key: "matchingReading",
  default: {
    post_en: {},
    post_kr: {},
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const registerMatchingAtom = atom<KeyPair<string>>({
  key: "registerMatching",
  default: {
    title: "",
    content: "",
    interest: "",
  },
});

export const editMatchingAtom = atom<KeyPair<string>>({
  key: "editMatching",
  default: {
    title: "",
    content: "",
  },
});
