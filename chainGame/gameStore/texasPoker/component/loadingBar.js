import React, { Component, } from 'react'
import { View,StyleSheet,Text,DeviceEventEmitter} from 'react-native'

class LoadingBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      display:"flex",
    }
  }
  componentWillMount(){
    const _this = this;
    DeviceEventEmitter.addListener("START_GAME_REPLY",function(data){
      _this.setState({
        display:"none"
      })
    });
  }
  render(){
    const {I18n} = this.props;
    return (
      <View style={[styles.loadingBarWrap,{display:this.state.display}]}>
        <Text style={styles.loadingBarText}>{I18n.t("loadingText")}</Text>
      </View>
    )
  }
}

export default LoadingBar;
const styles = StyleSheet.create({
  loadingBarWrap:{
    width:200,
    height:20,
    left:"50%",
    top:"44%",
    marginLeft:-100,
    position:"absolute",
  },
  loadingBarText:{
    color:"#26b554",
    fontSize:14,
    backgroundColor:"rgba(0,0,0,0)",
    textAlign:"center"
  },
});