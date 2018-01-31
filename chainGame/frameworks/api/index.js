"use strict";
import router from "./routers";
function dispatch(type,event,data){
  const action = {
    type:type,
    event:event,
    data:data
  }
  router(action);
}
const Api = {
  dispatch:dispatch,
}
export default Api;