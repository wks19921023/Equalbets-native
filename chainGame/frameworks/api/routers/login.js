"use strict";
/**
* route for login
**/
import * as events from "./../constants";
import Controller from "./../controllers";
export default function login(action){
  switch(action.event){
    case events.LOGIN_IN:
      Controller.login.loginIn(action.data);
      break;
    case events.LOGIN_IN_REPLY:
      Controller.login.loginInReply(action.data);
      break;
    default:
      return false;
      break;
  }
};