import useCheckMine from "../../hooks/useCheckMine";
import { useRecoilValue } from "recoil";
import { KeyPairs, UserInfoAtom, reviewReadingAtom } from "../../store/atom";
import useGetReviewProps from "../../hooks/useGetReviewProps";
import { deleteFoodRegisterApi } from "../../apis/foodapi";
import { useNavigate, useParams } from "react-router-dom";
import FineGoogleMap from "../../components/utils/FineGoogleMap";
import HeaderFoodReview from "../../components/food/HeaderFoodReview";
import NavFoodReview from "../../components/food/NavFoodReview";

const FoodReview = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  useGetReviewProps();
  const prop = useRecoilValue(reviewReadingAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  const checkMine = useCheckMine(propInfo.user as number);
  const latitude = parseFloat(propInfo!.latitude as string);
  const longtitude = parseFloat(propInfo!.longitude as string);
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
      alert("본인이 아닙니다");
    } else {
      const result = await deleteFoodRegisterApi(
        numberIdx,
        userInfo.token.access_token
      );
      if (result.status === 204) {
        alert("delete Success!");
        navigate("/matching/main");
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
      <button onClick={onClick}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </>
  );
};

export default FoodReview;
