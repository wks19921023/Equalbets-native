/**
*  configure the init store
**/
"use strict";
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './../reducers/';
//import 
const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState){
  const store = createStoreWithMiddleWare(rootReducer,initialState);
  return store;
}