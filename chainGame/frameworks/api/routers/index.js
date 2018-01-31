"use strict";
/**
* event router 
**/
import * as types from "./../constants/type";
import ws from "./../ws";
import login from "./login.js";
import texasPoker from "./texasPoker";

ws.onerror=function(e){
  console.log("ws error msg:"+e);
};
ws.onclosed=function(e){
  console.log("ws colosed!");
};
ws.onopen=function(e){
  console.log("ws is connected!");
};
ws.onmessage=function(e){
  const replyData = JSON.parse(e.data);
  const action = {
    type:replyData.action.type,
    data:replyData.data,
    event:replyData.action.event,
    result:replyData.result
  };
  router(action);
}

function router(action){
  switch(action.type){
    case types.LOGIN:
      login(action); 
      break;
    case types.TEXAS_POKER:
      texasPoker(action);
      break;
    default:
      return false;
      break;
  }
};
export default router;