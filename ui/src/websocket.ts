import { io } from "socket.io-client";
import { addOneLive } from "./slices/live.slice";
import { appDispatch } from "./store";

export const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("liveUpdate", (data) => {
  appDispatch(addOneLive(data));
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

socket.on("error", (error) => {
  console.error("WebSocket error:", error);
});
