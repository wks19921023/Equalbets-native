import React, { Component, } from 'react'
import { View,StyleSheet,Image } from 'react-native'

class Card extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.wrap}>     
        <Image style={styles.firstCard} source={require("./../static/images/poker/19.png")}/>
        <View style={styles.secondCardWrap}>
          <Image style={styles.secondCard} source={require("./../static/images/poker/3.png")}/>
        </View>
        <Image style={styles.handImage} source={require("./../static/images/cardHand.png")}/>
      </View>
    )
  }
}

export default Card;
const styles = StyleSheet.create({
  wrap:{
    width:120,
    height:76,
    position:"absolute",
    left:-6,
    bottom:-16,
    overflow:"hidden"
  },
  handImage:{
    width:120,
    height:7,
    position:"absolute",
    bottom:0,
    left:3,
    zIndex:100,
  },
  firstCard:{
    width:55,
    height:74,
    position:"absolute",
    bottom:-14,
    left:12,
    transform:[{rotateZ:"-12deg"}],
    zIndex:1
  },
  secondCardWrap:{
    width:55,
    height:74,
    position:"absolute",
    bottom:-14,
    left:56,
    transform:[{rotateZ:"12deg"}],
    zIndex:2,
    backgroundColor:"rgba(0,0,0,0)",
    shadowColor:"black",
    shadowRadius:5,
    shadowOffset:{width:0,height:0},
    shadowOpacity:1
  },
  secondCard:{
    width:"100%",
    height:"100%",
    position:"absolute",
  },
});