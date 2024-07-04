import React, { useRef, useEffect, useState } from "react";
const style = {
  border: "1px solid black",
  display: "block",
};

const planet = {
  username: "planet",
  color: "red",
  x: Math.random() * 450 + 20,
  y: Math.random() * 450 + 20,
  radius: 20,
  rotation: 5, //one round in 5 seconds
};
function Canvas(props) {
  const [points, setPoints] = useState(new Map());
  const socket = props.socket;
  const canvasRef = useRef(null);
  let canvas;
  let context;

  const joinGalaxy = (e) => {
    socket.auth = { ...planet };
    socket.connect();
  };
  const draw = (context, point) => {
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    context.strokeStyle = point.color;
    context.stroke();
  };
  socket.on("draw", (data) => {
    console.log("ondrawing------", new Map(JSON.parse(data)));
    setPoints(new Map(JSON.parse(data)));
  });

  const emitPoint = (x, y) => {
    socket.emit("draw", planet);
  };
  const changePosition = (e) => {
    planet.x = e.clientX;
    planet.y = e.clientY;
    emitPoint(planet.x, planet.y);
  };
  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    emitPoint(planet.x, planet.y);
  }, []);
  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach((point) => {
      console.log("drawing------", point);
      draw(context, point);
    });
  }, [points]);
  return (
    <>
      <canvas
        id="canvas"
        style={style}
        width="500"
        height="500"
        onMouseMove={(e) => changePosition(e)}
        ref={canvasRef}
        {...props}
      ></canvas>

      <button onClick={(e) => joinGalaxy(e)}>join</button>
    </>
  );
}

export default Canvas;
