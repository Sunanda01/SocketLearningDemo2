import { useEffect } from "react";
import { user } from "../Join/join";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:8000/";

function Chat() {
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  useEffect(() => {
    socket.on("connect", () => {
      alert(`Connected ${user}`);
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      console.log(`${data.user} ${data.msg} `);
    });
    socket.on("userjoined", (data) => {
      console.log(`${data.user} ${data.msg} `);
    });
    socket.on("leaved", (data) => {
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
        <div className="flex flex-col items-center w-[50%] h-[50%] sm:w-[50%] text-white rounded-lg  bg-white">
          <div className="bg-purple-300 h-[15%] w-full">Header</div>
          <div className=" h-[70%] w-full box-border border-black border-2">
            CahtBox
          </div>
          <div className="h-[15%] w-full box-border flex ">
            <input
              type="text"
              className="flex text-black w-[80%] outline-none p-3"
            />
            <button className="cursor-pointer w-[20%] rounded border-none bg-purple-300 font-bold text-xl text-purple-600 hover:bg-purple-700 hover:text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
