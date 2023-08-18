import { useRecoilValue } from "recoil";
import { KeyPairs, matchingReadingAtom } from "../../store/atom";
import {
  MatchingWrapper,
  MatchingWrapperBox,
} from "../../styles/MatchingStyle";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import ScrapButton from "./scrap/ScrapButton";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SpecificMatchingForm = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const props = useRecoilValue(matchingReadingAtom);
  const Engproperties = props.post_en as KeyPairs<string, number>;
  const KRproperties = props.post_kr as KeyPairs<string, number>;
  const interest = Engproperties.interest as string;
  let interestArray: string[] = [];
  {
    Engproperties && Engproperties!.interest
      ? (interestArray = interest.split(" "))
      : [interest];
  }
  const imageLink = Engproperties.profile_image as string;
  // useEffect(()=> {
  //   console.log(Engproperties.username);
  //   console.log(props.post_kr);
  // }, [])
  const navigate = useNavigate();
  const handelProfileClick = () => {
    navigate(`/profile/${Engproperties.username}`);
  };

  return (
    <>
      <MatchingWrapperBox>
        <MatchingWrapper className="title">
          <div className="interestWrapper">
            {interestArray.map((e) => {
              return <InterestButton>{t(`interest.${e}`)}</InterestButton>;
            })}
          </div>
          <div className="titleFont">
            {t(`signup.previous`) === "Previous step"
              ? Engproperties.title
              : KRproperties.title}
          </div>
          <ProfileBox onClick={handelProfileClick}>
            <div>
              <img src={imageLink} />
              {Engproperties.username}
            </div>
            <ScrapButton />
          </ProfileBox>
        </MatchingWrapper>
        <MatchingWrapper className="content">
          {t(`signup.previous`) === "Previous step"
            ? Engproperties.content
            : KRproperties.content}
        </MatchingWrapper>
      </MatchingWrapperBox>
    </>
  );
};

export default SpecificMatchingForm;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    font-size: 16px;
  }
  & > div > img {
    width: 25px;
    height: 25px;
    border-radius: 25px;
  }
`;

export const InterestButton = styled.div`
  border-radius: 20px;
  background-color: rgba(206, 233, 216, 0.37);
  width: 15%;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  margin: 2px;
`;
