import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text,Animated,Easing,TouchableOpacity,DeviceEventEmitter,Dimensions,Platform} from 'react-native'
import Chip from './chip';
import Card from './card';
import WaitIcon from './waitIcon';
import Fold from './fold';
import Call from './call';
import Raise from './raise';
import Sure from './sure';
import Check from './check';
import ProgressBar from './progressBar';
import getWinner from './getWinner';
import cardType from './cardType';

class Player1 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      circle:new Animated.Value(0),
      display:"none",
      stake:"0",
      waitDisplay:"none",
      startBtnDisplay:"flex",
      chipDisplay:"none",
      chipValue:"0",
      activeDisplay:"flex",
      activeText:"",
      activeBtnDisplay:"none",
      activeCheckBtnDisplay:"none",
      activeCallBtnDisplay:"none",
      raiseDisplay:"flex",
      sureDisplay:"none",
      cardDisplay:"none",
      animatedDisplay:"none",
      callBlind:0,
      isTimeOut:true,
      activeBtnWrapRight:-264,
      raiseValue:0,
      winnerDisplay:"none",
    }
  }
  beginIndex(){
    //reset
    this.setState({
      circle:new Animated.Value(0),
    });
    Animated.timing(
      this.state.circle,{
        toValue:0.5,
        duration:15000,
        easing:Easing.quad
    }).start(()=>{
      this.halfIndex();
    });
  }
  halfIndex(){
    Animated.timing(
      this.state.circle,{
        toValue:1,
        duration:15000,
        easing:Easing.quad
    }).start(()=>{
      this.timeOut();
    });
  }
  gameStart(){
    DeviceEventEmitter.emit("GAME_START");
  }
  //change state
  changeState(key,value){
    if((key == "raise"&& value == "none")||(key == "sure"&& value == "flex")){
      this._this.setState({
        raiseDisplay:"none",
        sureDisplay:"flex"
      });
    }else{
      this._this.setState({
        raiseDisplay:"flex",
        sureDisplay:"none"
      });
    }  
  }
  componentWillMount(){
    //this.beginIndex()
    const store = this.props.store;
    const _this = this;
    
    this.activeReply();
    this.result();
    DeviceEventEmitter.addListener("updateUi",function(){
	  _this.setState({
        display:"flex",
        stake:store.getState().table.data.player.stake,
      })
    });
    DeviceEventEmitter.addListener("BIG_BLIND_END_REPLY",function(data){
	  store.getState().table.data.round = 1;   
      store.getState().table.data.riverCards = data.riverCards;
    });
    DeviceEventEmitter.addListener("START_GAME_REPLY",function(data){
      _this.setState({
        startBtnDisplay:"none",
        cardDisplay:"flex",
      });
      store.getState().table.data.maxBlind = data.bigBlind; 
      store.getState().table.data.beginPlayer = data.smallBlindNo;  //first active 
      store.getState().table.data.endPlayer = data.bigBlindNo;  //end active
      //console.log(data);
      //if dealer
      if(store.getState().table.data.player.seatNo == data.dealer){
        _this.setState({
          waitDisplay:"flex",
        });
      }
      //if small blind
      if(data.smallBlindNo == store.getState().table.data.player.seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.smallBlind,
          stake:(_this.state.stake-data.smallBlind)
        });
        store.getState().table.data.pot += Number(data.smallBlind);
      }    
      //if big blind
      if(data.bigBlindNo == store.getState().table.data.player.seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.bigBlind,
          stake:(_this.state.stake-data.bigBlind)
        });
        DeviceEventEmitter.emit("BIG_BLIND_END")
      }else{
        DeviceEventEmitter.addListener("BIG_BLIND_END",function(){
          console.log("big_blind_broast");
        })
      } 
    });
    /***DeviceEventEmitter.addListener("BIG_BLIND_END_REPLY",function(data){
      //console.log(data);
      const _this = this;
      if(store.getState().table.data.player.seatNo == data.activeNo){
        
      }
    });**/
    if(Platform.OS==='android'){ 
      const screenWidth = Dimensions.get('window').width/2
      this.setState({
        activeBtnWrapRight:65-screenWidth
      })
    }
  }  
  activeReply(){
    const _this = this;
    let {store} = this.props;
    //let seatNo = store.getState().table.data.player.seatNo;
    DeviceEventEmitter.addListener("END_ACTIVE_REPLY",function(data){
      let seatNo = store.getState().table.data.player.seatNo;
      _this.resultReply(seatNo);
      //update store round
      if(data.round){
        store.getState().table.data.round = data.round;        
      }
      if(seatNo == data.activeNo){  //action
        if(data.round){
          store.getState().table.data.maxBlind = 0;
          _this.setState({
            activeCheckBtnDisplay:"flex",
            activeCallBtnDisplay:"none",
            chipValue:0,
            chipDisplay:"none"
          });
        }else{
          if(store.getState().table.data.maxBlind == _this.state.chipValue){
            _this.setState({
              activeCheckBtnDisplay:"flex",
              activeCallBtnDisplay:"none"
            });
          }else{
            _this.setState({
              activeCheckBtnDisplay:"none",
              activeCallBtnDisplay:"flex"
            });
          }
        }
        /**if(store.getState().table.data.maxBlind == _this.state.chipValue){
          _this.setState({
            activeCheckBtnDisplay:"flex",
            activeCallBtnDisplay:"none"
          });
        }else{
          _this.setState({
            activeCheckBtnDisplay:"none",
            activeCallBtnDisplay:"flex"
          });
        }**/
        const chipValue = Number(_this.state.chipValue);
        _this.setState({
          activeBtnDisplay:"flex",
          animatedDisplay:"flex",
          callBlind:Number(store.getState().table.data.maxBlind)-chipValue,
          isTimeOut:true,
        },()=>{
          _this.beginIndex();
        });        
      }
    });
  }
  nextPlayer(player,playerArr){
    const indexOf = playerArr.indexOf(player);
    if(indexOf==playerArr.length-1){
      return playerArr[0];
    }else{
      return playerArr[indexOf+1];
    }
  }
  prevPlayer(player,playerArr){
    const indexOf = playerArr.indexOf(player);
    if(indexOf==0){
      return playerArr[playerArr.length-1];
    }else{
      return playerArr[indexOf-1];
    }
  }
  timeOut(){
    if(this.state.isTimeOut == true){
      this.fold()
    }else{
      return false;
    }
  }
  fold(){
    let {store} = this.props;
    let seatNo = store.getState().table.data.player.seatNo;
    const nextPlayer = this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    const beginPlayer = store.getState().table.data.beginPlayer;
    const endPlayer = store.getState().table.data.endPlayer;
    const prevPlayer=this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    this.setState({
      activeText:"弃牌",
      activeDisplay:"flex", 
      chipDisplay:"none",
      waitDisplay:"none",
      cardDisplay:"none",
      circle:new Animated.Value(0),
      animatedDisplay:"none",
      activeBtnWrap:"none",
      activeBtnDisplay:"none",
      isTimeOut:"false",
      activeCheckBtnDisplay:"none",
      activeCallBtnDisplay:"none",
    },()=>{
      this.state.circle.stopAnimation();
    });
    if(beginPlayer==seatNo){  //first active
      store.getState().table.data.beginPlayer=this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    }
    setTimeout(()=>{
      this.setState({
        activeDisplay:"none"
      });
    },2000);  
    if(endPlayer==seatNo){
      DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:beginPlayer});
    }
    DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
    //DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:prevPlayer});
    //update playerArr
    console.log("end")
    store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1); 
    //console.log(store.getState().table.data);
  }
  raise(){
    //console.log(value);
    const _this = this;
    let {store} = this.props;
    let seatNo = store.getState().table.data.player.seatNo;
    const nextPlayer = this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    const beginPlayer = store.getState().table.data.beginPlayer;
    const endPlayer = store.getState().table.data.endPlayer;
    const prevPlayer=this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    const chipValue = this.state.chipValue;
    _this.setState({
      activeText:"加注",
      activeDisplay:"flex",
      chipDisplay:"flex",
      chipValue:Number(chipValue)+Number(this.state.raiseValue),
      stake:Number(_this.state.stake)-Number(this.state.raiseValue),
      animatedDisplay:"none",
      activeBtnDisplay:"none",
      isTimeOut:false,
      activeCheckBtnDisplay:"none",
      activeCallBtnDisplay:"none",
    });
    store.getState().table.data.pot += Number(this.state.raiseValue);
    store.getState().table.data.endPlayer= prevPlayer;
    store.getState().table.data.maxBlind = Number(chipValue)+Number(this.state.raiseValue);
    setTimeout(()=>{
      _this.setState({
        activeDisplay:"none",
      });
    },2000);
    //next player;      
    DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
  }
  check(){
    const _this = this;
    const {store} = this.props;
    const chipValue = _this.state.chipValue;
    let beginPlayer = store.getState().table.data.beginPlayer; 
    let endPlayer = store.getState().table.data.endPlayer;
    let nextPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);  //6
    let prevPlayer=_this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    let seatNo = store.getState().table.data.player.seatNo;
    _this.setState({
      activeText:"让牌",
      activeDisplay:"flex",
      chipDisplay:"none",
      chipValue:0,
      animatedDisplay:"none",
      activeBtnDisplay:"none",
      isTimeOut:false,
      activeCheckBtnDisplay:"none"
    });
    setTimeout(()=>{
      _this.setState({
        activeDisplay:"none",        
      });
    },2000);
    if(endPlayer==seatNo){
      if(store.getState().table.data.round==4){
        DeviceEventEmitter.emit("END_GAME");
        console.log("game over!");
      }else{
        DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:store.getState().table.data.beginPlayer});  
        DeviceEventEmitter.emit("END_ROUND");
      }
    }else{
      DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
    }
  }
  call(){
    const _this = this;
    let {store} = this.props;
    let seatNo = store.getState().table.data.player.seatNo;
    const nextPlayer = this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    const beginPlayer = store.getState().table.data.beginPlayer;
    const endPlayer = store.getState().table.data.endPlayer;
    const prevPlayer=this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    const chipValue = this.state.chipValue;
    _this.setState({
      activeText:"跟注",
      activeDisplay:"flex",
      chipDisplay:"flex",
      chipValue:store.getState().table.data.maxBlind,
      stake:Number(_this.state.stake)-Number(store.getState().table.data.maxBlind)+Number(chipValue),
      animatedDisplay:"none",
      activeBtnDisplay:"none",
      isTimeOut:false,
      activeCallBtnDisplay:"none",
    });
    const potAdd = Number(store.getState().table.data.maxBlind)-Number(chipValue);
    store.getState().table.data.pot += Number(potAdd);
    setTimeout(()=>{
      _this.setState({
        activeDisplay:"none",
        activeCallBtnDisplay:"none"
      });
    },2000);
    if(endPlayer==seatNo){
      if(store.getState().table.data.round==4){
        DeviceEventEmitter.emit("END_GAME");
        console.log("game over!");
      }else{
        DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:store.getState().table.data.beginPlayer});  
        DeviceEventEmitter.emit("END_ROUND");
      }
    }else{
      DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
    }
  }
  changeRaiseValue(value){
    //console.log(value);
    const _this = this._this;
    _this.setState({
      raiseValue:Number(value),
    });
  }
  resultReply(seatNo){
    const _this = this;
    const {store} = this.props;
    //const seatNo = store.getState().table.data.player.seatNo;
    //const pokers = store.getState().table.data.pokers[seatNo];
    //console.log(store.getState().table.data.pokers);
    DeviceEventEmitter.addListener("RESULT_REPLY",function(data){
      if(data.owner == seatNo){
        _this.setState({
          winnerDisplay:"flex",
          stake:Number(_this.state.stake)+Number(store.getState().table.data.pot),
          chipDisplay:"none",
        });
        DeviceEventEmitter.emit("END_ALL");
      }
    });
  }
  result(){
    const _this = this;
    const {store} = this.props;
    let resultArr = new Array();
    DeviceEventEmitter.addListener("END_GAME",function(){
      const playersArr = store.getState().table.data.playersArr;
      const riverCards = store.getState().table.data.riverCards;
      for(let i = 0;i<playersArr.length;i++){
        let pokers,owner,cardTypeArr;
        pokers=new Array(0);
        owner = playersArr[i];
        for(let j=0;j<riverCards.length;j++){
          pokers.push(Number(riverCards[j]));       
        }
        for(let k=0;k<store.getState().table.data.pokers[playersArr[i]].length;k++){
          pokers.push(Number(store.getState().table.data.pokers[playersArr[i]][k]));
        }
        cardTypeArr = {
          pokers:pokers,
          owner:owner
        };
        resultArr.push(cardType(cardTypeArr));
      };
      console.log(resultArr);
      const winner = getWinner(resultArr);
      console.log(winner);
      DeviceEventEmitter.emit("RESULT_REPLY",winner);
    });
  }
  render(){
    const  {I18n} = this.props;
    const {store} = this.props;
    return (
      <View style={[styles.playerWrap,{display:this.state.display}]} >
        <Image style={styles.playerImage} source={require("./../static/images/player1.png")}/>
        <Chip wrap="big" text={this.state.chipValue} style={{display:this.state.chipDisplay}} align="topRight"/>
        <Card store={store} display={this.state.cardDisplay}/>
        <WaitIcon style={[styles.wait,{display:this.state.waitDisplay}]} type="self"/>
        <Text style={styles.account}>${this.state.stake}</Text>
        <View style={[styles.left,{display:this.state.animatedDisplay}]}>
          <Animated.View style={[styles.leftCircleWrap,{
          transform:[{
            rotate:this.state.circle.interpolate({
              inputRange:[0,0.5,0.5,1],
              outputRange:["0deg","180deg","180deg","180deg"]
            })
          }]}]}>
            <View style={styles.leftCircle}></View>
          </Animated.View>
        </View>
        <View style={[styles.right,{display:this.state.animatedDisplay}]}>
          <Animated.View style={[styles.rightCircleWrap,{
          transform:[{
            rotate:this.state.circle.interpolate({
              inputRange:[0,0.5,0.5,1],
              outputRange:["0deg","0deg","0deg","180deg"]
            })
          }]}]}>
            <View style={styles.rightCircle}></View>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={()=>{
            this.gameStart()
          }} style={[styles.gameStartBox,{display:this.state.startBtnDisplay}]}>
          <Text style={styles.gameStartBtn}>Start</Text>
        </TouchableOpacity>
        <Text style={[styles.activeText,{display:this.state.activeDisplay}]}>{this.state.activeText}</Text>
        <View style={[styles.activeBtnWrap,{right:this.state.activeBtnWrapRight}]}>
          <Fold I18n = {I18n} click={this.fold.bind(this)} display={this.state.activeBtnDisplay} />
          <Check I18n = {I18n} click={this.check.bind(this)} display={this.state.activeCheckBtnDisplay} />
          <Call I18n = {I18n} click={this.call.bind(this)} text={this.state.callBlind} display={this.state.activeCallBtnDisplay}/> 
          <View style={[styles.raiseWrap,{display:this.state.activeBtnDisplay}]}>
            <Raise I18n = {I18n} _this={this} callback={this.changeState} display={this.state.raiseDisplay}/>
            <Sure I18n = {I18n} _this={this} click={this.raise.bind(this)} callback={this.changeState} display={this.state.sureDisplay}/>
            <ProgressBar _this={this} callback={this.changeRaiseValue} max={this.state.stake} display={this.state.sureDisplay}/> 
          </View>
        </View>   
        <View style={[styles.winnerWrap,{display:this.state.winnerDisplay}]}>
          <View style={styles.winnerLayout}></View>
          <Text style={styles.winnerTip}>WIN</Text>
        </View>
      </View>
    )
  }
}

export default Player1;
const styles = StyleSheet.create({
  playerWrap:{
    position:"absolute",
    width:110,
    height:110,
    left:"50%",
    marginLeft:-55,
    bottom:-34,
    //borderRadius:110,
    // zIndex:1000
  },
  playerImage:{
    width:"100%",
    height:"100%"
  },
  wait:{
    width:16,
    height:16,
    position:"absolute",
    bottom:110,
    right:8,
  },
  account:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#fff",
    textAlign:"center",
    marginTop:16
  },
  left:{
    width:60,
    height:120,
    position:"absolute",
    right:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden",
  },
  leftCircleWrap:{
    width:120,
    height:120,
    position:"absolute",
    right:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:60,
  },
  leftCircle:{
    width:60,
    height:120,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopLeftRadius:60,
    borderBottomLeftRadius:60,
    left:0,
    top:0,
  },
  right:{
    width:60,
    height:120,
    position:"absolute",
    left:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden",
  },
  rightCircleWrap:{
    width:120,
    height:120,
    position:"absolute",
    left:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:60,
  },
  rightCircle:{
    width:60,
    height:120,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopRightRadius:60,
    borderBottomRightRadius:60,
    right:0,
    top:0,
  },
  gameStartBox:{
    width:50,
    height:20,
    position:"absolute",
    bottom:-18,
    left:-20,
  },
  gameStartBtn:{
    backgroundColor:"#0f6e2d",
    color:"#90b097",
    width:50,
    height:20,
    fontSize:12,
    textAlign:"center",
  },
  startBtn:{
    backgroundColor:"#0f6e2d",
    color:"#90b097",
    position:"absolute",
    bottom:-18,
    left:-20,
    width:50,
    height:20,
    textAlign:"center",
  },
  activeText:{
    backgroundColor:"rgba(0,0,0,0)",
    position:"absolute",
    right:-20,
    top:0,
    color:"white"
  },
  activeBtnWrap:{
    position:"absolute",
    // right:-264,
    bottom:-56,
  },
  winnerWrap:{
    position:"absolute",
    width:"100%",   
    left:0,
    bottom:-10,
  },
  winnerLayout:{
    position:"absolute",
    width:"100%",
    height:"100%",
    top:0,
    left:0,
    backgroundColor:"black",
    opacity:0.4,
  },
  winnerTip:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#23ac49",
    fontSize:14,
    textAlign:"center"
  },
});