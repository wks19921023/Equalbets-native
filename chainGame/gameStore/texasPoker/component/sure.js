import React, { Component, } from 'react'
import { StyleSheet,Image,TouchableOpacity,Text } from 'react-native'

class Sure extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      display:"none"
    }
  }
  changeState(){
    if(this.props.display == "flex"){
      this.props.callback("sure","none");
    }else{
      this.props.callback("sure","flex");
    };  
    this.props.click("ffff")
  }
  render() {
    const {I18n} = this.props;
    return (
      <TouchableOpacity onPress={()=>{this.changeState()}} style={[styles.wrap,{display:this.props.display}]}>
        <Image style={styles.raise} source={require("./../static/images/raise.png")}/>
        <Text style={styles.text}>{I18n.t("sure")}</Text>
      </TouchableOpacity>
    )
  }
}

export default Sure;
const styles = StyleSheet.create({
  wrap:{
    width:48,
    height:44,
    position:"absolute",
    bottom:0,
    right:12,
    zIndex:100
  },
  raise:{
    width:"100%",
    height:"100%",
  },
  text:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#fff",
    position:"absolute",
    top:-12,
    left:0,
    textAlign:"center",
    width:"100%",
    fontSize:12,
  }
});