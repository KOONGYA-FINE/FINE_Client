import useCheckMine from "../../hooks/useCheckMine";
import { useRecoilValue } from "recoil";
import { KeyPairs, UserInfoAtom, reviewReadingAtom } from "../../store/atom";
import useGetReviewProps from "../../hooks/useGetReviewProps";
import { deleteFoodRegisterApi } from "../../apis/foodapi";
import { useNavigate, useParams } from "react-router-dom";
import FineGoogleMap from "../../components/utils/FineGoogleMap";
import HeaderFoodReview from "../../components/food/HeaderFoodReview";
import NavFoodReview from "../../components/food/NavFoodReview";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";

const FoodReview = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  useGetReviewProps();
  const prop = useRecoilValue(reviewReadingAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  const checkMine = useCheckMine(propInfo.user as number);
  const latitude = parseFloat(propInfo.latitude as string);
  const longtitude = parseFloat(propInfo.longitude as string);
  const navigate = useNavigate();
  const onClick = () => {
    if (checkMine === false) {
      alert("This page can be access only writer");
    } else {
      navigate(`/food/${numberIdx}/edit`);
    }
  };

  const onDelete = async () => {
    if (checkMine === false) {
      alert("This function can be access only writer");
    } else {
      const result = await deleteFoodRegisterApi(
        numberIdx,
        userInfo.token.access_token
      );
      if (result.status === 204) {
        alert("delete Success!");
        navigate("/foodmain");
      } else {
        alert("delete failed..");
      }
    }
  };
  return (
    <>
      <HeaderFoodReview />
      {!Number.isNaN(latitude) ? (
        <FineGoogleMap lat={latitude} lng={longtitude} />
      ) : null}
      <NavFoodReview />
      <button onClick={onClick}>{t(`matching.edit`)}</button>
      <button onClick={onDelete}>{t(`matching.delete`)}</button>
    </>
  );
};

export default FoodReview;
