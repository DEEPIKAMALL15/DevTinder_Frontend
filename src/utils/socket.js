/* import { io } from "socket.io-client";
import { BASE_URL } from "./constants";


export const createSocketConnection = () => {
    return io(BASE_URL);
} */
// On the client
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(BASE_URL, {
    path: "/socket.io",       
    withCredentials: true
  });
};
