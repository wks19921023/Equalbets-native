"use strict";
import * as types from "./../../constants/login";
import {DeviceEventEmitter} from "react-native";
//import Controller from "./../../../controllers/";
const initialState = {
};
export default function loginIn(state=initialState,action){
   switch(action.type){
     case types.LOGIN_IN:
       Controller.login.loginIn(action);
       return {}
       break;
     default:
       return {
         
       };
       break;
   }
}
