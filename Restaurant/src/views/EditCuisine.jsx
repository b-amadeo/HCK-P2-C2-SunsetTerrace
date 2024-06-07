import MenuForm from "../components/MenuForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function EditCuisine({ url }) {
  const [cuisine, setCuisine] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchMenu() {
    try {
      const { data } = await axios.get(`${url}/cuisine/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      setCuisine(data.cuisine);
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

  async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
    e.preventDefault();
    const updatedData = { name, description, price: +price, imgUrl, categoryId };
    try {
      await axios.put(`${url}/cuisine/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      Toastify({
        text: "Success edit cuisine",
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

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <MenuForm url={url} handleSubmit={handleSubmit} cuisine={cuisine} nameProp="Edit Cuisine" />
    </div>
  );
}
