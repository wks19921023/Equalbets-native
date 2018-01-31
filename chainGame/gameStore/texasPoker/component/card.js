import React, { Component, } from 'react'
import { View,StyleSheet,Image,DeviceEventEmitter } from 'react-native'
import Pokers from "./pokers";
class Card extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      card1:Pokers[0],
      card2:Pokers[1],
    }
  }
  componentWillMount(){
    const _this = this;
    let {store} = this.props;
    DeviceEventEmitter.addListener("START_GAME_REPLY",function(data){
      _this.setState({
        card1:Pokers[data.pokers[store.getState().table.data.player.seatNo][0]],
        card2:Pokers[data.pokers[store.getState().table.data.player.seatNo][1]],
      })
      store.getState().table.data.pokers = data.pokers;
      //console.log(Pokers[1]);
    })
  }
  render() {
    return (
      <View style={[styles.wrap,{display:this.props.display}]}>     
        <Image style={styles.firstCard} source={this.state.card1}/>
        <View style={styles.secondCardWrap}>
          <Image style={styles.secondCard} source={this.state.card2}/>
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
    overflow:"hidden",
    backgroundColor:"rgba(0,0,0,0)"
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