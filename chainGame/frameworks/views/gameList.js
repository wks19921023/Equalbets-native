import React, { Component, } from 'react'
import { 
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

class GameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {I18n} = this.props.screenProps;
    return (
      <View style={styles.wrap}>
        <ImageBackground style={styles.bgImage} source={require("./../static/images/selectModeBg.png")}>   
          <TouchableOpacity onPress={()=>{alert("coming soon!")}}>
            <ImageBackground style={styles.leftBtn} source={require("./../static/images/loginBtn.png")}>
              <View style={styles.btnTextWrap}>
                <Text style={styles.btnText}>{I18n.t("accountBtn")}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigate("GameType")}}>
            <ImageBackground style={styles.rightBtn} source={require("./../static/images/loginBtn.png")}>
              <View style={styles.btnTextWrap}>
                <Text style={styles.btnText}>{I18n.t("loginBtn")}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}
export default GameList;
const styles = StyleSheet.create({
  warp:{
    flex:1,
  },
  bgImage:{
    width:"100%",
    height:"100%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"flex-end",
    paddingBottom:30,
  },
  leftBtn:{
    width:115,
    height:29,
    marginRight:42
  },
  rightBtn:{
    width:115,
    height:29,
    marginLeft:42
  },
  btnTextWrap:{
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100%",
    backgroundColor:"rgba(0,0,0,0)",    
    flex:1,
  },
  btnText:{
    fontSize:14,
    color:"white"
  }
});