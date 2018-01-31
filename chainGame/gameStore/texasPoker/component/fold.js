import React, { Component, } from 'react'
import { Text,StyleSheet,Image,TouchableOpacity } from 'react-native'

class Fold extends Component {

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
        <Image style={styles.fold} source={require("./../static/images/fold.png")}/>
        <Text style={styles.text}>{I18n.t("fold")}</Text>
      </TouchableOpacity>
    )
  }
}

export default Fold;

const styles = StyleSheet.create({
  wrap:{
    width:48,
    height:42,
    position:"absolute",
    bottom:2,
    right:178,
    zIndex:100,
  },
  fold:{
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
  }
});