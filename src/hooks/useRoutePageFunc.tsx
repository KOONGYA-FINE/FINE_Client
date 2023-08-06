import { useNavigate } from "react-router-dom";

export const useRoutePageFunc = (page: string) => {
  const router = useNavigate();
  return () => {
    router(`/${page}`);
  };
};
