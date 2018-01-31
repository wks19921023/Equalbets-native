"use strict";
import * as actions from "./action";
export function tableInit(store,data){
	store.dispatch({
		type:"TABLE_INIT",
		data:data,
	});
};
export function newPlayer(store,data){
	//update tablesnapshot add new player
    let storeData = store.getState().table.data;
    let players = store.getState().table.data.snapshot.players;  //players数组
    let playersNum = store.getState().table.data.snapshot.table.players;  //玩家数量
	players.push(data);  //players array add new player
    playersNum = Number(playersNum)+1;
    storeData.snapshot.players = players;
    storeData.snapshot.table.players = playersNum;
    store.dispatch({
		type:"NEW_PLAYER",
		data:storeData
	});
};
export function sit(store,data){
    let storeData = store.getState().table.data;
	const seatNo = data.seatNo;
	const action = data.action;
	let players = storeData.snapshot.players;  //players数组
	for(let i=0;i<players.length;i++){
		if(players[i].seatNo ==seatNo ) return players[i].status=action;
	}
	store.dispatch({  //update
		type:"SIT",
		data:storeData,
	});
};
export function leave(store,data){
	let storeData = store.getState().table.data;
	let players = store.getState().table.data.snapshot.players;  //players数组
	const playersNum = store.getState().table.data.snapshot.table.players;  //玩家数量
	//当前活跃玩家数量
	let activePlayers = store.getState().table.data.snapshot.hand;
	const leavePlayerNo = data.seatNo; 
	//update 
	for(let i=0;i<players.length;i++){
		if(players[i].seatNo == leavePlayerNo){
			if(players.status == "active"){ //if active,must be update activePlayers;
				for(let j=0;j<leavePlayerNo.length;j++){
					if(leavePlayerNo[i].seatNo==leavePlayerNo){
						leavePlayerNo.splice(i,1); //remove 
					}
				}
			}
			players.splice(i,1);			
		}
	}
	store.getState().table.data.snapshot.table.players = Number(playersNum) - 1;
	storeData.snapshot.players = players;
	storeData.snapshot.hand = activePlayers;
	store.dispatch({
		type:"LEAVE",
		data:storeData
	});
};
export function leaveReply(store){
    //init table
	store.dispatch({
		type:"LEAVE_REPLY",
	})
};
export function handPreStart(store,data){
  //save hand secret 
  store.dispatch({
    type:"HAND_SECRET_INIT",
    data:data
  });
};
export function handBegin(store,data){
  //update table
  let tableData = store.getState().table.data;
  let handData = store.getState().handSecret.data;
  let cardData = store.getState().cardBox.data;
  handData.hand.handId = data.hand.handId;
  cardData.cardBox = data.hand.cardBox;
  cardData.deckNo = data.hand.deckNo;
  cardData.deck = data.hand.deck;
  tableData.snapshot.hand.smallBlind = data.hand.smallBlind;
  tableData.snapshot.hand.bigBlinds = data.hand.bigBlind;
  tableData.dealer = data.hand.dealer;
  tableData.snapshot.hand.players = data.hand.handPlayers.length;
  const newData = {
    tableData:tableData,
    handData:handData,
    cardData:cardData
  };
  store.dispatch({
    type:"HAND_BEGIN",
    data:newData,
  });
};
export function activeReply(store,data){
  switch(data.action){  //"bet","call","fold","check","raise","reRaise","allIn","show"
    case "bet":
      actions.actionAdd(store,data);
      return true;
      break;
    case "call":
      actions.actionAdd(store,data);
      return true;
      break;
    case "fold":  //是否需要状态标记，目前能想到的为pots中的owner清除
      actions.actionFold(store,data);
      return true;
      break;
    case "check":
      console.log("check response!");
      return true;
      break;
    case "raise":
      actions.actionAdd(store,data);
      return true;
      break;
    case "reRaise":
      actions.actionAdd(store,data);
      return true;
      break;
    case "allIn":
      actions.actionAllIn(store,data);
      return true;
      break;
    case "show":
      actions.actionShow(store,data);
      return true;
      break;
    default:
      console.log("action default!");
      return false;
      break;
  }
};
export function actionEvent(store,data){
  switch(data.action){   //"bet","call","fold","check","raise","reRaise","allIn","show"
    case "bet":  //此事件是否仅当玩家处于hand中才会被订阅;  T:更新table状态，且获取action进度;F:先判断是否处于hand中；若是，则更新状态，且获取action进度;
      actions.actionEventAdd(store,data);
      return true;
      break;
    case "call":  //
      actions.actionEventAdd(store,data);
      return true;
      break;
    case "fold":
      actions.actionFold(store,data);
      return true;
      break;
    case "check":
      console.log("check response!");
      return true;
      break;
    case "raise":
      actions.actionEventAdd(store,data);
      return true;
      break;
    case "reRaise":
      actions.actionEventAdd(store,data);
      return true;
      break;
    case "allIn":
      actions.actionEventAdd(store,data);
      return true;
      break;
    case "show":
      actions.actionShow(store,data);
      return true;
      break;
    default:
      console.log("action event reply!");
      return false;
      break;
  }
};
export function dealCards(store,data){
  //更新私牌，公牌
  let hand = store.getState().table.data.snapshot.hand;
  if(data.type == "holeCards"){
    hand.holeCards.push(data.card);  //可能存储的为cardNo，或者基于cardNo解析
  }else{
    hand.cards.push(data.card);
  }
  //ui做出相应的改变;
};