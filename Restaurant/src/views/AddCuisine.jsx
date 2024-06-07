import MenuForm from "../components/MenuForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddCuisine({ url }) {
  const navigate = useNavigate();

  async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
    e.preventDefault();
    const addedData = { name, description, price: +price, imgUrl, categoryId };
    try {
      const { data } = await axios.post(`${url}/cuisine`, addedData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      Toastify({
        text: "Success add new cuisine",
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
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <MenuForm url={url} handleSubmit={handleSubmit} nameProp="Add Cuisine" />
    </div>
  );
}
