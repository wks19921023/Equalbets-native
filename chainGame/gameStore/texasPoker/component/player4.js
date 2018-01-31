import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text} from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
class Player4 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage} source={require("./../static/images/player4.png")}/>
        <Chip wrap="small" text="29" align="rightLeftCenter"/>
        <WaitIcon style={styles.wait} type="left"/>
        <Text style={styles.account}>$1,376</Text>
        <Image style={[styles.card,styles.card1]} source={require("./../static/images/poker/pokerBg.png")}/>
        <Image style={[styles.card,styles.card2]} source={require("./../static/images/poker/pokerBg.png")}/>
      </View>
    )
  }
}

export default Player4;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    left:16,
    top:0,
    borderRadius:70,
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
    top:34,
    right:-24,
  },
  card1:{
    transform:[{rotateZ:"-60deg"}],
  },
  card2:{
    transform:[{rotateZ:"-80deg"}],
  },
});