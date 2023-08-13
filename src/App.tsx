import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import "./locales/i18n.ts";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
