"use strict";
import {DeviceEventEmitter} from "react-native"; 
import ws from "./../../ws";
import * as events from "./../../constants"; 
import * as types from "./../../constants/type";
export function sitIn(action){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:types.TEXAS_POKER,
      event:events.SIT_IN,
    },
    data:{
      account:"3333",
      gameType:action.data.gameType,
      blinds:action.data.blinds,
      buyIn:action.data.buyIn,
      username:"test"
    },
  };
  ws.send(JSON.stringify(sendData));  
};
export function leave(action){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:types.TEXAS_POKER,
      event:events.LEAVE,
    },
    data:action.data,
  };
  ws.send(JSON.stringify(sendData));
};
export function sit(action){
  if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:types.TEXAS_POKER,
      event:events.SIT,
    },
    data:action.data,
  };
  ws.send(JSON.stringify(sendData));
};
export function sitReply(action){
  if(action.result==1) return DeviceEventEmitter.emit(events.SIT_REPLY,action.data);
  return false;
};
export function sitInReply(action){
  if(action.result==1) return DeviceEventEmitter.emit(events.SIT_IN_REPLY,action.data);
  return false;
};
export function newPlayerEvent(action){
  if(action.result==1) return DeviceEventEmitter.emit(events.NEW_PLAYER_EVENT,action.data);
  return false;
};
export function sitEvent(action){
  if(action.result==1) return DeviceEventEmitter.emit(events.SIT_EVENT,action.data);
  return false;
};
export function leaveReply(action){
  if(action.result==1) return DeviceEventEmitter.emit(events.LEAVE_REPLY,action.data);
  return false;
};