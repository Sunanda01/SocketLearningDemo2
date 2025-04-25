import { useEffect, useState } from "react";
import { user } from "../Join/join";
import socketIO from "socket.io-client";
import Message from "../Message/message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { MessageCircleHeart, Send, X } from "lucide-react";
const ENDPOINT = "http://localhost:8000/";

function Chat() {
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  const [message, setMessage] = useState([]);
  const [id, setId] = useState("");
  const send = () => {
    const msg = document.getElementById("chatInput").value;
    if (msg.trim() != "") {
      socket.emit("message", { msg, id });
      document.getElementById("chatInput").value = "";
    }
  };

  useEffect(() => {
    socket.on("sendMsg", (data) => {
      setMessage((prev) => [...prev, data]);
      console.log(`${data.user} ${data.msg} ${data.id}`);
    });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      alert(`Connected ${user}`);
      setId(socket.id);
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessage((prev) => [...prev, data]);
      console.log(`${data.user} ${data.msg} `);
    });
    socket.on("userjoined", (data) => {
      setMessage((prev) => [...prev, data]);
      console.log(`${data.user} ${data.msg} `);
    });
    socket.on("leaved", (data) => {
      setMessage((prev) => [...prev, data]);
      console.log(`${data.user} ${data.msg}`);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  return (
    <>
      <div className="bg-black h-screen w-screen flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center w-[80%] h-[90%] sm:w-[50%] text-white rounded-lg  bg-white">
          <div className="bg-purple-300 h-[10%] w-full flex items-center justify-between ">
            <div className="flex flex-row ml-3 gap-2 text-purple-800">
              <MessageCircleHeart className="flex h-8 w-8 " />
              <h1 className="text-xl font-bold flex">ChatApp</h1>
            </div>
            <a href="/">
              <X className="flex h-8 w-8 mr-3 cursor-pointer bg-red-500" />
            </a>
          </div>
          <ReactScrollToBottom className=" h-[80%] w-full box-border ">
            {message.map((item) => (
              <Message
                messageProp={item.msg}
                user={item.id === id ? "You" : item.user}
                key={item.id === id ? item.id : ""}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>
          <div className="h-[10%] w-full box-border flex border-t-2 border-black">
            <input
              id="chatInput"
              type="text"
              className="flex text-black w-[80%] outline-none p-3"
              placeholder="Enter Message...."
            />
            <button
              onClick={send}
              className="cursor-pointer items-center justify-center flex w-[20%] rounded border-none bg-purple-300 font-bold text-xl text-purple-600 hover:bg-purple-700 hover:text-white"
            >
              <Send className="flex h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
