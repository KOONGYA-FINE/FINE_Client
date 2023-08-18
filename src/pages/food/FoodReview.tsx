import useCheckMine from "../../hooks/useCheckMine";
import { useRecoilValue } from "recoil";
import { KeyPairs, UserInfoAtom, reviewReadingAtom } from "../../store/atom";
import useGetReviewProps from "../../hooks/useGetReviewProps";
import { deleteFoodRegisterApi } from "../../apis/foodapi";
import { useNavigate, useParams } from "react-router-dom";
import FineGoogleMap from "../../components/utils/FineGoogleMap";
import HeaderFoodReview from "../../components/food/HeaderFoodReview";
import NavFoodReview from "../../components/food/FooterFoodReview";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { HeaderFoodWrapper } from "./FoodMain";
import { styled } from "styled-components";
import { CommonFlex } from "../../common/commonstyle";
import { MatchingButton } from "../../styles/MatchingStyle";

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
      <HeaderFoodWrapper>
        <h2>RESTAURANT REVIEW</h2>
      </HeaderFoodWrapper>
      <HeaderFoodReview />
      <MapWrapper>
        <div>
          {propInfo.user_image === null ? null : (
            <ReviewImg src={`${propInfo.image}`} />
          )}
        </div>
        {!Number.isNaN(latitude) ? (
          <FineGoogleMap lat={latitude} lng={longtitude} />
        ) : null}
      </MapWrapper>
      <NavFoodReview />
      <CommonFlex style={{ justifyContent: "space-around" }}>
        <MatchingButton onClick={onClick}>{t(`matching.edit`)}</MatchingButton>
        <MatchingButton onClick={onDelete}>
          {t(`matching.delete`)}
        </MatchingButton>
      </CommonFlex>
    </>
  );
};

export default FoodReview;

const MapWrapper = styled.div`
  display: flex;
`;

export const ReviewImg = styled.img`
  width: 40vw;
  height: 50vh;
  margin: 20px auto;
`;
