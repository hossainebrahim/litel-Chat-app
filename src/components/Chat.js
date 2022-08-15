import React, { useEffect, useRef, useState } from "react";
import { db, timestamp } from "../utlis/firebase ";

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const endOfMessage = useRef(null);

  const scrollToBottom = () => {
    if (!endOfMessage.current) return;
    endOfMessage.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsub = db
      .collection("chats")
      .orderBy("timestamp", "desc")
      .limit(20)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        scrollToBottom();
      });
    return () => {
      unsub();
    };
  }, []);

  const renderChat = (chat) => {
    const byMe = chat.email === user?.email;
    if (byMe)
      return (
        <div
          key={chat.id}
          className={`bg-green-200 text-black max-w-[80%] w-fit p-2 rounded mb-2 self-end`}
        >
          {chat.text}
        </div>
      );
    return (
      <div
        key={chat.id}
        className={`flex bg-indigo-200 break-words break-all text-black max-w-[80%] w-fit p-2 rounded mb-2`}
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={chat?.image}
          alt=""
        />
        <div className="flex-1 pl-2">
          {chat.text}
          {chat?.attachment && (
            <img
              src={chat?.attachment}
              alt=""
              className="w-full rounded-md mt-2"
            />
          )}
          <div className="text-indigo-600 font-bold text-right mt-1">
            {chat.name}
          </div>
        </div>
      </div>
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    const data = {
      text: message,
      image: user.photoURL,
      name: user?.displayName,
      email: user?.email,
      timestamp,
    };
    db.collection("chats").add(data);
    setMessage("");
  };

  return (
    <>
      <div className="flex-grow h-[85vh] bg-gray-50 rounded-md flex flex-col">
        <div className="flex-grow flex flex-col-reverse p-3 overflow-auto">
          <div ref={endOfMessage} />
          {messages?.map((chat) => renderChat(chat))}
        </div>
        <div className="h-20 bg-gray-100 pt-3">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="bg-slate-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className=" ml-3 flex items-center justify-center text-indigo-700 font-semibold p-3 border border-transparent text-sm  rounded-md  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-opacity-10 hover:bg-opacity-20"
              onClick={sendMessage}
            >
              Sent
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
