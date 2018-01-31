"use strict";
import {DeviceEventEmitter} from "react-native"; 
import ws from "./../../ws";
import config from "./../../constants/config";
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
//get table status
export function getTable(action){ 
  return fetch(config.service+"/table/tableStatus")
         .then((res)=>res.json())
         .then((resJson)=>{
           //console.log(resJson);
           DeviceEventEmitter.emit(resJson.action.event,resJson.data);
         })
};
export function gameStart(){
  return DeviceEventEmitter.addListener("GAME_START",function(){
    return fetch(config.service+"/table/gameStart")
         .then((res)=>res.json())
         .then((resJson)=>{
           //console.log(resJson);
           DeviceEventEmitter.emit(resJson.action.event,resJson.data);
         })
  });
};
export function bigBlindEnd(){
  return DeviceEventEmitter.addListener("BIG_BLIND_END",function(){
    return fetch(config.service+"/table/bigBlindEnd")
           .then((res)=>res.json())
           .then((resJson)=>{
             DeviceEventEmitter.emit(resJson.action.event,resJson.data);
           })
  });
};
export function endActive(){
  return DeviceEventEmitter.addListener("END_ACTIVE",function(data){
    return fetch(config.service+"/table/endActive",{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((resJson)=>{
      DeviceEventEmitter.emit(resJson.action.event,resJson.data);
    })
    .catch((err)=>{
      console.log(err);
    });
  });
}
gameStart();
bigBlindEnd();
endActive();