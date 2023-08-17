import { useSetRecoilState } from "recoil";
import { PlaceProp, registerProps } from "../../store/atom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";

const InfoCard: React.FunctionComponent<PlaceProp> = (props) => {
  const { t } = useTranslation();
  useGetLanguage();
  const setRegisterProps = useSetRecoilState(registerProps);
  const router = useNavigate();
  const registerRouter = () => {
    setRegisterProps({
      name: props.name,
      address: props.address,
      lat: props.lat,
      lng: props.lng,
      tag: props.tag,
    });
    router("/food/register");
  };
  return (
    <>
      <div> {props.address}</div>
      <div> {props.name}</div>
      <div>{props.tag}</div>
      <CardImg src={`${props?.phtotoProp}`} />
      <button onClick={registerRouter}>{t(`review.leave_review`)}</button>
    </>
  );
};

export default InfoCard;

const CardImg = styled.img`
  width: 50%;
  height: 50%;
`;