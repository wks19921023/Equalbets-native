import React, { Component, } from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Animated,
} from 'react-native'; 
class LoginInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idText:"",
      pwdText:"",
    };
  }
  componentWillMount(){
    const {eventBus} = this.props.screenProps;
    const {navigate} = this.props.navigation;
    eventBus.addListener("loginInSuc",function(data){   
      //console.log(data)
      if(data.msg == "success"){
        navigate("GameList");
      }else{
        console.log("some error happen!")
      }
    });
  }
  componentDidMount(){
  }
  loginIn(){ 
    const {api} = this.props.screenProps;
    api.dispatch("login","LOGIN_IN",{userName:this.state.idText,pwd:this.state.pwdText});
  }
  render() {
    const {I18n} = this.props.screenProps;
    const {navigate} = this.props.navigation; 
    return (
      <View style={styles.backgroundWrap}>
        <Image style={styles.bgImage} source = {require("./../static/images/loginBg.jpg")}/>
        {/**<TouchableOpacity style={styles.goBack} onPress={()=>{navigate("GameList")}}>
          <Image  style={styles.goBackImg} source={require("./../static/images/back.png")}/>
        </TouchableOpacity>**/}
        {/*Login box*/}
        <Animated.View style={styles.loginAmtBox}>
        <ImageBackground style={styles.loginBox} source={require("./../static/images/loginBorder.png")}>
          <View style={styles.inputBox}>
            <View style={styles.left}>
              <Image style={styles.userPic} source={require("./../static/images/portrait.png")}/>
            </View> 
            <View style={styles.right}>
              <View style={styles.textWrap}>
                <Text style={styles.labelText}>{I18n.t("id")}:</Text>
                <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({idText:text})} placeholder={I18n.t("idPlaceholder")}></TextInput>
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.labelText}>{I18n.t("pwd")}:</Text>
                <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={(text)=>this.setState({pwdText:text})} placeholder={I18n.t("pwdPlaceholder")}></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.btnBox}>
          <TouchableOpacity onPress={()=>{this.loginIn()}} style={styles.leftBtnBox}>
            <ImageBackground  source={require("./../static/images/loginBtnGreen.png")} style={styles.loginBtn}>
              <Text style={styles.loginText}>{I18n.t("loginBtn")}</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightBtnBox}>
            <ImageBackground source={require("./../static/images/registerBtn.png")} style={styles.registerBtn}>
              <Text style={styles.loginText}>{I18n.t("registerBtn")}</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>
        </ImageBackground>
        </Animated.View>
        {/*Login box end*/}
        {/*Register box*/}
        <Animated.View>
          <ImageBackground style={styles.registerBox} source={require("./../static/images/registerBg.png")}>
          
          </ImageBackground>
        </Animated.View>
        {/*Register box end*/}
      </View>
    )
  }
}
export default LoginInput;
const styles = StyleSheet.create({
  backgroundWrap:{
    flex:1,
    alignItems:"center",
  },
  bgImage:{
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor:'rgba(0,0,0,0)',
    position:"absolute",
  },
  goBack:{
    position:'absolute',
    left:10,
    top:10,
  },
  goBackImg:{
    width:33,
    height:32
  },
  loginBox:{
    width:"100%",
    height:"100%",
  },
  inputBox:{
    width:380,
    height:100,
    marginLeft:13,
    marginTop:40,
    flexDirection:"row",
  },
  userPic:{
    width:100,
    height:100,
  },
  left:{
    width:100,
  },
  right:{
    width:260,
    marginLeft:14
  },
  textWrap:{
    height:40,
    flexDirection:"row",
    backgroundColor:"white",
    marginTop:4,
    marginBottom:10
  },
  labelText:{
    height:40,
    color:"#c9a24c",
    lineHeight:40,
    width:50,
    textAlign:"right"
  },
  textInput:{
    height:40,
    paddingLeft:20,
    color:"#a5a5a5",
    width:200
  },
  btnBox:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  loginBtn:{
    width:115,
    height:30,
  },
  leftBtnBox:{
    width:115,
    height:30,
    marginLeft:20,
    marginTop:20
  },
  loginText:{
    backgroundColor:'rgba(0,0,0,0)',
    color:"white",
    textAlign:"center",
    lineHeight:24,
    fontSize:16
  },
  registerBtn:{
    width:115,
    height:30,
    marginRight:20,
    marginTop:20,
  },
  loginAmtBox:{
    width:406,
    height:218,
    position:"absolute",
    left:"50%",
    marginTop:-109,
    marginLeft:-203,
    top:"50%",
  },
  registerBox:{
    width:406,
    height:263,
    //opacity:0,
    display:"none"
  }
});