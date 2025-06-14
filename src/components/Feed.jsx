/* import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector(store=>store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed) return ;
    try{
    const res = await axios.get(BASE_URL+"/feed",{
      withCredentials:true,
    });
    dispatch(addFeed(res.data.data));
    } catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
      getFeed();
  },[]);

  if(!feed) return ;
  if(feed.length<=0) return (
      <div className="flex justify-center my-10">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-600">
          No New Users...
        </h1>
      </div>
    );
  return (
    feed && (
    <div className='flex justify-center my-6'>
      <UserCard user={feed[0]}/>
    </div> )
  )
}

export default Feed
 */

import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
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
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
