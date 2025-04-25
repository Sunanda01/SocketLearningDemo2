import React, { useState } from "react";
import { Link } from "react-router-dom";
let user;
function Join() {
  const [name, setName] = useState("");
  const senduser = () => {
    user = document.getElementById("name").value;
    document.getElementById("name").value = "";
  };
  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Learning Socket.IO</h1>

      <div className="flex flex-col items-center w-[90%] sm:w-[50%] text-white p-6 rounded-lg gap-3">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-white w-50 text-center pb-2">
          Demo Chat App
        </h2>

        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="bg-white text-black w-[50%] h-20 px-4 py-2 rounded mb-4 text-xl"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Link
          to="/chat"
          onClick={(e) => {
            !name ? e.preventDefault() : null;
          }}
        >
          <button
            onClick={senduser}
            className="bg-red-500  h-20  text-3xl px-6 py-2 rounded hover:bg-red-800 hover:text-white transition font-semibold"
          >
            Join Chat Room
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
export { user };
