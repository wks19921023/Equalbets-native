"use strict";
import {DeviceEventEmitter} from "react-native";
import ws from "./../../ws";
export function loginIn(data){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:"login",
      event:"LOGIN_IN",
    },
    data:data,
  };
  ws.send(JSON.stringify(sendData));  
};
export function loginInReply(data){
  DeviceEventEmitter.emit("loginInSuc",data);
};