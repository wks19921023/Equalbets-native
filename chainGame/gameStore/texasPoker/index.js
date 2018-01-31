import React, { Component, } from 'react';
import { View, Text,StyleSheet,ImageBackground,TouchableOpacity,Image} from 'react-native';
import Player from "./component/player";
import LoadingBar from "./component/loadingBar";
import * as Status from "./status";
import * as Provider from "./active/provider";
import * as Active from "./active";
import Table from "./component/table";
import Fold from './component/fold';
import Call from './component/call';
import Raise from './component/raise';
import Sure from './component/sure';
import ProgressBar from './component/progressBar';
class TexasPoker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      display:"flex",
    }
  }
  componentWillMount(){
    const {store} = this.props.screenProps;
    Provider.listener("GET_INFO_REPLY",this.getInfoReply,store);
    Provider.listener("SIT_IN_REPLY",Status.tableInit,store);
    Provider.listener("NEW_PLAYER_EVENT",Status.newPlayer,store);
    Provider.listener("SIT_REPLY",Status.sit,store);
    Provider.listener("SIT_EVENT",Status.sit,store);
    Provider.listener("LEAVE_REPLY",Status.leaveReply,store);
    Provider.listener("HAND_PRE_START",Status.handPreStart,store);
    Provider.listener("HAND_BEGIN",Status.handBegin,store);
    Provider.listener("ACTIVE_REPLY",Status.activeReply,store);
    Provider.listener("ACTION_EVENT",Status.actionEvent,store);
    Provider.listener("DEAL_CARDS",Status.dealCards,store);
  }
  componentDidMount(){
    const {api} = this.props.screenProps;
    const {store} = this.props.screenProps;
    Active.getInfo(api);
    Active.sitIn(api,{
        gameType:"noLimit",
        blinds:{
            bigBlind:"200",
            smallBlind:"100",
        },
        buyIn:"2000",
    });
    Active.leave(api,{
        account:"33389999",
        seatNo:"7",
    });
    Active.sit(api,"out",store) //this.sit(api,"out");
    //join hand after handPreStart event happened;
    Active.joinHand(api,{
      account:"testwww",
      seatNo:store.getState().table.data.snapshot.seatNo,
      tableNo:store.getState().table.data.tableId,
      handSecret:store.getState().handSecret.data.hand.handSecret,
      shuffleseed:store.getState().handSecret.data.hand.shuffleseed,
    });
    const methodArr = ["bet","call","fold","check","raise","reRaise","allIn","show"]; //押注、跟注、弃牌、让牌、加注、再加注、全押、看牌
    Active.action(api,{
      account:"3333333",
      seatNo:store.getState().table.data.snapshot.seatNo,
      tableNo:store.getState().table.data.tableId,
      action:methodArr[0],  //UI输入;
      amount:"10",   //获取UI输入;
      holeCards:["1-2","10-2"],  //手牌;
    });
  }
  getInfoReply(store,data){   //GET_INFO_REPLY event callback
    
  }
  //change state
  changeState(key,value){
    this._this.setState({
      [key]:value
    });
  }
  render(){
    const {I18n} = this.props.screenProps;
    return (
      <View style={styles.wrap}>
        <ImageBackground source={require("./static/images/gameBg.png")} style={styles.tableBg}>
          <TouchableOpacity style={styles.backBtnWrap}>
            <Image style={styles.backBtn} source={require("./../../frameworks/static/images/back.png")}/>       
          </TouchableOpacity>  
          <Table />
          <Fold I18n = {I18n}/>
          <Call I18n = {I18n}/>
          <Raise I18n = {I18n} _this={this} callback={this.changeState} display={this.state.display}/>
          <Sure I18n = {I18n} _this={this} callback={this.changeState} display={this.state.display}/>
          <ProgressBar _this={this} callback={this.changeState} display={this.state.display}/>
          {/**<Player name="player1" src={require("./static/images/defaultPlayer.png")} balance="2234" playerStyle={styles.player1} type="left"/>
          <Player name="player2" src={require("./static/images/dealer.png")} balance="1000" playerStyle={styles.player2} type="left"/>
          <Player name="player3" src={require("./static/images/defaultPlayer.png")} balance="234" playerStyle={styles.player3} type="left"/>
          <Player name="player4" src={require("./static/images/defaultPlayer.png")} balance="34" playerStyle={styles.player4} type="left"/>
          <Player name="player5" src={require("./static/images/defaultPlayer.png")} balance="1234" playerStyle={styles.player5} type="left"/>
          <Player name="player6" src={require("./static/images/defaultPlayer.png")} balance="134" playerStyle={styles.player6} type="right"/>
          <Player name="player7" src={require("./static/images/defaultPlayer.png")} balance="8000" playerStyle={styles.player7} type="right"/>
          <Player name="player8" src={require("./static/images/defaultPlayer.png")} balance="10000" playerStyle={styles.player8} type="right"/>
          <Player name="player9" src={require("./static/images/defaultPlayer.png")} balance="4004" playerStyle={styles.player9} type="right"/>**/}  
          <Image style={styles.chipsBg} source={require("./static/images/chips.png")}/>
          <LoadingBar I18n = {I18n}/>
        </ImageBackground>
      </View>
    )
  }
}

export default TexasPoker;
const styles = StyleSheet.create({
  wrap:{
    flex:1,
  },
  tableBg:{
    width:"100%",
    height:"100%",
    position:"absolute"
  },
  backBtnWrap:{
    position:"absolute",
    top:10,
    left:20,
  },
  backBtn:{
    width:33,
    height:32,
  },
  chipsBg:{
    width:40,
    height:32,
    position:"absolute",
    bottom:14,
    left:20,
  },
});