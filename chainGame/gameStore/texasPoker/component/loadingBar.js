import React, { Component, } from 'react'
import { View,StyleSheet,Text} from 'react-native'

class LoadingBar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    const {I18n} = this.props;
    return (
      <View style={styles.loadingBarWrap}>
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