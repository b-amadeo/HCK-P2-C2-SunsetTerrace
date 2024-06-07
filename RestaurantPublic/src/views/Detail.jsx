import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import Loading from "../components/assets/loading.gif";

export default function Detail({ url }) {
  const navigate = useNavigate()

  const [menus, setMenus] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  function handleBack(){
    navigate('/')
  }

  async function fetchMenu() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/pub/cuisine/${id}`);

      setMenus(data.cuisine);
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

  useEffect(() => {
    fetchMenu();
  }, []);

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
          <div className="flex justify-center items-center h-screen w-screen">
            <div className="p-20 bg-gray-100 shadow-2xl flex flex-row">
              <figure className="flex flex-1">
                <img
                  src={menus.imgUrl}
                  alt="menus image"
                  className="w-1/2 ml-20 rounded-xl"
                />
              </figure>
              <div className="flex flex-1 flex-col">
                <b className="mb-5 text-left">{menus.name}</b>
                <p className="text-left">
                  <ul>Description: {menus.description}</ul>
                </p>
                <p className="text-left">
                  <ul>Price: {menus.price}</ul>
                </p>
              </div>
              <div className="flex items-center">
                <a onClick={handleBack}>
                  <button className="border-2 px-8 py-3  rounded-md bg-yellow-900 text-white">
                    Back
                  </button>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
