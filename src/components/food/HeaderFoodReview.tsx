import { useRecoilValue } from "recoil";
import { KeyPairs, reviewReadingAtom } from "../../store/atom";
import { ReviewInputWrapper } from "../../pages/food/FoodMain";

const HeaderFoodReview = () => {
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  return (
    <>
      <ReviewInputWrapper>
        <div>{propInfo.name}</div>
        <div>{propInfo.address}</div>
      </ReviewInputWrapper>
    </>
  );
};

export default HeaderFoodReview;
