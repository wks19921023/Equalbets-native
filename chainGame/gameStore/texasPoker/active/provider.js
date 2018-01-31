"use strict";
import {DeviceEventEmitter} from "react-native"; 
const type = "texasPoker";
export function message(api,event,data){
  if(!api&&!event) return false;
  api.dispatch(type,event,data);
};
export function listener(event,callback,store){
  if(!event) return false;
  DeviceEventEmitter.addListener(event,function(data){
	 callback(store,data);
  });
};