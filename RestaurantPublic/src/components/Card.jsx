import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function Card({ menu }) {
  const navigate = useNavigate()
  
  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  return (
    <>
      <div className="border-solid border-2 border-zinc-400 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          
          <div className="bg-zinc-400 h-72">
            <img
            className="rounded-t-lg"
            src={menu.imgUrl}
            alt=""
          />
          </div>
          <a href="#!">
            <div className="absolute bg-zinc-400  h-full w-full object-cover overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
        <div className="p-6 text-surface dark:text-white flex flex-col justify-between">
          <h5 className="mb-2 text-xl font-medium leading-tight">{menu.name}</h5>
          <p className="mb-4 text-base">
            {menu.description}
            <div className="flex justify-center items-end h-28">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="mx-5 text-2xl"
                    onClick={() => handleClick(menu.id)}
                  />
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
