/**
* route for texasPoker;
**/
"use strict";
import * as events from "./../constants";
import Controller from "./../controllers";
export default function texasPoker(action){
  switch(action.event){
    case events.GET_INFO:
      Controller.texasPoker.getInfo(action);
      break;
    case events.GET_INFO_REPLY:
      Controller.texasPoker.getInfoReply(action);
      break;
    case events.SIT_IN:
      Controller.texasPoker.sitIn(action);
      break;
    case events.SIT_IN_REPLY:
      Controller.texasPoker.sitInReply(action);
      break;
    case events.NEW_PLAYER_EVENT:
      Controller.texasPoker.newPlayerEvent(action);
      break;
    case events.SIT:
      Controller.texasPoker.sit(action);
      break;
    case events.SIT_REPLY:
      Controller.texasPoker.sitReply(action);
      break;
    case events.SIT_EVENT:
      Controller.texasPoker.sitEvent(action);
      break;
    case events.LEAVE:
      Controller.texasPoker.leave(action);
      break;
    case events.LEAVE_REPLY:
      Controller.texasPoker.leaveReply(action);
      break;
    case events.HAND_PRE_START:
      Controller.texasPoker.handPreStart(action);
      break;
    case events.JOIN_HAND:
      Controller.texasPoker.joinHand(action);
      break;
    case events.HAND_BEGIN:
      Controller.texasPoker.handBegin(action);
      break;
    case events.ACTION:
      Controller.texasPoker.action(action);
      break;
    case events.ACTION_REPLY:
      Controller.texasPoker.actionReply(action);
      break;
    case events.ACTION_EVENT:
      Controller.texasPoker.actionEvent(action);
      break;
    case events.DEAL_CARDS:
      Controller.texasPoker.dealCards(action);
      break;
    default:
      return false;
      break;
  }
}