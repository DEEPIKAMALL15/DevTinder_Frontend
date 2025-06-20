
 import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-600">
          No Connections Found ...
        </h1>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto my-10 px-4 pb-28">
      <h1 className="text-3xl font-bold font-serif text-center mb-6">
        Connections
      </h1>

      <div className="space-y-6">
        {connections.map((connection) => {
          const { _id ,firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-base-300 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  alt="User"
                  className="w-20 h-20 object-cover rounded-full border border-gray-300"
                  src={photoUrl}
                />
                <div className="text-left">
                  <h2 className="text-xl font-semibold">
                    {firstName + ' ' + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-600">
                      {age} years, {gender}
                    </p>
                  )}
                  {about && <p className="mt-1 text-gray-700">{about}</p>}
                </div>
              </div>

              {/* Chat Button */}
              <div className="w-full sm:w-auto flex justify-center sm:justify-end sm:ml-auto">
                <Link to={"/chat/"+_id}>
                <button className="btn btn-primary w-full sm:w-auto mt-2 sm:mt-0">
                  Chat
                </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
