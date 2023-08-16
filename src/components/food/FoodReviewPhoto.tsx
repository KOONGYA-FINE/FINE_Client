import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  UserInfoAtom,
  beforeSubmitPhotoAtom,
  placesState,
  submitPhotoAtom,
  submitPlaceRegisterAtom,
} from "../../store/atom";
import { FoodRegisterApi } from "../../apis/foodapi";
import { useNavigate } from "react-router-dom";
import PhotoProp from "../utils/PhotoProp";

const FoodReviewPhoto = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const uploadImage = useRecoilValue(beforeSubmitPhotoAtom);
  const resetPhoto = useResetRecoilState(submitPhotoAtom);
  const beforeResetPhoto = useResetRecoilState(beforeSubmitPhotoAtom);
  const submitFile = useRecoilValue(submitPhotoAtom);
  const submitProp = useRecoilValue(submitPlaceRegisterAtom);
  const resetSubmitProp = useResetRecoilState(submitPlaceRegisterAtom);
  const resetPlaceState = useResetRecoilState(placesState);
  const router = useNavigate();
  const revokeBlobUrl = (blobUrl: string) => {
    URL.revokeObjectURL(blobUrl);
  };
  const submitFoodRegister = async () => {
    const result =
      submitFile === undefined
        ? await FoodRegisterApi(
            userInfo.token.access_token,
            submitProp.name,
            submitProp.rating,
            submitProp.address,
            submitProp.lat,
            submitProp.lng,
            submitProp.tag,
            submitProp.content
          )
        : await FoodRegisterApi(
            userInfo.token.access_token,
            submitProp.name,
            submitProp.rating,
            submitProp.address,
            submitProp.lat,
            submitProp.lng,
            submitProp.tag,
            submitProp.content,
            submitFile
          );
    if (result.status === 201) {
      alert("Success!");
      resetSubmitProp();
      revokeBlobUrl(uploadImage!);
      resetPlaceState();
      resetPhoto();
      beforeResetPhoto();
      router("/matching/main", { replace: true });
    } else {
      alert("Failed...");
    }
  };
  return (
    <>
      <PhotoProp />
      <button onClick={submitFoodRegister}>등록하기</button>
    </>
  );
};

export default FoodReviewPhoto;
