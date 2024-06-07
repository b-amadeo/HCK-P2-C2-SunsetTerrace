import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleInfo, faTrash, faPenToSquare, faImage} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Toastify from "toastify-js";
import Loading from "./assets/loading.gif";

export default function Card({ menu, url, fetchMenus }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function deleteMenu(id) {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${url}/cuisine/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}`},
      });
      fetchMenus();

      Toastify({
        text: "Menu deleted successfully",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/menus");

    } catch (error) {
      Toastify({
        text: error.response.data.message,
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
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/edit-cuisine/${id}`);
  }

  function handleUpdateImage(id){
    navigate(`/update-image/${id}`, { state: { menu } })
  }

  return (
    <>
      {loading ? (
        <>
          <div className="mt-32 flex justify-center items-center">
            <img src={Loading} />
          </div>
        </>
      ) : (
        <>
          <div className="border-solid border-2 border-zinc-400 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
            <div
              className="relative overflow-hidden bg-cover bg-no-repeat"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <div className="bg-zinc-400 h-72">
                <img className="rounded-t-lg" src={menu.imgUrl} alt="" />
              </div>
              <a href="#!">
                <div className="absolute bg-zinc-400  h-full w-full object-cover overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6 text-surface dark:text-white flex flex-col justify-between">
              <h5 className="mb-2 text-xl font-medium leading-tight">
                {menu.name}
              </h5>
              <p className="mb-4 text-base">
                {menu.description}
                <div className="flex justify-center items-end h-28">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="mx-5 text-2xl"
                    onClick={() => handleClick(menu.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mx-5 text-2xl"
                    onClick={() => deleteMenu(menu.id)}
                  />
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="mx-5 text-2xl"
                    onClick={() => handleEdit(menu.id)}
                  />
                  <FontAwesomeIcon 
                  icon={faImage} 
                  className="mx-5 text-2xl"
                  onClick={() => handleUpdateImage(menu.id)}
                   />
                </div>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
