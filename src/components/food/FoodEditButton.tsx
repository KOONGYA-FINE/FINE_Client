import { useRecoilValue, useResetRecoilState } from "recoil";
import { UserInfoAtom, submitPlaceRegisterAtom } from "../../store/atom";
import { useNavigate, useParams } from "react-router-dom";
import { putFoodRegisterApi } from "../../apis/foodapi";

const FoodEditButton = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const userInfo = useRecoilValue(UserInfoAtom);
  const resetSubmitProp = useResetRecoilState(submitPlaceRegisterAtom);
  const submitProp = useRecoilValue(submitPlaceRegisterAtom);
  const router = useNavigate();
  const submitEditFoodRegister = async () => {
    const result = await putFoodRegisterApi(
      numberIdx,
      userInfo.token.access_token,
      submitProp.rating as number,
      submitProp.tag as string,
      submitProp.content as string
    );
    if (result.status === 201) {
      alert("Success!");
      resetSubmitProp();
      router("/matching/main", { replace: true });
    } else {
      alert("Failed...");
    }
  };
  return <button onClick={submitEditFoodRegister}>Register</button>;
};

export default FoodEditButton;
