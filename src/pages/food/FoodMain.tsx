import React from "react";
import StarEvaluation from "../../components/utils/StarEvaluation";
import FineGoogleMap from "../../components/utils/FineGoogleMap";
import FoodSearch from "./FoodSearch";
import { Outlet } from "react-router-dom";
import FoodRegister from "./FoodRegister";

const FoodMain = () => {
  return (
    <>
      <FoodSearch />
      <div>FoodMain</div>
      <StarEvaluation />
    </>
  );
};

export default FoodMain;
