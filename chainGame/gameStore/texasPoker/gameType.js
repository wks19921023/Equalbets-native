import React, { Component, } from 'react';
import { View, Text,StyleSheet,ImageBackground,TouchableOpacity,Image,TextInput,Button,TouchableWithoutFeedback} from 'react-native';

import * as Status from "./status";
import * as Provider from "./active/provider";
import * as Active from "./active";
import Slider from "./component/Slider.1";
import Select from "./viewsComponent/select";
import Roller from "./viewsComponent/roller";
class GameType extends Component {

  constructor(props) {
    super(props)
    this.state = {
      display:"flex",
      noLimit: true,
      limit: false,
      potLimit: false,
      display:"none",
      maxValue:"0",
      height: 20,
    }
  }
  componentWillMount(){
   const array = [];
   const arr = ["10/20","20/40","40/80"]

   for(let i = 0; i<arr.length; i++) {
     array.push({ value: i, label: arr[i] })
   }
   this.setState({
        array: array
    });
  }
  
  componentDidMount(){
    
  }

  componentWillUpdate() {
    // // this.refs.ScrollContainer.scrollTo({ y: this.state.index * this.state.height }, { animated: false })
    // console.warn(this.refs.Picker.refs)
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate() {
    // console.warn(this.state.index);

  }
  
  render(){
    const {I18n} = this.props.screenProps;
    const {navigate} = this.props.navigation; 
    return (
      <View style={styles.wrap}>       
        <ImageBackground source={require("./static/images/gameTypeBg.jpg")} style={styles.tableBg}>
          <TouchableOpacity  onPress={()=>{
              navigate("GameList")
            }} style={styles.backBtnWrap}>
            <Image style={styles.backBtn} source={require("./../../frameworks/static/images/back.png")}/>       
          </TouchableOpacity> 
          <View style={styles.gameMain}>
            <ImageBackground source={require("./static/images/gTypeMainBg1.png")} style={[styles.tableBg,styles.tableWrap]}>
              <TouchableOpacity style={styles.closeWrap} onPress={()=>{
                navigate("GameList")
              }}>
                <Image style={styles.close} source={require("./static/images/close2.png")}/>  
              </TouchableOpacity>
              <Select I18n={I18n} style={styles.selectWrap}/>
              <Roller I18n={I18n}/>
              <TouchableOpacity onPress={()=>{navigate("TexasPoker")}} style={styles.start}>
                <ImageBackground source={require("./static/images/buttonSelect1.png")} style={styles.tableBg}>
                  <Text style={styles.textStart}>{I18n.t("start")}</Text>
                </ImageBackground>
              </TouchableOpacity>                              
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

export default GameType;
const styles = StyleSheet.create({
  wrap:{
    flex: 1,
  },
  selectWrap:{
    position:"absolute",
    top:51,
    left:15,
    width:423,
    height:50,
  },
  tableBg:{
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  backBtnWrap:{
    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 1001
  },
  tableWrap:{
    width:452,
    height:347,
    left:"50%",
    marginLeft:-226,
    top:15,
  },
  backBtn:{
    width: 33,
    height: 32,
  },
  gameMain:{
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 100
  },
  close:{
    width:20,
    height:20,
    position: "absolute",
    top:0,
    right:0,
  },
  closeWrap:{
    width: 20,
    height: 20,
    position: "absolute",
    right:10,
    top:10, 
  },
  textStart:{
    backgroundColor: 'rgba(0,0,0,0)',
    color: "#fff",
    textAlign: "center",
    lineHeight: 28,
    fontSize: 16
  },
  start:{
    width: 120,
    height: 35,
    position: "absolute",
    right: 15,
    bottom: 8,
  },
  sizeSelect: {
    width: 100,
    height: 35,
    textAlign: "center",
    lineHeight: 30,
    color: "#fff",
    fontSize: 20,
    position: "absolute",
    left: 100,
    top: 28,
    backgroundColor: "#a9945f",
    borderRadius:2
  },
  bottomBox: {
    width: 434,
    height: 110,
    position: "absolute",
    left: 82,
    top: 215,
  },
  bottomBoxTop: {
    width: 434,
    height: 40,
    backgroundColor:"rgba(0,0,0,0)",
    position: "absolute",
    left: 0,
    top: 0,
  },
  buyIn: {
    height: "100%",
    width: 100,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    position: "absolute",
    top: 0,
    left: 20,
    backgroundColor:"rgba(0,0,0,0)",
  },
  custom: {
    height: "100%",
    width: 100,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "right",
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor:"rgba(0,0,0,0)",
  },
  bottomBoxMain: {
    width: 434,
    height: 36,
    backgroundColor:"rgba(0,0,0,0)",
    position: "absolute",
    left: 0,
    top: 35,
  },
  bar:{
    width:300,
    height:20,
    position:"absolute",
    bottom: 10,
    left: 20,
    zIndex:1000
  },
  track:{
    width:300,
    height:20,
    backgroundColor:"#cbac6f", // 显示颜色
    //borderRadius:10
  },
  thumb:{
    width:10,
    height:36,
    //transform:[{rotate:"-85deg"}],
  },
  account:{
    width:80,
    height:20,
    position:"absolute",
    bottom:15,
    right:40,
    backgroundColor:"rgba(0,0,0,0)",
    fontSize:18,
    color:"#fff",
    textAlign:"left",
    lineHeight:20,
    fontWeight:"bold",
  },
  buyInRatio:{
    width:200,
    height:36,
    position:"absolute",
    bottom:5,
    left: 20,
    backgroundColor:"rgba(0,0,0,0)"
  },
  buyInRatioInfo:{
    width:200,
    height:18,
    fontSize:16,
    lineHeight:18,
    color:"#fff",
  },
  buyInRatioNum:{
    width:200,
    height:18,
    fontSize:16,
    lineHeight:18,
    color:"#fff",
    backgroundColor:"rgba(0,0,0,0)"
  }
});