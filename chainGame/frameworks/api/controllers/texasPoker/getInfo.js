"use strict";
import {DeviceEventEmitter} from "react-native"; 
import ws from "./../../ws";
export function getInfo(data){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:"texasPoker",
      event:"GET_INFO",
    },
    data:data,
  };
  ws.send(JSON.stringify(sendData));  
};
export function getInfoReply(data){
  DeviceEventEmitter.emit("GET_INFO_REPLY",data);
};