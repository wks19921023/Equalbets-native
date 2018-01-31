/*******
* Login event name list
*/
"use strict";
//start interface service
export const START_SERVICE = "START_SERVICE";
export const START_SERVICE_REPLY = "START_SERVICE_REPLY";
//stop interface service
export const STOP_SERVICE = "STOP_SERVICE";
export const STOP_SERVICE_REPLY = "STOP_SERVICE_REPLY";
//select gamge
export const SELECT_GAME = "SELECT_GAME";
export const SELECT_GAME_REPLY = "SELECT_GAME_REPLY";
//login and register 
export const LOGIN_IN = "LOGIN_IN";
export const LOGIN_REPLY = "LOGIN_REPLY";
export const LOGIN_OUT = "LOGIN_OUT";
export const LOGIN_OUT_REPLY = "LGOIN_REPLY";
export const REGISTER = "REGISTER";
export const REGISTER_REPLY = "REGISTER";
//find game
export const FIND_GAME = "FIND_GAME";
export const FIND_GAME_REPLY = "FIND_GAME_REPLY";

//when FIND_GAME_REPLY happened,you should emit newplayer event;
export const NEW_PLAYER_ON_OPEN = "NEW_PLAYER_ON_OPEN";
export const NEW_PLAYER_ON_HAPPEN = "NEW_PLAYER_ON_HAPPEN";

//sit
export const NEW_PLAYER_SIT_REQUEST = "NEW_PLAYER_SIT_REQUEST";
export const NEW_PLAYER_SIT_REPLY = "NEW_PLAYER_SIT_REPLY";
//when a new player listen "NEW_PLAYER_SIT_REPLY",should be emit this event to other players;
export const NEW_PLAYER_SIT_BACK = "NEW_PLAYER_SIT_BACK";

//leave table 
export const LEAVE_TABLE = "LEAVE_TABLE";
export const LEAVE_TABLE_REPLAY = "LEAVE_TABLE_REPLAY";

//will begin game,when sit back,shoud open this event listener(emit);
export const WILL_BEGIN_OPEN = "WILL_BEGIN_OPEN";
export const WILL_BEGIN_HAPPEN = "WILL_BEGIN_HAPPEN";

//join game 
export const JOIN_GAME = "JOIN_GAME";
export const JOIN_GAME_REPLY = "JOIN_GAME_REPLY";

//game action
export const GAME_ACTION = "GAME_ACTION";
export const GAME_ACTION_REPLY = "GAME_ACTION_REPLY";
export const GAME_ACTION_BROADCAST_OPEN = "GAME_ACTION_BROADCAST_OPEN";
export const GAME_ACTION_BROADCAST_REPLY = " GAME_ACTION_BROADCAST_REPLY"; 

//licensing event 
export const LICENSING_ON_OPEN = "LICENSING_ON_OPEN";
export const LICENSING_ON_HAPPEN = "LICENSING_ON_HAPPEN";




