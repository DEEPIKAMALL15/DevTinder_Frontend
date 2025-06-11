/* import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector(store=>store.connections);
    const dispatch = useDispatch();

   const fetchConnections = async() => {
    try{
        const res = await axios.get(BASE_URL+"/user/connections",
            {withCredentials:true}
        );
        console.log(res?.data?.data);
        dispatch(addConnections(res.data.data));
    } catch(err){
        console.log(err);
    }
   };
   useEffect(()=>{
    fetchConnections();
   },[]);
   if(!connections) return ;
   if(connections.length===0) return( <>
     <div className='flex justify-center my-10'>
      <h1 className='text-bold font-serif text-3xl'>No Connections Found ... </h1>
    </div>
   </>)

  return (
    <div className=' text-center my-10'>
      <h1 className='text-bold font-serif text-3xl'>Connections </h1>

      {connections.map((connection)=>{
        const {firstName,lastName,photoUrl,age,gender,about} = connection;
        return (
        <div className='m-4 p-4 flex rounded-lg bg-base-300 mx-auto w-1/2 h-auto'>
            <div className='w-20 h-20'> <img alt='photo' className='w-20 h-20 rounded-full' src={photoUrl}/> </div>
            <div className='text-left mx-4'>
                <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + "Years , " + gender} </p>}
                <p>{about}</p>
            </div>

           
           
        </div>
    )})}
    </div>
  )
}

export default Connections
 */

/* import axios from 'axios';

import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
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
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-600">No Connections Found ...</h1>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold font-serif text-center mb-6">Connections</h1>

      <div className="space-y-6">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-base-300 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                alt="User"
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
                src={photoUrl}
              />
              <div className="text-left">
                <h2 className="text-xl font-semibold">{firstName + " " + lastName}</h2>
                {age && gender && (
                  <p className="text-sm text-gray-600">{age} years, {gender}</p>
                )}
                {about && <p className="mt-1 text-gray-700">{about}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
 
 */
import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

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
    <div className="max-w-3xl mx-auto my-10 px-4 pb-28"> {/* pb-28 for footer space */}
      <h1 className="text-3xl font-bold font-serif text-center mb-6">
        Connections
      </h1>

      <div className="space-y-6">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-base-300 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                alt="User"
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
                src={photoUrl}
              />
              <div className="text-center sm:text-left">
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
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
