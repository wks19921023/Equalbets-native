"use strict";
import {DeviceEventEmitter} from "react-native";
import ws from "./../../ws";
import config from "./../../constants/config";
export function loginIn(data){
  //if(ws.readyState!=1) return console.log("发送请求时，ws已断开！");
  let sendData = {
    action:{
      type:"login",
      event:"LOGIN_IN",
    },
    data:data,
  };
  //ws.send(JSON.stringify(sendData)); 
  //return fetch("http://192.168.0.45:8000/login?userName="+data.userName+"&pwd="+data.pwd)
  return fetch(config.service+"/login",{
    method:"POST",
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      userName:data.userName,
      pwd:data.pwd
    })
  })
  .then((res)=>res.json())
  .then((resJson)=>{
    //console.log(resJson);
    if(resJson.msg==="success") return DeviceEventEmitter.emit("loginInSuc",resJson);
    return alert(resJson.msg);
  })
  .catch((err)=>{
    console.log(err);
  });
};
export function loginInReply(data){
  DeviceEventEmitter.emit("loginInSuc",data);
};