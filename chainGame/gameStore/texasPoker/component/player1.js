import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text,Animated,Easing,TouchableOpacity} from 'react-native'
import Chip from './chip';
import Card from './card';
import WaitIcon from './waitIcon';
class Player1 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      circle:new Animated.Value(0),
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
    }).start();
  }
  componentWillMount(){
    //this.beginIndex()
  }
  render() {
    return (
      <View style={styles.playerWrap}>
        <Image style={styles.playerImage} source={require("./../static/images/player1.png")}/>
        <Chip wrap="big" text="290" align="topRight"/>
        <Card />
        <WaitIcon style={styles.wait} type="self"/>
        <Text style={styles.account}>$9,990</Text>
        <View style={styles.left}>
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
        <View style={styles.right}>
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
            this.beginIndex()
          }}>
          <Text>Reload</Text>
        </TouchableOpacity>
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
  },
  playerImage:{
    width:"100%",
    height:"100%"
  },
  wait:{
    width:32,
    height:32,
    position:"absolute",
    bottom:36,
    left:-16,
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
});