import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Loading from "../components/assets/loading.gif";

export default function UpdateImage({ url }) {
  const navigate = useNavigate();
  const location = useLocation()
  const { menu } = location.state;
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  async function PatchImage(id) {
    if (!selectedFile) {
        Toastify({
          text: "Please select a file",
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
        return;
      }
  
      const formData = new FormData()
      formData.append("image", selectedFile)

    try {
      setLoading(true);
      const { data } = await axios.patch(`${url}/cuisine/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      Toastify({
        text: "Image updated successfully",
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
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
        <input 
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" 
        type="file" 
        onChange={(e) => setSelectedFile(e.target.files[0])}
        >
        </input>
        <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => PatchImage(menu.id)}
          >
            Update Image
        </button>
        </>
      )}
    </>
  );
}
