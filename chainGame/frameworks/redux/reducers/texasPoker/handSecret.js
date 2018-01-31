/***
* hand secret
***/
"use strict";
import * as types from './../../constants/texasPoker';

const initialState = {
  type:types.HAND_SECRET_DEFAULT,
  data:{
    hand:{
      handId:"",
      handSecret:"",
      shuffleSeed:"",
    },
  },
};
export default function handSecret(state = initialState,action){
  switch(action.type){
    case types.HAND_SECRET_INIT:
      return {
        ...
        state,
        type:action.type,
        data:action.data
      };
      break;
    case types.HAND_BEGIN222:
      return {
        ...
        state,
        type:action.type,
        data:action.data.handData
      };
      break;
    default:
      return state;
      break;
  }
};