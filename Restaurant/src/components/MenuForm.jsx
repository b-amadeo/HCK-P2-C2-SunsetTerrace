import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function MenuForm({ url, handleSubmit, cuisine, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (cuisine) {
      setName(cuisine.name);
      setDescription(cuisine.description);
      setPrice(cuisine.price);
      setImgUrl(cuisine.imgUrl);
      setCategoryId(cuisine.categoryId);
    }
  }, [cuisine]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/category`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setCategories(data.categories);
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
    fetchCategories();
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, categoryId)}>
      <h1 className="text-2xl font-bold pb-1 p-5">{nameProp}</h1>
      <div className="grid grid-cols-1 gap-4 border-2 border-indigo-900 p-5 rounded-md">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter name ..."
            className="border-2 border-gray-800 w-full"
            value={name}
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <select
            id="category"
            onChange={(e) => setCategoryId(e.target.value)}
            type="category"
            placeholder="Enter category ..."
            className="border-2 border-gray-800 w-full"
            value={categoryId}
          >
            <option value="" disabled>
              Select Category...
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter description ..."
            className="border-2 border-gray-800 w-full"
            value={description}
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter price ..."
            className="border-2 border-gray-800 w-full"
            value={price}
          />
        </div>
        <div>
          <label htmlFor="imageurl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ImageUrl
          </label>
          <input
            id="imageurl"
            onChange={(e) => setImgUrl(e.target.value)}
            type="text"
            placeholder="Enter imageUrl ..."
            className="border-2 border-gray-800 w-full"
            value={imgUrl}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-accent mt-3 w-full border-2 p-3 rounded-md bg-blue-600 text-white">
          {nameProp}
        </button>
      </div>
    </form>
  );
}
