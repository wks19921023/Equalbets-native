import React, { Component, } from 'react'
import { View,StyleSheet,Image,Animated,Easing,DeviceEventEmitter} from 'react-native'
import Pokers from "./pokers";
class RiverBox extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      round1Ani:new Animated.Value(0),
      round2Ani:new Animated.Value(0),
      round3Ani:new Animated.Value(0),
      round1Display:"none",
      round2Display:"none",
      round3Display:"none",
      poker1:require("./../static/images/poker/1.png"),
      poker2:require("./../static/images/poker/2.png"),
      poker3:require("./../static/images/poker/3.png"),
      poker4:require("./../static/images/poker/4.png"),
      poker5:require("./../static/images/poker/5.png"),
    };
  }
  componentDidMount(){
    //listen start game reply;
    this.riverBox();
  }
  prevPlayer(player,playerArr){
    const indexOf = playerArr.indexOf(player);
    if(indexOf==0){
      return playerArr[playerArr.length-1];
    }else{
      return playerArr[indexOf-1];
    }
  }
  riverBox(){
    const _this = this;
    const {store} = this.props;
    DeviceEventEmitter.addListener("END_ACTIVE_REPLY",function(data){
      if(data.round){  
        let riverCards = store.getState().table.data.riverCards;
        riverCards.push(data.poker);
        store.getState().table.data.round = data.round;
        store.getState().table.data.endPlayer = _this.prevPlayer(data.activeNo,store.getState().table.data.playersArr);
        //maxBlind clear;
        store.getState().table.data.maxBlind = 0;
        if(data.round==2){  //flop
          _this.setState({
            round1Display:"flex",
            poker1:Pokers[riverCards[0]],
            poker2:Pokers[riverCards[1]],
            poker3:Pokers[riverCards[2]],
          });
          _this.beginAnimated(_this.state.round1Ani);
        }else if(data.round==3){ //turn
          _this.setState({
            round2Display:"flex",
            poker4:Pokers[riverCards[3]],
          });
          _this.beginAnimated(_this.state.round2Ani);
        }else if(data.round==4){  //river
          _this.setState({
            round3Display:"flex",
            poker5:Pokers[riverCards[4]],
          });
          _this.beginAnimated(_this.state.round3Ani);
        }       
      }
    });
  }
  beginAnimated(animate){
    Animated.timing(
      animate,{
        toValue:0.5,
        duration:500,
        easing:Easing.quad
    }).start(()=>{
      this.secondAnimated(animate);
    });
  }
  secondAnimated(animate){
    Animated.timing(
      animate,{
        toValue:1,
        duration:500,
        easing:Easing.quad
    }).start();
  }
  render() {
    return (
      <View style={styles.wrap}>
        <View style={[styles.card,{display:this.state.round1Display}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.poker1}>
          </Animated.Image>
        </View>
        <View style={[styles.card,{display:this.state.round1Display}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.poker2}>
          </Animated.Image>
        </View>
        <View style={[styles.card,{display:this.state.round1Display}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round1Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.poker3}>
          </Animated.Image>
        </View>
        <View style={[styles.card,{display:this.state.round2Display}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round2Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round2Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round2Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round2Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.poker4}>
          </Animated.Image>
        </View>
        <View style={[styles.card,{display:this.state.round3Display}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round3Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round3Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round3Ani.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round3Ani.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.poker5}>
          </Animated.Image>
        </View>
      </View>
    )
  }
}

export default RiverBox;
const styles = StyleSheet.create({
  wrap:{
    width:270,
    height:67,
    position:"absolute",
    //top:"50%",
    left:"50%",
    marginLeft:-135,
    //marginTop:-38,
    bottom:100,
    flexDirection:"row"
  },
  card:{
    height:"100%",
    width:49,
    marginLeft:5,
  },
  cardShow:{
    height:"100%",
    width:"100%",
    position:"absolute",
    top:0,
    left:0,
  },
  cardBg:{
    height:"100%",
    width:"100%",
  }
});