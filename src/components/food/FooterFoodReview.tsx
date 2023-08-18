import { useRecoilValue } from "recoil";
import { KeyPairs, reviewReadingAtom } from "../../store/atom";
import StarRating from "../utils/StarRating";
import { styled } from "styled-components";
import { CommonFlex } from "../../common/commonstyle";
import { InterestButton } from "../matching/SpecificMatchingForm";

const NavFoodReview = () => {
  const prop = useRecoilValue(reviewReadingAtom);
  const propInfo = prop.data as KeyPairs<string, number>;
  return (
    <>
      <ReviewFooterWrapper>
        <div>
          <div>
            <InterestButton>{propInfo.tag}</InterestButton>
          </div>
          <CommonFlex className="space-between">
            <div style={{ display: "flex", alignItems: "center" }}>
              {propInfo.user_image === null ? null : (
                <ProfileImg src={`${propInfo.user_image}`} />
              )}
              {propInfo.username}
            </div>
            <StarRating rating={propInfo.score as number} />
          </CommonFlex>
        </div>
        <div className="content">{propInfo.content}</div>
      </ReviewFooterWrapper>
    </>
  );
};

export default NavFoodReview;

const ReviewFooterWrapper = styled.div`
  width: 80vw;
  height: 25vh;
  border: 1px solid rgba(34, 170, 85, 0.98);
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  .content {
    padding: 20px 0px;
    color: #979797;
    font-size: 16px;
    text-align: left;
  }
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin: 10px 0px;
`;
