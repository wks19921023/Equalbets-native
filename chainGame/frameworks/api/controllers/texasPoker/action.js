"use strict";
import {DeviceEventEmitter} from "react-native"; 
import ws from "./../../ws";
//request
export function action(action){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:action.type,
      event:action.event,
    },
    data:action.data,
  };
  ws.send(JSON.stringify(sendData));
};
//broadcast
export function actionReply(action){
  DeviceEventEmitter.emit(action.event,action.data);
};
export function actionEvent(action){
  DeviceEventEmitter.emit(action.event,action.data);
};