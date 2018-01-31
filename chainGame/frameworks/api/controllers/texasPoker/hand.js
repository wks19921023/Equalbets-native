"use strict";
import {DeviceEventEmitter} from "react-native"; 
import ws from "./../../ws";
import * as events from "./../../constants"; 
import * as types from "./../../constants/type";
//request
export function joinHand(action){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:types.TEXAS_POKER,
      event:action.event,
    },
    data:action.data
  };
  ws.send(JSON.stringify(sendData));  
};

//resend
export function handPreStart(action){
  if(action.result==1) return DeviceEventEmitter.emit(events.HAND_PRE_START,action.data);
  return false;
};
//hand begin
export function handBegin(action){
  DeviceEventEmitter.emit(action.event,action.data);
};
export function dealCards(action){
  DeviceEventEmitter.emit(action.event,action.data);
}