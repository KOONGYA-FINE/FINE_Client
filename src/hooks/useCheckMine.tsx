import { useRecoilValue } from "recoil";
import useGetToken from "./useGetToken";
import { UserInfoAtom } from "../store/atom";

const useCheckMine = (idx: number) => {
  useGetToken();
  const userInfo = useRecoilValue(UserInfoAtom);
  if (userInfo.user.id !== idx) {
    return false;
  } else {
    return true;
  }
};

export default useCheckMine;
