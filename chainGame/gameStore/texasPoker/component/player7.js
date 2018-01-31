import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text,DeviceEventEmitter,Animated,Easing } from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
import Pokers from "./pokers";
class Player7 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      circle:new Animated.Value(0),
      display:"none",
      waitDisplay:"none",
      cardDisplay:"none",
      playerImg:require("./../static/images/playerBg.png"),
      chipDisplay:"none",
      chipValue:"0",
      activeDisplay:"none",
      activeText:"0",
      animatedDisplay:"none",
      stake:"0",
      card1Img:require("./../static/images/poker/pokerBg.png"),
      card2Img:require("./../static/images/poker/pokerBg.png"),
      winnerDisplay:"none",
    }
  }
  resultReply(seatNo){
    const _this = this;
    const {store} = this.props;
    //const pokers = store.getState().table.data.pokers[seatNo];
    DeviceEventEmitter.addListener("RESULT_REPLY",function(data){
      const pokers = store.getState().table.data.pokers[seatNo];
      _this.setState({
        resultCardImg1:Pokers[pokers[0]],
        resultCardImg2:Pokers[pokers[1]],
        cardDisplay:"none",
        resultCard:"flex"
      });
      if(data.owner == seatNo){
        _this.setState({
          winnerDisplay:"flex",
          stake:Number(_this.state.stake)+Number(store.getState().table.data.pot)
        });
        DeviceEventEmitter.emit("END_ALL");
      }
    });
  }
  beginIndex(){
    //reset
    this.setState({
      circle:new Animated.Value(0),
      animatedDisplay:"flex"
    },()=>this.halfIndex);    
    this.halfIndex = Animated.timing(
      this.state.circle,{
        toValue:1,
        duration:30000,
        easing:Easing.quad
    }).start();
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
  componentWillMount(){
    const store = this.props.store;
    const _this = this;
    DeviceEventEmitter.addListener("updateUi",function(){
      const player = store.getState().table.data.player;
      const robotPlayers = store.getState().table.data.robotPlayers;
      for(let i=0;i<robotPlayers.length;i++){
        if(robotPlayers[i].seatNo == Number(player.seatNo)+6||Number(robotPlayers[i].seatNo)+3 == player.seatNo){
          _this.setState({        
            display:"flex",
            stake:robotPlayers[i].stake,
            playerImg:{uri:robotPlayers[i].portraitAddr}
          });
          _this.startGame(robotPlayers[i].seatNo);
          _this.activeReply(robotPlayers[i].seatNo);
          _this.resultReply(robotPlayers[i].seatNo);
        }
      }	  
    });
    this.endRound();
  }
  startGame(seatNo){
    const _this = this;
    DeviceEventEmitter.addListener("START_GAME_REPLY",function(data){
      _this.setState({
        cardDisplay:"flex",
      });
      //if dealer
      if(seatNo == data.dealer){
        _this.setState({
          waitDisplay:"flex",
        });
      }
      //if small blind
      if(data.smallBlindNo == seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.smallBlind,
          stake:(_this.state.stake-data.smallBlind)
        });
      }    
      //if big blind
      if(data.bigBlindNo == seatNo){
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
  }
  endRound(){
    const _this = this;
    DeviceEventEmitter.addListener("END_ROUND",function(data){
      _this.setState({
        chipDisplay:"none",
        chipValue:"0",
      });
    });
  }
  activeReply(seatNo){
    const _this = this;
    let {store} = this.props;
    DeviceEventEmitter.addListener("END_ACTIVE_REPLY",function(data){
      if(data.activeNo == seatNo){
        //随机操作；
        const randomActive = Math.random();
        const beginPlayer = store.getState().table.data.beginPlayer;
        const endPlayer = store.getState().table.data.endPlayer;
        //this.timer = setTimeout(()=>{},5000)
        _this.beginIndex();
        _this.timer = setTimeout(()=>{
          _this.setState({
            circle:new Animated.Value(0),
            animatedDisplay:"none"
          },()=>{
            _this.state.circle.stopAnimation();
          });
          const nextPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);  //6
          const prevPlayer=_this.prevPlayer(seatNo,store.getState().table.data.playersArr);
          if(randomActive>0.95){  //raise
            if(Number(_this.state.stake)<Number(store.getState().table.data.maxBlind)){
              _this.setState({
                activeText:"全下",
                activeDisplay:"flex", 
                chipDisplay:"flex",
                chipValue:Number(_this.state.stake),
                stake:0
              });
              store.getState().table.data.pot += Number(_this.state.stake);
              if(beginPlayer==seatNo){  //first active
                store.getState().table.data.beginPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);
              };
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
                });
              },2000);
              store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1);
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
            }else{
              const raiseValue = Math.ceil((Number(_this.state.stake)-Number(store.getState().table.data.maxBlind))*Math.random())+Number(store.getState().table.data.maxBlind);
              _this.setState({
                activeText:"加注",
                activeDisplay:"flex", 
                chipDisplay:"flex",
                chipValue:raiseValue,
                stake:Number(_this.state.stake)-raiseValue
              });
              store.getState().table.data.endPlayer= prevPlayer;
              store.getState().table.data.maxBlind = raiseValue;
              store.getState().table.data.pot += Number(raiseValue);
              //next player;      
              DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
            }         
          }else if(randomActive>0.05){ //call
            if(Number(_this.state.stake)<Number(store.getState().table.data.maxBlind)){
              const chipValue = _this.state.chipValue;
              const stake = _this.state.stake;
              _this.setState({
                activeText:"全下",
                activeDisplay:"flex", 
                chipDisplay:"flex",
                chipValue:Number(stake)+Number(chipValue),
                stake:0
              });
              store.getState().table.data.pot += Number(_this.state.stake);
              if(beginPlayer==seatNo){  //first active
                store.getState().table.data.beginPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);
              };
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
                });
              },2000);
              store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1);
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
            }else{
              const chipValue = _this.state.chipValue;
              if(chipValue == store.getState().table.data.maxBlind){
                _this.setState({
                activeText:"让牌",
                activeDisplay:"flex",
                chipDisplay:"none",
                chipValue:0
                }); 
              }else{
                _this.setState({
                  activeText:"跟注",
                  activeDisplay:"flex",
                  chipDisplay:"flex",
                  chipValue:store.getState().table.data.maxBlind,
                  stake:Number(_this.state.stake)-Number(store.getState().table.data.maxBlind),
                }); 
                store.getState().table.data.pot += Number(store.getState().table.data.maxBlind);
              }   
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
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
          }else{  //fold
            _this.setState({
              activeText:"弃牌",
              activeDisplay:"flex", 
              chipDisplay:"none",
              waitDisplay:"none",
              cardDisplay:"none",
            });
            if(beginPlayer==seatNo){  //first active
              store.getState().table.data.beginPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);
            };
            setTimeout(()=>{
              _this.setState({
                activeDisplay:"none"
              });
            },2000);
            //update playersArr;
            store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1);
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
            //DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
          }
        },15000)
      }
    });
  }
  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage} source={this.state.playerImg}/>
        <Chip wrap="big" text={this.state.chipValue} align="rightRightCenter" style={{display:this.state.chipDisplay}}/>
        <WaitIcon style={[styles.wait,{display:this.state.waitDisplay}]} type="right"/>
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
        <Text style={[styles.account,{display:this.state.display}]}>${this.state.stake}</Text>
        <Image style={[styles.card,styles.card1,{display:this.state.cardDisplay}]} source={this.state.card1Img}/>
        <Image style={[styles.card,styles.card2,{display:this.state.cardDisplay}]} source={this.state.card2Img}/>
        <Text style={[styles.activeText,{display:this.state.activeDisplay}]}>{this.state.activeText}</Text>
        <Image style={[styles.resultCard1,{display:this.state.resultCard}]} source={this.state.resultCardImg1}/>
        <Image style={[styles.resultCard2,{display:this.state.resultCard}]} source={this.state.resultCardImg2}/>
        <View style={[styles.winnerWrap,{display:this.state.winnerDisplay}]}>
          <View style={styles.winnerLayout}></View>
          <Text style={styles.winnerTip}>WIN</Text>
        </View>
      </View>
    )
  }
}

export default Player7;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    right:14,
    top:0,
    // borderRadius:70,
  },
  playerImage:{
    width:"100%",
    height:"100%",
  },
  account:{
    backgroundColor:"rgba(0,0,0,0)",
    textAlign:"center",
    color:"#fff",
    marginTop:2
  },
  wait:{
    width:16,
    height:16,
    position:"absolute",
    bottom:41,
    left:-17,
  },
  card:{
    width:18,
    height:25,
    position:"absolute",
    top:38,
    left:-24,
  },
  card1:{
    transform:[{rotateZ:"70deg"}],
  },
  card2:{
    transform:[{rotateZ:"90deg"}],
  },
  activeText:{
    backgroundColor:"rgba(0,0,0,0)",
    position:"absolute",
    left:-30,
    top:0,
    color:"white"
  },
  left:{
    width:40,
    height:80,
    position:"absolute",
    right:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden", 
  },
  leftCircleWrap:{
    width:80,
    height:80,
    position:"absolute",
    right:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:60,
  },
  leftCircle:{
    width:40,
    height:80,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,
    left:0,
    top:0,
  },
  right:{
    width:40,
    height:80,
    position:"absolute",
    left:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden",
  },
  rightCircleWrap:{
    width:80,
    height:80,
    position:"absolute",
    left:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:40,
  },
  rightCircle:{
    width:40,
    height:80,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopRightRadius:40,
    borderBottomRightRadius:40,
    right:0,
    top:0,
  },
  resultCard1:{
    width:49,
    height:67,
    position:"absolute",
    right:-15,
    top:2
  },
  resultCard2:{
    width:49,
    height:67,
    position:"absolute",
    left:-15,
    top:2
  },
  winnerWrap:{
    position:"absolute",
    width:"100%",   
    left:0,
    bottom:0,
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