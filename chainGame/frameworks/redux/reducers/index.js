/***
* root reducer
*/

"use strict";
import {combineReducers} from 'redux';
import Login from './login';
import table from './texasPoker/table';
import handSecret from "./texasPoker/handSecret";
import cardBox from "./texasPoker/cardBox";
//将redux消息处理进行包装；
const rootReducers = combineReducers({
  Login:Login,
  table:table,
  handSecret:handSecret,
  cardBox:cardBox,
});
export default rootReducers;  //导出