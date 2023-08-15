import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { registerProps } from "../../store/atom";
import StarEvaluation from "../../components/utils/StarEvaluation";
import { useWithRoutePageFunc } from "../../hooks/useRoutePageFunc";
import FineGoogleMap from "../../components/utils/FineGoogleMap";

const FoodRegister: React.FC = () => {
  const registerProp = useRecoilValue(registerProps);
  const navigate = useWithRoutePageFunc();
  useEffect(() => {
    if (registerProp.address === "") {
      alert("먼저 검색을 하고 오십시오");
      navigate("food/search");
    }
    console.log(registerProp);
  }, [registerProp]);
  return (
    <>
      <FineGoogleMap lat={registerProp.lat} lng={registerProp.lng} />
      <div>맛집이름이 무엇인가요?</div>
      <input value={registerProp.name} disabled />
      <div>맛집 위치가 어디인지 알려주세요!</div>
      <input value={registerProp.address} disabled />
      <div>음식종류를 선택해주세요</div>
      <div>여기가 들어갈거고..</div>
      <div>맛집의 별점</div>
      <StarEvaluation />
      <div>맛집이 어떤점에서 좋았나요?</div>
      <textarea />
    </>
  );
};

export default FoodRegister;
