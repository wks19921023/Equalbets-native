/****
 ** function of player active
 ****/
"use strict";
import * as Provider from "./provider";
export function getInfo(api){
    Provider.message(api,"GET_INFO");
};
export function sitIn(api,data){
    Provider.message(api,"SIT_IN",data);
};
export function leave(api,data){
    //Provider.message(api,"LEAVE",data)
};
export function sit(api,action,store){
    const sitData = {
        saetNo:store.getState().table.data.snapshot.seatNo,
        action:action,
    };
    Provider.message(api,"SIT",sitData);
};
export function joinHand(api,data){
    Provider.message(api,"JOIN_HAND",data);
};
export function action(api,data){
  Provider.message(api,"ACTION",data);
};