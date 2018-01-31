/*******
** action function 
*******/
export function actionAdd(store,data){
  let table = store.getState().table.data;
  const seatNo = table.snapshot.seatNo;
  let players = table.snapshot.players;
  let username;
  let pots;
  let isIn = false;
  for(let i = 0;i<players.length;i++){
    if(players[i].seatNo == seatNo){
      players[i].stake -= data.amount;
      players[i].bet += data.amount;
      username = players[i].username;
      return true;
    }
  }
  pots = table.snapshot.hand.pots;
  pots[0].size += data.amount;
  for(let i = 0;i<pots[0].qualifiers.length;i++){
    if(pots[0].qualifiers[i]==username) return isIn=true;
  }
  if(!isIn){
    pots[0].qualifiers.push(username);
  }  
};
export function actionFold(store,data){
  let table = store.getState().table.data;
  const seatNo = table.snap.seatNo;
  let pots = table.snapshot.hand.pots;
  const players = table.snapshot.players;
  let username;
  let userPos = null;
  //get username
  for(let i = 0;i<players.length;i++){
    if(players[i].seatNo==seatNo){
      username = players[i].username;
    }
  }
  for(let i = 0;i<pots[0].qualifiers.length;i++){
    if(pots[0].qualifiers[i]==username) return userPos = i;
  }
  if(userPos){   //remove to pots;
    pots[0].qualifiers.splice(userPos,1);
  }
};
export function actionAllIn(store,data){
  //生成side_pots规则  基于all_in时各玩家的注码，排在all_in玩家之后的注码,截止到最后一位表态(dealer);生成side_pots;
  
};
export function actionShow(store,data){
  //从redux中的handsecRet table取出相应的secret;
  //对tablesnapshot中的公牌和私牌进行解密,调用生成牌型函数。
  //是否是接口返回剩下比牌玩家的私牌，然后在本地调用比牌函数，最后将比牌结果返回游戏链，UI也应做出相应的改变。
  //调用比牌模块; 
};
/*********
***action event
*********/
export function actionEventAdd(store,data){
  const thisPlayerNo = store.getState().table.data.snapshot.seatNo;//当前玩家座位号;
  const playerStatus = getPlayerInfo("status",store);
  if(playerStatus == "active"){ //in hand
    actionAdd(store,data);  //update table;
    const nextPlayer = getNextActivePlayer(store,data);  //下一active玩家的座位号;
    const activePlayerAmount = data.amount;//active玩家下注金额;
    const thisPlayerAmount = "222"; //待定，玩家active正确返回时，redux存储amount
    const thisPlayerStake = getPlayerInfo("stake",store);
    //判断下一位action的玩家是否为当前玩家；
    if(thisPlayerNo==nextPlayer){  
      if(activePlayerAmount>thisPlayerAmount){ //此轮还未结束;
        if(thisPlayerStake<=(activePlayerAmount-thisPlayerAmount)){ //only ALL_IN action;
          //ui给出相应按钮 all_in、fold
        }else{
          //UI给出相应按钮 跟注、加注、弃牌
        }
      }else if(activePlayerAmount==thisPlayerAmount){ //此轮已结束,进入下一圈    ???????怎么通知cardbox发牌;
        
      }else{
        return false;
      }
    }else{
      //下一active不为当前玩家，所以只需更新table，UI、不需提供相应的按钮界面
      return true;
    }
  }else{  //玩家已弃牌或新占座玩家，更新相应的table即可
    actionAdd(store,data);  //update table;
  }
};
/**export function getPlayerStatus(seatNo,store){
  const players = store.getState().table.data.snapshot.players;//桌上玩家数组;
  for(let i = 0;i<players.length;i++){
    //get player status
    if(players[i].seatNo==seatNo)  return players[i].status;
    return false;
  }
};**/
//获取当前玩家的信息；
export function getPlayerInfo(key,store){
  const players = store.getState().table.data.snapshot.players; //桌上玩家数组;
  const seatNo = store.getState().table.data.snapshot.seatNo;
  for(let i = 0;i<players.length;i++){
    //get key
    if(players[i].seatNo == seatNo) return players[i][key];
    return false;
  }
}
export function getNextActivePlayer(store,data){
  const thisSeatNo = data.seatNo;
  const players = store.getState().table.data.snapshot.players;
  const activePlayers = new Array();
  let nextSeatNo;
  for(let i = 0;i<players.length;i++){
    if(players[i].status == "active"){
      activePlayers.push(players.seatNo);
    }
  }
  activePlayers.sort();
  for(let i = 0;i<activePlayers.length;i++){
    if(activePlayers[i]==thisSeatNo){
      if(i<activePlayers.length-1){
        return nextSeatNo = activePlayers[i+1];
      }else{
        return nextSeatNo = activePlayers[0];
      }
    }
  }
  return nextSeatNo;
}



