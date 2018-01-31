import React, { Component, } from 'react'
import { View,StyleSheet,Image,Animated,Easing} from 'react-native'

class RiverBox extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      aniShow:new Animated.Value(0),
    };
  }
  componentDidMount(){
    Animated.timing(
      this.state.aniShow,{
        toValue:0.5,
        duration:500,
        easing:Easing.quad
    }).start(()=>{
      this.secondAnimated();
    });
  }
  secondAnimated(){
    Animated.timing(
      this.state.aniShow,{
        toValue:1,
        duration:500,
        easing:Easing.quad
    }).start();
  }
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.card}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={require("./../static/images/poker/1.png")}>
          </Animated.Image>
        </View>
        <View style={styles.card}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={require("./../static/images/poker/1.png")}>
          </Animated.Image>
        </View>
        <View style={styles.card}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={require("./../static/images/poker/1.png")}>
          </Animated.Image>
        </View>
        <View style={styles.card}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={require("./../static/images/poker/1.png")}>
          </Animated.Image>
        </View>
        <View style={styles.card}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={require("./../static/images/poker/pokerBg.png")}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.aniShow.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.aniShow.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={require("./../static/images/poker/1.png")}>
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