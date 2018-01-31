import React, { Component, } from 'react'
import {TouchableOpacity,Image,Text,StyleSheet} from 'react-native'

class Call extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {I18n} = this.props;
    return (
      <TouchableOpacity style={styles.wrap}>
        <Image style={styles.call} source={require("./../static/images/call.png")}></Image>
        <Text style={styles.text}>{I18n.t("call")}</Text>
        <Text style={styles.account}>650</Text>
      </TouchableOpacity>
    )
  }
}

export default Call;
const styles = StyleSheet.create({
  wrap:{
    width:48,
    height:42,
    position:"absolute",
    bottom:2,
    right:95,
    zIndex:100,
  },
  call:{
    width:"100%",
    height:"100%"
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
  },
  account:{
    textAlign:"center",
    color:"#2d2315",
    backgroundColor:"rgba(0,0,0,0)",
    position:"absolute",
    bottom:16,
    left:0,
    width:"100%",
    fontWeight:"bold",
  }
});