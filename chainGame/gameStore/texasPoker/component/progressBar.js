import React, { Component } from 'react'
import { View,StyleSheet,Image,Text,TouchableOpacity,ImageBackground} from 'react-native'
import Slider from "./Slider";
class ProgressBar extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      display:"none",
      maxValue:"0"
    }
  }
  changeState(){
    if(this.props.display == "flex"){
      this.props.callback("display","none");
    }else{
      this.props.callback("display","flex");
    }; 
  }
  render() {
    let display;
    if(this.props.display == "none"){
      display = "flex";
    }else{
      display = "none";
    }
    return (
      <View style={[styles.wrap,{display:display}]}>
        <Image style={styles.bgImage} source={require("./../static/images/progressBar.png")}/>
        <Text style={styles.account}>${this.state.maxValue}</Text>
        <Slider onValueChange={value=>this.setState({
            maxValue:value
          })} style={styles.bar} value={0} minimumValue={0} maximumValue={10000} thumbTouchSize={{width:20,height:50}} minimumTrackTintColor="#95712a" trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor="#95712a">
        </Slider>
        <TouchableOpacity style={styles.allInWrap}>
          <ImageBackground style={styles.allIn} source={require("./../static/images/progressBtnOn.png")}>
            <Text style={styles.allInText}>ALL IN</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.potWrap}>
          <ImageBackground style={styles.pot} source={require("./../static/images/progressBtnOut.png")}>
            <Text style={styles.potText}>POT</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.potWrap,styles.halfPot]}>
          <ImageBackground style={styles.pot} source={require("./../static/images/progressBtnOut.png")}>
            <Text style={styles.potText}>1/2 POT</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ProgressBar;
const styles = StyleSheet.create({
  wrap:{
    width:174,
    height:375,
    position:"absolute",
    top:0,
    right:0,
    zIndex:2,
  },
  bgImage:{
    position:"absolute",
    width:"100%",
    height:"100%",
    top:0,
    left:0,
  },
  account:{
    width:149,
    height:41,
    position:"absolute",
    top:10,
    left:15,
    backgroundColor:"rgba(0,0,0,0)",
    fontSize:24,
    color:"#fff",
    textAlign:"center",
    lineHeight:41,
    fontWeight:"bold",
  },
  bar:{
    width:150,
    height:50,
    position:"absolute",
    bottom:90,
    right:10,
    zIndex:2000
  },
  track:{
    width:150,
    height:50,
    backgroundColor:"#cbac6f",
    //borderRadius:10
  },
  thumb:{
    width:6,
    height:50,
    //transform:[{rotate:"-85deg"}],
  },
  code:{
    width:37,
    height:21,
    position:"absolute",
    bottom:"25%",
    right:7,
  },
  allInWrap:{
    width:98,
    height:35,
    position:"absolute",
    top:68,
    left:8,
  },
  allIn:{
    width:"100%",
    height:"100%",   
  },
  allInText:{
    textAlign:"center",
    lineHeight:33,
    backgroundColor:"rgba(0,0,0,0)",
    color:"#573818",
    fontSize:16,
    width:"100%",
    height:"100%", 
  },
  potWrap:{
    width:98,
    height:35,
    position:"absolute",
    top:115,
    left:8,
  },
  pot:{
    width:"100%",
    height:"100%",
  },
  potText:{
    textAlign:"center",
    lineHeight:33,
    backgroundColor:"rgba(0,0,0,0)",
    color:"#c7aa64",
    fontSize:16,
    width:"100%",
    height:"100%", 
  },
  halfPot:{
    top:162
  }
});