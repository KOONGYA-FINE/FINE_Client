import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { UserInfoAtom } from "../store/atom";
import { LoginmaintainApi } from "../apis/loginapi";
import { useNavigate, useParams } from "react-router-dom";

const useGetToken = () => {
  const { idx } = useParams();
  const refresh_token = localStorage.getItem("refresh_token") as string;
  const userInfo = useSetRecoilState(UserInfoAtom);
  const router = useNavigate();
  useEffect(() => {
    const getUsertoken = async (token: string) => {
      const result = await LoginmaintainApi(token);
      if (result.status === 201) {
        userInfo({
          user: result.data.user,
          token: {
            access_token: result.data.access_token,
            refresh_token: "",
          },
        });
        localStorage.setItem("access_token", result.data.access_token);
      } else {
        alert(result);
        router("/");
      }
    };
    if (refresh_token) {
      getUsertoken(refresh_token);
    }
  }, [refresh_token, userInfo, idx]);
};

export default useGetToken;
