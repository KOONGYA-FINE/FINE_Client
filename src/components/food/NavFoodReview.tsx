import { useRecoilValue } from "recoil";
import { KeyPairs, reviewReadingAtom } from "../../store/atom";
import StarRating from "../utils/StarRating";

const NavFoodReview = () => {
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  return (
    <>
      <div>
        <div>
          <div>{propInfo.tag}</div>
          <div>{propInfo.name}</div>
          <div>{propInfo.address}</div>
        </div>
        {propInfo.image === null ? (
          <div>
            <div>{propInfo.username}없지롱</div>
            <div>{propInfo.score}</div>
          </div>
        ) : (
          <div>
            {" "}
            <img src={`${propInfo.image}`} />
            {propInfo.username}
            <div>
              <StarRating rating={propInfo.score as number} />
            </div>
          </div>
        )}
      </div>
      <div>{propInfo.content}</div>
    </>
  );
};

export default NavFoodReview;
