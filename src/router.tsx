import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignupInfo from "./pages/SignupInfo";
import SignupAccount from "./pages/SignupAccount";

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
]);

export default router;
