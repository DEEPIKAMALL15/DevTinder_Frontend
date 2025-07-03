

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [targetUser, setTargetUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          photoUrl: senderId?.photoUrl,
          text,
          userId: senderId?._id,
          createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections/${targetUserId}`, {
        withCredentials: true,
      });
      setTargetUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch target user:', err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    fetchTargetUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on('messageReceived', ({ firstName, lastName, text, userId: senderId, photoUrl }) => {
      setMessages((prev) => [
        ...prev,
        {
          firstName,
          lastName,
          text,
          userId: senderId,
          photoUrl,
          createdAt: new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit('sendMessage', {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className='w-full max-w-4xl mx-auto my-4 h-[80vh] border border-gray-600 rounded-xl flex flex-col overflow-hidden bg-[#1e1e1e] text-white'>
      {/* Header */}
      <div className='flex items-center gap-4 p-4 border-b border-gray-700 bg-[#2c2c2c]'>
        {targetUser?.photoUrl && (
          <img
            src={targetUser.photoUrl}
            alt='Target User'
            className='w-10 h-10 rounded-full object-cover'
          />
        )}
        <h1 className='text-lg font-semibold'>
          {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : 'Chat'}
        </h1>
      </div>

      {/* Chat messages */}
      <div className='flex-1 p-4 overflow-y-auto space-y-3 custom-scroll'>
        {messages.map((msg, index) => {
          const isSender = msg.userId === userId;
          return (
            <div key={index} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`flex flex-col items-start gap-1 max-w-[80%] sm:max-w-[70%] ${
                  isSender ? 'items-end' : 'items-start'
                }`}
              >
                <div className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.photoUrl && (
                    <img
                      src={msg.photoUrl}
                      alt='profile'
                      className='w-8 h-8 rounded-full object-cover'
                    />
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm break-words ${
                      isSender ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                <span className='text-xs text-gray-400'>
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='p-4 border-t border-gray-700 bg-[#2c2c2c] flex items-center gap-3'>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='flex-1 px-4 py-2 rounded-full border border-gray-500 bg-transparent text-white placeholder-gray-400 outline-none'
          placeholder='Type a message...'
        />
        <button
          onClick={sendMessage}
          className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-white text-sm font-medium'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
