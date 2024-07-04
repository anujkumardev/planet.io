import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Canvas from "./Canvas";
const Home = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  // socket.on("print", (msg) => {
  //   setMessages([...messages, msg]);
  // });
  // const abcd = (e) => {
  //   e.preventDefault();
  //   socket.emit("print", userName);
  // };

  return (
    <>
      <Canvas socket={socket} />
    </>
  );
};

export default Home;
