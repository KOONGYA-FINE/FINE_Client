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

export const matchingReadingAtom = atom<KeyPair<object>>({
  key: "matchingReading",
  default: {
    post_en: {
      post_id: 0,
      username: "",
      school: "",
      gender: "",
      nation: 0,
      created_at: "",
      updated_at: "",
      title: "",
      content: "",
      image: "",
      interest: "",
      user_id: 0,
    },
    post_kr: {
      id: 0,
      created_at: "",
      updated_at: "",
      title: "",
      content: "",
      post: 0,
    },
  },
});
