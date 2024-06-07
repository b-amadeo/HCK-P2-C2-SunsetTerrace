import Card from "../components/Card";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import Loading from "../components/assets/loading.gif";
import axios from "axios";

export default function Menus({ url }) {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  async function fetchMenus() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/pub/cuisine?search=${search}&filter=${filter}&sort=${sort}&page=${page}`
      );

      setMenus(data.result.data);
      setTotalPage(data.result.totalPage);
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

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/pub/category`);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [search, filter, sort, page]);

  function handleSubmit(e) {
    e.preventDefault();
    fetchMenus();
  }

  function handleSort(e) {
    setSort(e.target.value);
  }

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  function handlePage(newPage) {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  }

  return (
    <div className="p-3">
      <div className="flex p-8 pb-0 justify-between items-center">
        <div className="flex ml-2 gap-6">
          <div className="">
            <label
              htmlFor="sort-select"
              className="mb-2 mx-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Filter
            </label>
            <select
              id="filter-select"
              className="block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={filter}
              onChange={handleFilter}
            >
              <option value={""}>All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label
              htmlFor="sort-select"
              className="mb-2 mx-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sort By
            </label>
            <select
              id="sort-select"
              className="block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={sort}
              onChange={handleSort}
            >
              <option value="-createdAt">Descending</option>
              <option value="createdAt">Ascending</option>
            </select>
          </div>
        </div>

        <form className="pt-4 w-96 mt-3 mr-28" onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="w-24"></div>
      </div>

      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={Loading} alt="Loading..." />
        </div>
      ) : (
        <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
          {menus.map((menu) => (
            <Card key={menu.id} menu={menu} url={url} />
          ))}
        </main>
      )}

<nav aria-label="Page navigation example" className="flex justify-center mt-4">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPage }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePage(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  page === index + 1
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page === totalPage}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}