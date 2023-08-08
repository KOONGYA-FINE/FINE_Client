import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignupInfo from "./pages/SignupInfo";
import SignupAccount from "./pages/SignupAccount";
import Matching from "./pages/Matching";
import EditMatching from "./pages/EditMatching";
import MatchingPageWrapper from "./pages/MatchingPageWrapper";

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
        path: ":idx",
        element: <Matching />,
      },
      {
        path: ":idx/edit",
        element: <EditMatching />,
      },
    ],
  },
]);

export default router;
