import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  KeyPairs,
  beforeSubmitPhotoAtom,
  reviewReadingAtom,
  submitPhotoAtom,
  submitPlaceRegisterAtom,
} from "../../store/atom";
import { useLocation } from "react-router-dom";

const PhotoProp = () => {
  const location = useLocation().pathname;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setSubmitFile = useSetRecoilState(submitPhotoAtom);
  const setSubmitProp = useSetRecoilState(submitPlaceRegisterAtom);
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  const [uploadImage, setUploadImage] = useRecoilState(beforeSubmitPhotoAtom);
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
  };
  const deleteImgFile = () => {
    setUploadImage(null);
    setSubmitFile(undefined);
  };
  useEffect(() => {
    setUploadImage(
      location.includes("edit") ? (propInfo.image as string) : null
    );
  }, []);
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
    </>
  );
};

export default PhotoProp;
