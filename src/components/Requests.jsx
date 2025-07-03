
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const requests = useSelector(store => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10 px-4">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-600 text-center">
          No Requests Found ...
        </h1>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-6">
        Connection Requests
      </h1>

      <div className="space-y-6">
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-base-300 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex items-start sm:items-center gap-4 flex-wrap w-full min-w-0">
                <img
                  alt="User"
                  src={photoUrl}
                  className="w-16 h-16 object-cover rounded-full border border-gray-400 shrink-0"
                />
                <div className="text-left w-full sm:w-auto min-w-0">
                  <h2 className="text-base sm:text-lg font-bold break-words">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-500">{age} years, {gender}</p>
                  )}
                  {about && (
                    <p className="text-sm text-gray-600 truncate max-w-full sm:max-w-md overflow-hidden text-ellipsis">
                      {about}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center mt-2 sm:mt-0">
                <button
                  className="btn btn-primary btn-sm px-4"
                  onClick={() => reviewRequest('accepted', request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn bg-gray-700 hover:bg-base-100 btn-sm px-4"
                  onClick={() => reviewRequest('rejected', request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
