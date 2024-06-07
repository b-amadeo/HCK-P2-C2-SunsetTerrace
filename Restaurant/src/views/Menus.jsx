import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import Loading from "../components/assets/loading.gif";
import axios from "axios";

export default function Menus({ url }) {
  const navigate = useNavigate()
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleAddCuisine(){
    navigate('/add-cuisine')
  }

  async function fetchMenus() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/cuisine`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      });
      setMenus(data.cuisines);

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

  // lifecyle mounted
  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div className="p-3">
      <div className="flex justify-end m-5">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-6 -mb-5"
          onClick={handleAddCuisine}
        >
          Add Cuisine
        </button>
      </div>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={Loading} alt="Loading..." />
        </div>
      ) : (
        <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
          {menus.map((menu) => (
            <Card key={menu.id} menu={menu} url={url} fetchMenus={fetchMenus}/>
          ))}
        </main>
      )}
    </div>
  );
}
