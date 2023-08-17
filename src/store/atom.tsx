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
      username: "",
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
export const reviewReadingAtom = atom<KeyPair<object>>({
  key: "readingReview",
  default: {
    data: {},
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

export interface RegisterPlaceProp {
  name: string;
  address: string;
  lat: number;
  lng: number;
  tag: string;
}

export interface FinalRegisterPlaceProp extends RegisterPlaceProp {
  rating: number;
  content: string;
  image: File | undefined;
}

export interface PlaceProp extends RegisterPlaceProp {
  phtotoProp: string;
  rating: number;
  url: string;
}

export const placesState = atom<PlaceProp[]>({
  key: "placesState",
  default: [
    {
      phtotoProp: "",
      name: "",
      address: "",
      rating: 0,
      url: "",
      lat: 0,
      lng: 0,
      tag: "",
    },
  ],
});

export const registerProps = atom<RegisterPlaceProp>({
  key: "registerProps",
  default: {
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    tag: "",
  },
});

export const submitPlaceRegisterAtom = atom<FinalRegisterPlaceProp>({
  key: "submitPlaceRegister",
  default: {
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    rating: 0,
    content: "",
    tag: "",
    image: undefined,
  },
});

export const submitPhotoAtom = atom<File | undefined>({
  key: "submitPhoto",
  default: undefined,
});

export const beforeSubmitPhotoAtom = atom<string | null>({
  key: "beforeSubmitPhoto",
  default: null,
});
