import { useSetRecoilState } from "recoil";
import { PlaceProp, registerProps } from "../../store/atom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const InfoCard: React.FunctionComponent<PlaceProp> = (props) => {
  const setRegisterProps = useSetRecoilState(registerProps);
  const router = useNavigate();
  const registerRouter = () => {
    setRegisterProps({
      name: props.name,
      address: props.address,
      lat: props.lat,
      lng: props.lng,
    });
    router("/food/register");
  };
  return (
    <>
      <div> {props.address}</div>
      <div> {props.name}</div>
      <CardImg src={`${props?.phtotoProp}`} />
      <button onClick={registerRouter}>리뷰남기러 가기</button>
    </>
  );
};

export default InfoCard;

const CardImg = styled.img`
  width: 50%;
  height: 50%;
`;
