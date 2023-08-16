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
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";

const PhotoProp = () => {
  const { t } = useTranslation();
  useGetLanguage();
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
        {t(`review.register_photo`)}
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
          <button onClick={deleteImgFile}>{t(`matching.delete`)}</button>
        </>
      )}
    </>
  );
};

export default PhotoProp;
