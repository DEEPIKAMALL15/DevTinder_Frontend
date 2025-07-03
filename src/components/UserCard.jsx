import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { toast } from "react-toastify";

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
      toast.success(`User ${status}`);
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

 
