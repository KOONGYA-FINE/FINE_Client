import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  UserInfoAtom,
  beforeSubmitPhotoAtom,
  submitPhotoAtom,
  submitPlaceRegisterAtom,
} from "../../store/atom";
import { useNavigate, useParams } from "react-router-dom";
import { putFoodRegisterApi } from "../../apis/foodapi";
import PhotoProp from "../utils/PhotoProp";

const FoodEditButton = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const userInfo = useRecoilValue(UserInfoAtom);
  const resetSubmitProp = useResetRecoilState(submitPlaceRegisterAtom);
  const submitProp = useRecoilValue(submitPlaceRegisterAtom);
  const uploadImage = useRecoilValue(beforeSubmitPhotoAtom);
  const resetPhoto = useResetRecoilState(submitPhotoAtom);
  const beforeResetPhoto = useResetRecoilState(beforeSubmitPhotoAtom);
  const submitFile = useRecoilValue(submitPhotoAtom);
  const router = useNavigate();

  const revokeBlobUrl = (blobUrl: string) => {
    URL.revokeObjectURL(blobUrl);
  };
  const submitEditFoodRegister = async () => {
    const result =
      submitFile === undefined
        ? await putFoodRegisterApi(
            numberIdx,
            userInfo.token.access_token,
            submitProp.rating as number,
            submitProp.tag as string,
            submitProp.content as string
          )
        : putFoodRegisterApi(
            numberIdx,
            userInfo.token.access_token,
            submitProp.rating as number,
            submitProp.tag as string,
            submitProp.content as string,
            submitFile
          );
    if (result.status !== 401 || result.status !== 404) {
      alert("Success!");
      resetSubmitProp();
      revokeBlobUrl(uploadImage!);
      resetPhoto();
      beforeResetPhoto();
      router(`/food/${numberIdx}`, { replace: true });
    } else {
      alert("Failed...");
    }
  };
  return (
    <>
      <PhotoProp />
      <button onClick={submitEditFoodRegister}>Register</button>
    </>
  );
};

export default FoodEditButton;
