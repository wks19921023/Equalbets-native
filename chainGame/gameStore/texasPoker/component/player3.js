import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text} from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
class Player3 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage}  source={require("./../static/images/player3.png")}/>
        <Chip wrap="big" text="2900" align="rightLeftBottom"/>
        <WaitIcon style={styles.wait} type="left"/>
        <Text style={styles.account}>$7,231</Text>
        <Image style={[styles.card,styles.card1]} source={require("./../static/images/poker/pokerBg.png")}/>
        <Image style={[styles.card,styles.card2]} source={require("./../static/images/poker/pokerBg.png")}/>
      </View>
    )
  }
}

export default Player3;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    left:-20,
    bottom:70,
    borderRadius:70,
  },
  playerImage:{
    width:"100%",
    height:"100%"
  },
  account:{
    backgroundColor:"rgba(0,0,0,0)",
    textAlign:"center",
    color:"#fff",
    marginTop:2
  },
  wait:{
    width:22,
    height:22,
    position:"absolute",
    top:-44,
    left:-11,
  },
  card:{
    width:18,
    height:25,
    position:"absolute",
    top:20,
    right:-24,
  },
  card1:{
    transform:[{rotateZ:"90deg"}],
  },
  card2:{
    transform:[{rotateZ:"70deg"}],
  }
});