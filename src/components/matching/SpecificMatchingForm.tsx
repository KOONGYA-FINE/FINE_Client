import { useRecoilValue } from "recoil";
import { KeyPairs, matchingReadingAtom } from "../../store/atom";
import {
  MatchingWrapper,
  MatchingWrapperBox,
} from "../../styles/MatchingStyle";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import ScrapButton from "./scrap/ScrapButton";
import { useEffect } from "react";
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
  }

  return (
    <>
      <MatchingWrapperBox>
        <MatchingWrapper className="title">
          {t(`signup.previous`) === "Previous step"
            ? Engproperties.title
            : KRproperties.title}
          <ScrapButton />
          <ProfileBox onClick={handelProfileClick}>
            <div><img src={imageLink}/>{Engproperties.username}</div>
          </ProfileBox>
        </MatchingWrapper>
        <MatchingWrapper className="interest">
          {interestArray.map((e) => {
            return <button>{e}</button>;
          })}
        </MatchingWrapper>
        <MatchingWrapper className="content">
          {t(`signup.previous`) === "Previous step"
            ? Engproperties.content
            : KRproperties.content}
        </MatchingWrapper>
        <MatchingWrapper className="img">이미지</MatchingWrapper>
      </MatchingWrapperBox>
    </>
  );
};

export default SpecificMatchingForm;

const ProfileBox = styled.div`
  display: flex;
  background-color: coral;
  & > div {
    display: flex;
  }
`