import { useRecoilValue } from "recoil";
import { KeyPairs, reviewReadingAtom } from "../../store/atom";

const HeaderFoodReview = () => {
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  return (
    <>
      <div>
        <div>{propInfo.name}</div>
        <div>
          {propInfo.user_image === null ? null : (
            <img src={`${propInfo.user_image}`} />
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderFoodReview;