import { createBrowserRouter, redirect } from "react-router-dom";
import Login from '../views/Login'
import BaseLayout from '../views/BaseLayout'
import Home from '../views/Home'
import Menus from '../views/Menus'
import Categories from '../views/Categories'
import AddUser from '../views/AddUser'
import AddCuisine from '../views/AddCuisine'
import Detail from '../views/Detail'
import EditCuisine from '../views/EditCuisine'
import UpdateImage from "../views/UpdateImage";
import Toastify from 'toastify-js'

const url = 'https://server.cozyb.me'
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login url={url} />,
        loader: () => {
            if (localStorage.access_token) {
                Toastify({
                    text: "You already logged in",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/menus')
            }

            return null
        }
    },
    {
        path: "/",
        element: <Home url={url} />
    },
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/menus",
                element: <Menus url={url} />
            },
            {
                path: "/categories",
                element: <Categories url={url} />
            },
            {
                path: "/add-user",
                element: <AddUser url={url} />
            },
            {
                path: "/add-cuisine",
                element: <AddCuisine url={url} />
            },
            {
                path: "/detail/:id",
                element: <Detail url={url} />
            },
            {
                path: "/edit-cuisine/:id",
                element: <EditCuisine url={url} />
            },
            {
                path: "/update-image/:id",
                element: <UpdateImage url={url} />
            }
        ]
    },
])

export default router