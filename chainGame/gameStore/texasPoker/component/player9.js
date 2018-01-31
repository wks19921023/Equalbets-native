import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text} from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
class Player9 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage} source={require("./../static/images/player9.png")}/>
        <Chip wrap="small" text="123" align="rightRightLow"/>
        <WaitIcon style={styles.wait} type="left"/>
        <Text style={styles.account}>$6,257</Text>
        <Image style={[styles.card,styles.card1]} source={require("./../static/images/poker/pokerBg.png")}/>
        <Image style={[styles.card,styles.card2]} source={require("./../static/images/poker/pokerBg.png")}/>
      </View>
    )
  }
}

export default Player9;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    right:97,
    bottom:-12,
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
    marginTop:0
  },
  wait:{
    width:22,
    height:22,
    position:"absolute",
    bottom:20,
    left:-12,
  },
  card:{
    width:18,
    height:25,
    position:"absolute",
    top:-24,
    left:4,
  },
  card1:{
    transform:[{rotateZ:"-30deg"}],
  },
  card2:{
    transform:[{rotateZ:"-10deg"}],
  },
});