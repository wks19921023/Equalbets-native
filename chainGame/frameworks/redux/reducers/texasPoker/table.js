/**
* test reducer
*/
"use strict";
import * as types from './../../constants/texasPoker';

const initialState = {
	type:"TABLE_INIT",
	data:{
        tableId:"10",
	    address:"44cccs3e3e3e3e",
		dealer:"4e445e53545eee4e14",
	    snapshot:{
		    seatNo:"2",
			table:{
			    status:"idle",
			    id:"8",
			    players:"5",
			    gameInfo:{
								 
				},
			},
		    players:[
			    {
				    seatNo:"1", 
				    portraitAddr:"http://test.com/dddddd/dddd.png",
				    username:"Tom",
				    stake:"201",
				    bet:"41",
					status:"active"
				}
			],
			hand:{
			    players:"4",
				smallBlind:"50",
			    bigBlinds:"100",
				cards:["k-1","q-2"],
			    pots:[
				    {
					    size:"3000",
					    qualifiers:["Tom","Kitty"]
					}
				]
			}
	    },
    },
};
export default function table(state = initialState,action){
	switch(action.type){
		case types.NEW_PLAYER :
			return {
				...
				state,
				type:action.type,
				data:action.data
			}
			break;
		case types.TABLE_INIT:
			return {
				...
				state,
				type:action.type,
				data:action.data,
			}
			break;
		case types.LEAVE:  //player leave status 
		    return {
				...
				state,
				type:action.type,
				data:action.data
			}
			break;
		case types.SIT:
			return {
				...
				state,
				type:action.type,
				data:action.data,
			}
			break;
		case types.LEAVE_REPLY:  //player leave  table init
			return state;
			break;
        case types.HAND_BEGIN22:
            return {
              ...
              state,
              type:action.type,
              data:action.data.tableData
            };
            break;
		default:
		    return state;
            break;			
	}
};