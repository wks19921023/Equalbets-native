"use strict";
import * as types from "./../../constants/texasPoker";
let initialState = {
  type:types.CARD_BOX_DEFAULT,
  data:{
    cardBox:null,
    deckNo:null,
    deck:null,
    handId:null,
  }
};
export default function cardBox(state=initialState,action){
  switch(action.type){
    case types.HAND_BEGIN111:
      return {
        ...
        state,
        type:action.type,
        data:action.data.cardBox
      };
      break;
    default:
      return state;
      break;
  }
};