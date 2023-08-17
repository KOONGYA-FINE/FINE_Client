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
import { CheckButton } from "./FoodTagButton";

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
    const maxAllowedSize = 1024 * 1024;
    if (submitFile !== undefined && submitFile.size > maxAllowedSize) {
      alert(
        "Failed... Don't push large photo capacity We will be updated soon!"
      );
      revokeBlobUrl(uploadImage!);
      resetPhoto();
      beforeResetPhoto();
    } else {
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
        router("/foodmain", { replace: true });
      }
      // else if (result === false) {
      //   alert(
      //     "Failed... Don't push large photo capacity We will be updated soon!"
      //   );
      //   revokeBlobUrl(uploadImage!);
      //   beforeResetPhoto();
      // }
      else {
        alert("Failed...Try again");
      }
    }
  };
  return (
    <>
      <PhotoProp />
      <CheckButton
        disabled={
          submitProp.rating !== 0 && submitProp.tag !== "" ? false : true
        }
        onClick={submitFoodRegister}
      >
        Register
      </CheckButton>
    </>
  );
};

export default FoodReviewPhoto;
