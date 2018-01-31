/**
 * The root entry file of the app
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";
import React, { Component, } from 'react'
import {DeviceEventEmitter} from "react-native";
import {StackNavigator} from 'react-navigation';
//redux store
import configureStore from './frameworks/redux/store/ConfigureStore';
//i18n
import I18n from './frameworks/i18n';
//api
import Api from './frameworks/api';
//page 
import Start from './frameworks/views/start';
import LoginIn from './frameworks/views/loginIn';
import GameList from './frameworks/views/gameList';
import TexasPoker from './gameStore/texasPoker';
import GameType from './gameStore/texasPoker/gameType';
//Start.prototype.store=store;
const Router = StackNavigator({
  Main:{screen:Start,initalRouterParams:store},
  LoginIn:{screen:LoginIn},
  GameList:{screen:GameList},
  TexasPoker:{screen:TexasPoker},
  GameType:{screen:GameType}  
},{headerMode:'none',mode:'modal'});
//screenProps obj
const store = configureStore();
const screenProps = {
  store:store,
  eventBus:DeviceEventEmitter,
  I18n:I18n,
  api:Api
};
class App extends Component{
  render(){
    return(
        //the prop must be set in "screenProps"
        <Router screenProps={screenProps}/>          
    );
  }
};
export default App;

