/* import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
   const [firstName,setFirstName] = useState("");
   const [lastName,setLastName] = useState("");
   const [emailId,setEmailId] = useState("");
   const [password,setPassword] = useState("");
   const [isLoginForm,setLoginForm] = useState(false);
   const [error,setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleLogin = async () => {
    
    try{
        const res = await axios.post(BASE_URL+"/login",{
            emailId,
            password,
        },{withCredentials:true});
        
        
        dispatch(addUser(res.data));
        return navigate("/");
    } catch (err) {
      setError(err);
        
    }

   }

  return (
    <div className="flex justify-center my-14">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-2xl">{isLoginForm? "Login" : "Signup"}</h2>
          <div >
           {!isLoginForm && <><label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
                
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your First Name"
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e)=>setFirstName(e.target.value)}
              />
              
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
                
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your Last Name"
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e)=>setLastName(e.target.value)}
              />
              
            </label> </>}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
                
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Enter your Email Id"
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e)=>setEmailId(e.target.value)}
              />
              
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
                
              </div>
              <input
                type="text"
                value={password}
                placeholder="Enter your Password"
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e)=>setPassword(e.target.value)}
              />
              
            </label>
            <p className="cursor-pointer text-blue-700" onClick={()=>setLoginForm((value)=>!value)}>{isLoginForm 
              ? "New User? Signup here"
              : "Existing User Login Here"
          }
          </p>
          </div>
          {error && (<p className="text-red-500">{error?.response?.data || "Something went wrong !!!"}</p>)}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={handleLogin}>{isLoginForm ? "Login" : "Signup" }</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
 */
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setLoginForm] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err);
    }
  };
  const handleSignup = async () => {
    try{
      const res = await axios.post(
        BASE_URL+"/signup",
        {firstName,lastName,emailId,password},
        {withCredentials:true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");

    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold  text-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>

          {!isLoginForm && (
            <>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter your First Name"
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter your Last Name"
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text">Email Id</span>
            </div>
            <input
              type="email"
              value={emailId}
              placeholder="Enter your Email Id"
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              placeholder="Enter your Password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <p className="text-error text-sm mt-1">
              {error?.response?.data || "Something went wrong!"}
            </p>
          )}

          <p
            className="cursor-pointer text-blue-600 hover:underline text-sm mt-3 text-center"
            onClick={() => setLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup here"
              : "Existing User? Login here"}
          </p>

          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin :handleSignup}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
