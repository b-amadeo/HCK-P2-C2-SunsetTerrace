import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

export default function AddUser({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const addedData = {
      email,
      password,
      phoneNumber: toString(phoneNumber),
      address,
    };
    try {
      const { data } = await axios.post(`${url}/add-user`, addedData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      });

      Toastify({
        text: "Success add new user",
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
      navigate('/menus')

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
    <>
      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold pb-1 p-5">Add User</h1>
          <div className="grid grid-cols-1 gap-4 border-2 border-indigo-900 p-5 rounded-md">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter email ..."
                className="border-2 border-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password ..."
                className="border-2 border-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                placeholder="Enter phone number ..."
                className="border-2 border-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter address ..."
                className="border-2 border-gray-800"
              />
            </div>
          </div>
          <div>
            <button className="mt-10 w-full border-2 p-3 rounded-md bg-violet-600 text-white">
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
