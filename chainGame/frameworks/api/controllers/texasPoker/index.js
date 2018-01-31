"use strict";
import * as getInfo from "./getInfo";
import * as sit from "./sit";
import * as hands from "./hand";
import * as actions from "./action";
const TexasPoker = {
  getInfo:getInfo.getInfo,
  getInfoReply:getInfo.getInfoReply,
  sitIn:sit.sitIn,
  sitInReply:sit.sitInReply,
  newPlayerEvent:sit.newPlayerEvent,
  sitEvent:sit.sitEvent,
  leave:sit.leave,
  leaveReply:sit.leaveReply,
  sit:sit.sit,
  sitReply:sit.sitReply,
  handPreStart:hands.handPreStart,
  joinHand:hands.joinHand,
  handBegin:hands.handBegin,
  dealCards:hands.dealCards,
  action:actions.action,
  actionReply:actions.actionReply,
  actionEvent:actions.actionEvent
};
export default TexasPoker;