import { useRecoilValue } from "recoil";
import useGetReviewProps from "../../hooks/useGetReviewProps";
import { KeyPairs, reviewReadingAtom } from "../../store/atom";
import { useEffect } from "react";
import useCheckMine from "../../hooks/useCheckMine";
import { useNavigate } from "react-router-dom";
import FineGoogleMap from "../../components/utils/FineGoogleMap";
import FoodEditForm from "../../components/food/FoodEditForm";
import FoodEditButton from "../../components/food/FoodEditButton";
import { HeaderFoodWrapper } from "./FoodMain";

const FoodEdit = () => {
  useGetReviewProps();
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  const checkMine = useCheckMine(propInfo.user as number);
  const navigate = useNavigate();
  const latitude = parseFloat(propInfo!.latitude as string);
  const longtitude = parseFloat(propInfo!.longitude as string);
  useEffect(() => {
    if (checkMine === false) {
      alert("This page can be access only writer");
      navigate("/matching/main");
    }
  }, []);
  return (
    <>
      <HeaderFoodWrapper className="register">
        <h2>RESTAURANT REVIEW</h2>
      </HeaderFoodWrapper>
      {!Number.isNaN(latitude) ? (
        <FineGoogleMap lat={latitude} lng={longtitude} />
      ) : null}
      <FoodEditForm />
      <FoodEditButton />
    </>
  );
};

export default FoodEdit;
