/* import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
const user=useSelector(store=>store.user);
const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = async () => {
  try{
    await axios.post(BASE_URL + "/logout",{},{
      withCredentials:true
    });
    dispatch(removeUser());
    return navigate("/login");

  } catch(err){
      console.log(err);
  }
}


  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👩🏻‍💻 DevTinder</Link>
      </div>
      {user && (
      <div className="flex items-center gap-2">
        <div className="form-control">Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end mx-5 mt-4">
            
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user photo"
                src={user?.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>)}
    </div>
  );
};

export default NavBar;

 */
/* import axios from "axios";
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
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-200 px-4 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary hover:bg-base-100">
          👩🏻‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="text-md text-gray-700 font-semibold hidden sm:block">
            Welcome, <span className="text-primary">{user.firstName}</span>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-base-100"
            >
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="user" src={user?.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-info">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
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
    <nav className="bg-base-300 shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-slate-500 hover:text-indigo-600">
        👩🏻‍💻 DevTinder
      </Link>

      {user && (
        <div className="flex items-center gap-4 relative">
          <span className="hidden sm:inline text-gray-600 font-medium">
            Welcome, <span className="text-white">{user.firstName}</span>
          </span>

          {/* Avatar + dropdown wrapper */}
          <div className="relative group">
            <img
              src={user?.photoUrl}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer"
            />

            {/* Dropdown menu */}
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
