import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignupInfo from "./pages/SignupInfo";
import SignupAccount from "./pages/SignupAccount";
import Matching from "./pages/Matching";
import EditMatching from "./pages/EditMatching";
import MatchingPageWrapper from "./pages/MatchingPageWrapper";
import MatchingMain from "./pages/MatchingMain";
import RegisterMatching from "./pages/RegisterMatching";
import { Landing } from "./pages/Landing";
import FoodMain from "./pages/food/FoodMain";
import FoodSearch from "./pages/food/FoodSearch";
import FoodRegister from "./pages/food/FoodRegister";
import FoodReview from "./pages/food/FoodReview";
import FoodEdit from "./pages/food/FoodEdit";
import { FoodReviewMain } from "./pages/food/FoodReviewMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "landing",
    element: <Landing />,
  },
  {
    path: "signup",
    element: <SignupAccount />,
  },
  {
    path: "userinfo",
    element: <SignupInfo />,
  },
  {
    path: "matching",
    element: <MatchingPageWrapper />,
    children: [
      {
        path: "main",
        element: <MatchingMain />,
      },
      {
        path: "main/:idx",
        element: <Matching />,
      },
      {
        path: "main/:idx/edit",
        element: <EditMatching />,
      },
      {
        path: "register",
        element: <RegisterMatching />,
      },
    ],
  },
  {
    path: "foodmain",
    element: <FoodReviewMain />,
  },
  {
    path: "food",
    element: <FoodMain />,
    children: [
      {
        path: ":idx",
        element: <FoodReview />,
      },
      {
        path: ":idx/edit",
        element: <FoodEdit />,
      },
      {
        path: "search",
        element: <FoodSearch />,
      },
      {
        path: "register",
        element: <FoodRegister />,
      },
    ],
  },
]);

export default router;
