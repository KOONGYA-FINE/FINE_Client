import { useNavigate } from "react-router-dom";

export const useWithRoutePageFunc = () => {
  const router = useNavigate();
  return (page: string) => {
    router(`/${page}`);
  };
};

export const useRoutePageFunc = (page: string) => {
  const router = useNavigate();
  return () => {
    router(`/${page}`);
  };
};
