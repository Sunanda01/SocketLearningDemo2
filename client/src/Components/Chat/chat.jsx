import { useEffect } from "react";
import { user } from "../Join/join";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:8000/";

function Chat() {
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  useEffect(() => {
    socket.on("connect", () => {
      alert(`Connected ${user} with Socket ID- ${socket.id}`);
    });

    return () => {};
  }, []);

  return <div>{user}</div>;
}

export default Chat;
