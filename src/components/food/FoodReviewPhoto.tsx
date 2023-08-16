import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  UserInfoAtom,
  registerProps,
  submitPlaceRegisterAtom,
} from "../../store/atom";

const FoodReviewPhoto = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [submitProp, setSubmitProp] = useRecoilState(submitPlaceRegisterAtom);
  const resetSubmitProp = useResetRecoilState(submitPlaceRegisterAtom);
  const resetRegisterProp = useResetRecoilState(registerProps);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const ImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const Image = URL.createObjectURL(file);
      setUploadImage(Image);
      setSubmitProp((prev) => ({
        ...prev,
        image: file,
      }));
    }
    console.log(file);
  };
  const revokeBlobUrl = (blobUrl: string) => {
    URL.revokeObjectURL(blobUrl);
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
      {uploadImage && <img src={uploadImage} alt="selected" />}
      <button>등록하기</button>
    </>
  );
};

export default FoodReviewPhoto;
