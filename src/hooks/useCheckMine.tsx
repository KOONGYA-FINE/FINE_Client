import { useRecoilValue } from "recoil";
import useGetToken from "./useGetToken";
import { UserInfoAtom } from "../store/atom";

const useCheckMine = () => {
  useGetToken();
  const userInfo = useRecoilValue(UserInfoAtom);
  if (userInfo.user.id !== 23) {
    return false;
  } else {
    return true;
  }
};

export default useCheckMine;
