import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text,DeviceEventEmitter} from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
class Player2 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      display:"none",
      waitDisplay:"none",
      cardDisplay:"none",
      playerImg:require("./../static/images/playerBg.png"),
      chipDisplay:"none",
      chipValue:"0"
    }
  }
  componentWillMount(){
    const store = this.props.store;
    const _this = this;
    DeviceEventEmitter.addListener("updateUi",function(){
      const player = store.getState().table.data.player;
      const robotPlayers = store.getState().table.data.robotPlayers;
      for(let i=0;i<robotPlayers.length;i++){
        if(robotPlayers[i].seatNo == Number(player.seatNo)+1||Number(robotPlayers[i].seatNo)+8 == player.seatNo){
          _this.setState({        
            display:"flex",
            stake:robotPlayers[i].stake,
            playerImg:{uri:robotPlayers[i].portraitAddr}
          });
          _this.startGame(robotPlayers[i].seatNo);
        }
      }	  
    });
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
          console.log("big_blind_broast333333");
        })
      } 
    });
  }
  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage} source={this.state.playerImg}/>
        <Chip wrap="small" text={this.state.chipValue} align="rightLeft" style={{display:this.state.chipDisplay}}/>
        <WaitIcon style={[styles.wait,{display:this.state.waitDisplay}]} type="left"/>
        <Text style={[styles.account,{display:this.state.display}]}>${this.state.stake}</Text>
        <Image style={[styles.card,styles.card1,{display:this.state.cardDisplay}]} source={require("./../static/images/poker/pokerBg.png")}/>
        <Image style={[styles.card,styles.card2,{display:this.state.cardDisplay}]} source={require("./../static/images/poker/pokerBg.png")}/>
      </View>
    )
  }
}

export default Player2;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    left:94,
    bottom:-12,
    // borderRadius:70,
  },
  playerImage:{
    width:"100%",
    height:"100%"
  },
  account:{
    backgroundColor:"rgba(0,0,0,0)",
    textAlign:"center",
    color:"#fff",
    marginTop:0
  },
  wait:{
    width:16,
    height:16,
    position:"absolute",
    bottom:70,
    right:29,
  },
  card:{
    width:18,
    height:25,
    position:"absolute",
    top:-25,
    left:44,
  },
  card1:{
    transform:[{rotateZ:"12deg"}],
  }
});