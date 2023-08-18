import { useSetRecoilState } from "recoil";
import { PlaceProp, registerProps } from "../../store/atom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { ArticleCardBox } from "./FoodCardBox";

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
      <CardImg src={`${props?.phtotoProp}`} />
      <Title> {props.name}</Title>
      <Content> {props.address}</Content>
      <Button onClick={registerRouter}>{t(`review.leave_review`)}</Button>
    </>
  );
};

export default InfoCard;

const CardImg = styled.img`
  width: 100%;
  height: 35%;
`;

const Title = styled.div`
  font-size: 11px;
  text-align: left;
  font-weight: 700;
`;

const Content = styled.div`
  font-size: 8px;
  text-align: left;
`;

const Button = styled.button`
  border: 1px solid rgba(34, 170, 85, 0.98);
  color: rgba(34, 170, 85, 0.98);
  width: 150px;
  height: 40px;
`;
