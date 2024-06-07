import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import Loading from "../components/assets/loading.gif";
import axios from "axios";

export default function Menus({ url }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMenus() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/category`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      });
      setMenus(data.categories);
      
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
    <div className="flex flex-col items-center mt-8">
      <div className="border-2 px-6 py-6 border-black rounded">
      <h1 className="font-bold mb-4 border-2 px-6 border-gray-400">List Of Categories:</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={Loading} alt="Loading..." />
        </div>
      ) : (
        <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400 pr-12 text-black">
          {menus.map((menu, index) => (
            <li key={index} className="text-left">
              {menu.name}
            </li>
          ))}
        </ol>
      )}
      </div>
    </div>
  );
}
