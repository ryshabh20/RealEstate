import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-dark shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white">Second</span>
            <span className="text-white">Floor</span>
          </h1>
        </Link>
        <form className="bg-white p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-white" />
        </form>
        <ul className="flex gap-4">
          <Link to="/home">
            <li className="hidden sm:inline text-white hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline  text-white hover:underline">
              About
            </li>
          </Link>

          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover "
              src={currentUser.avatar}
              alt="Profile"
            ></img>
          ) : (
            <Link to="sign-in">
              <li className=" hidden sm:inline text-white hover:underline">
                Sign in
              </li>
            </Link>
          )}

          <Link to="sign-up">
            <li className=" hidden sm:inline text-white hover:underline">
              Sign up
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
