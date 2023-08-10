import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignupInfo from "./pages/SignupInfo";
import SignupAccount from "./pages/SignupAccount";
import Matching from "./pages/Matching";
import EditMatching from "./pages/EditMatching";
import MatchingPageWrapper from "./pages/MatchingPageWrapper";
import MatchingMain from "./pages/MatchingMain";
import RegisterMatching from "./pages/RegisterMatching";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
]);

export default router;
