import { createBrowserRouter } from "react-router-dom";
import Menus from "../views/Menus";
import Detail from "../views/Detail";

const url = "https://server.cozyb.me";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Menus url={url} />
  },
  {
    path: "/detail/:id",
    element: <Detail url={url} />
  }
]);

export default router;
