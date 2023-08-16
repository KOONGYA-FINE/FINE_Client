import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  UserInfoAtom,
  placesState,
  submitPlaceRegisterAtom,
} from "../../store/atom";
import { FoodRegisterApi } from "../../apis/foodapi";
import { useNavigate } from "react-router-dom";

const FoodReviewPhoto = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [submitFile, setSubmitFile] = useState<File | undefined>();
  const [submitProp, setSubmitProp] = useRecoilState(submitPlaceRegisterAtom);
  const resetSubmitProp = useResetRecoilState(submitPlaceRegisterAtom);
  const resetPlaceState = useResetRecoilState(placesState);
  const router = useNavigate();
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const ImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSubmitFile(e.target.files[0]);
    if (file) {
      const Image = URL.createObjectURL(file);
      setUploadImage(Image);
      setSubmitProp((prev) => ({
        ...prev,
        image: file,
      }));
    }
    console.log(submitProp.image);
  };
  const deleteImgFile = () => {
    setUploadImage(null);
    setSubmitFile(undefined);
  };
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
      router("/matching/main", { replace: true });
    } else {
      alert("Failed...");
    }
  };
  return (
    <>
      <button onClick={handleImageClick}>
        리뷰 이미지 추가
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          id="inputImage"
          onChange={ImgFile}
        />
      </button>
      {uploadImage && (
        <>
          <img src={uploadImage} alt="selected" />
          <button onClick={deleteImgFile}>삭제하기</button>
        </>
      )}
      <button onClick={submitFoodRegister}>등록하기</button>
    </>
  );
};

export default FoodReviewPhoto;
