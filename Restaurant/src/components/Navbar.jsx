import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  function handleLogout(){
    localStorage.clear()
    navigate('/')
  }

    return (
        <>
        <header className="bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a className="-m-1.5 p-1.5">
                <img className="w-16 h-16" src="https://st3.depositphotos.com/22052918/32286/v/450/depositphotos_322866956-stock-illustration-sunset-seagull-fly-ocean-symbol.jpg" alt="" />
              </a>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Link to="/menus" className="text-sm font-semibold leading-6 text-gray-900">Menus</Link>
              <Link to="/categories" className="text-sm font-semibold leading-6 text-gray-900">Categories</Link>
              <Link to="/add-user" className="text-sm font-semibold leading-6 text-gray-900">Add User</Link>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></a>
            </div>
          </nav>
        </header>
        </>
    )
}