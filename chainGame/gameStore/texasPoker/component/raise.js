import React, { Component, } from 'react'
import { StyleSheet,Image,TouchableOpacity,Text} from 'react-native'

class Raise extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      display:"flex"
    }
  }
  changeState(){
    if(this.props.display == "flex"){
      this.props.callback("raise","none");
    }else{
      this.props.callback("raise","flex");
    };    
  }
  render() {
    const {I18n} = this.props;
    return (
      <TouchableOpacity onPress={()=>{this.changeState()}} style={[styles.wrap,{display:this.props.display}]}>
        <Image style={styles.raise} source={require("./../static/images/raise.png")}/>
        <Text style={styles.text}>{I18n.t("raise")}</Text>
      </TouchableOpacity>
    )
  }
}

export default Raise;
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