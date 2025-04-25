import React from "react";

function Message({ messageProp, user, classs }) {
  return (
    <div
      className={`${
        classs === "left" ? "float-left bg-green-200" : "float-right bg-red-300"
      } text-black text-sm m-1 p-2  rounded-xl font-semibold inline-block clear-both max-w-[45%] break-words`}
    >
      <span className="font-bold capitalize">{user ? `${user}: ` : ""}</span>
      <span>{messageProp}</span>
    </div>
  );
}

export default Message;
