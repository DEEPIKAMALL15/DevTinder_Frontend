/* import React from "react";

const UserCard = ({ user }) => {
    
    const {firstName,lastName,photoUrl,age,gender,about}=user;
  return (
    <div className="card bg-base-300 w-96 h-auto shadow-xl">
      <figure className="w-80 ml-6">
        <img 
          src={photoUrl}
          alt="user"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-serif flex justify-center">{firstName + " " + lastName}</h2>
        {age && gender  && (<p className="text-xl">{age + " Years , " +gender}</p>)}
        <p className="text-base">{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn bg-gray-600 hover:bg-gray-500">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
 */

    /* import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id , firstName, lastName, photoUrl, age, gender, about } = user;
  
  const handleSendRequest = async (status,_id) => {
    try{
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},
        {withCredentials:true}
      );
      console.log(res);
      dispatch(removeUserFromFeed(_id));
    } catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className="card bg-base-300 w-96 shadow-xl transition-shadow hover:shadow-2xl">
      <figure className="px-6 pt-6">
        <img
          src={photoUrl}
          alt="user"
          className="rounded-xl w-full h-60 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-semibold font-serif">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="text-gray-600 text-sm">{age} years, {gender}</p>
        )}
        {about && <p className="text-gray-700 mt-2">{about}</p>}
        <div className="card-actions justify-center mt-4 space-x-4">
          <button className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
           onClick={()=>handleSendRequest("ignored",_id)}>
            Ignore
          </button>
          <button className="btn bg-primary hover:bg-primary-focus text-white px-4 py-2 rounded-lg"
          onClick={()=>handleSendRequest("interested",_id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
 
  
  
 */

import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-full max-w-sm sm:max-w-md bg-base-300 shadow-xl transition-shadow hover:shadow-2xl mx-auto">
      <figure className="px-4 pt-4">
        <img
          src={photoUrl}
          alt="user"
          className="rounded-xl w-full h-56 sm:h-60 object-cover"
        />
      </figure>

      <div className="card-body items-center text-center px-4 pb-4">
        <h2 className="card-title text-xl sm:text-2xl font-semibold font-serif break-words">
          {firstName + " " + lastName}
        </h2>

        {age && gender && (
          <p className="text-gray-600 text-sm sm:text-base">
            {age} years, {gender}
          </p>
        )}

        {about && (
          <p className="text-gray-700 text-sm sm:text-base mt-2 break-words max-w-full">
            {about}
          </p>
        )}

        <div className="card-actions flex flex-col sm:flex-row justify-center gap-3 mt-4 w-full">
          <button
            className="btn w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn w-full sm:w-auto bg-primary hover:bg-primary-focus text-white px-4 py-2 rounded-lg"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

