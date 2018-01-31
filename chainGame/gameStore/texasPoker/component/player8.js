import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text} from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
class Player8 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage} source={require("./../static/images/player8.png")}/>
        <Chip wrap="small" text="290" align="rightRightBottom"/>
        <WaitIcon style={styles.wait} type="right"/>
        <Text style={styles.account}>$9,909</Text>
        <Image style={[styles.card,styles.card1]} source={require("./../static/images/poker/pokerBg.png")}/>
        <Image style={[styles.card,styles.card2]} source={require("./../static/images/poker/pokerBg.png")}/>
      </View>
    )
  }
}

export default Player8;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    right:-20,
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
    bottom:24,
    right:-12,
  },
  card:{
    width:18,
    height:25,
    position:"absolute",
    top:16,
    left:-24,
  },
  card1:{
    transform:[{rotateZ:"90deg"}],
  },
  card2:{
    transform:[{rotateZ:"110deg"}],
  },
});