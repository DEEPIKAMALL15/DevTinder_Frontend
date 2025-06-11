/* 

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-base-300 shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-slate-500 hover:text-indigo-600">
        👩🏻‍💻 DevTinder
      </Link>

      {user && (
        <div className="flex items-center gap-4 relative">
          <span className="hidden sm:inline text-gray-600 font-medium">
            Welcome, <span className="text-white">{user.firstName}</span>
          </span>

          
          <div className="relative group">
            <img
              src={user?.photoUrl}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer"
            />

            
            <div className="absolute right-0 mt-2 rounded-2xl w-48 bg-gray-700  shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-gray-600"
              >
                Profile
              </Link>
              <Link
                to="/connections"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-gray-600"
              >
                Connections
              </Link>
              <Link
                to="/requests"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-gray-600"
              >
                Requests
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
 */

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-base-300 shadow-md px-4 md:px-8 py-3 flex flex-wrap justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-slate-500 hover:text-indigo-600 mb-2 md:mb-0"
      >
        👩🏻‍💻 DevConnect
      </Link>

      {/* Right Side */}
      {user && (
        <div className="flex items-center gap-x-4 relative">
          {/* Welcome message (hidden on small screens) */}
          <span className="hidden sm:inline text-gray-600 font-medium">
            Welcome, <span className="text-white">{user.firstName}</span>
          </span>

          {/* Profile image and dropdown */}
          <div className="relative group focus-within:block">
            <img
              src={user?.photoUrl}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer"
              tabIndex={0}
            />

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 invisible group-hover:visible group-focus-within:visible transition-all duration-200 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-gray-600"
              >
                Profile
              </Link>
              <Link
                to="/connections"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-gray-600"
              >
                Connections
              </Link>
              <Link
                to="/requests"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-gray-600"
              >
                Requests
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
