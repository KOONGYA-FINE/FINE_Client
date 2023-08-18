import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { registerProps } from "../../store/atom";
import { useWithRoutePageFunc } from "../../hooks/useRoutePageFunc";
import FineGoogleMap from "../../components/utils/FineGoogleMap";
import FoodRegisterForm from "../../components/food/FoodRegisterForm";
import useGetToken from "../../hooks/useGetToken";
import { HeaderFoodWrapper } from "./FoodMain";

const FoodRegister: React.FC = () => {
  useGetToken();
  const registerProp = useRecoilValue(registerProps);
  const refresh_token = localStorage.getItem("refresh_token") as string;
  const navigate = useWithRoutePageFunc();
  useEffect(() => {
    if (registerProp.address === "" && refresh_token) {
      alert("Do search First");
      navigate("food/search");
    }
    console.log(registerProp);
  }, [registerProp]);
  return (
    <>
      <HeaderFoodWrapper>
        <h2>RESTAURANT REVIEW</h2>
      </HeaderFoodWrapper>
      <FineGoogleMap lat={registerProp.lat} lng={registerProp.lng} />
      <FoodRegisterForm />
    </>
  );
};

export default FoodRegister;
