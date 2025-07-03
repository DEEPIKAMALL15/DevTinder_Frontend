
 
 import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, removeUserFromFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom'; 

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const user = useSelector(store => store.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log("Failed to fetch feed:", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    } else {
      getFeed(); // ✅ Only fetch if user exists
    }
  }, [user]);

  const handleSwipe = (id) => {
    dispatch(removeUserFromFeed(id));
  };

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-10 px-4">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-600 text-center">
          No New Users...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-6 px-4">
      <div className="w-full max-w-md">
        <UserCard user={feed[0]} onSwipe={handleSwipe} />
      </div>
    </div>
  );
};

export default Feed;
 