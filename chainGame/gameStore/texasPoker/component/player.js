import React, { Component, } from 'react'
import { View,Image,Text,StyleSheet} from 'react-native'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerStyle:styles.player1,
      headImgWrap:styles.headLeftImgWrap,
      src:require("./../static/images/defaultPlayer.png"),
    }
  }
  componentWillMount(){
    if(this.props.type == "left"){   //left & right
      this.setState({
        headImgWrap:styles.headLeftImgWrap,
      });
    }else{
      this.setState({
        headImgWrap:styles.headRightImgWrap,
      });
    }
    if(this.props.src){
      this.setState({
        src:this.props.src
      });
    }
    if(this.props.playerStyle){
      this.setState({
        playerStyle:this.props.playerStyle,
      })
    }
  }
  render() {
    return (
      <View  style={[styles.player,this.state.playerStyle]}>
        <View style={[styles.border,styles.topBorder]}></View>
        <View style={[styles.border,styles.leftBorder]}></View>
        <View style={this.state.headImgWrap}>
          <Image style={styles.headLeftImg} source={this.state.src}/>
        </View>      
        <View style={styles.playerLeft}>
          <Text style={[styles.playerText,styles.gloden]}>{this.props.name}</Text>
          <Text style={styles.textBorder}></Text>
          <Text style={[styles.playerText,styles.green]}>{this.props.balance}</Text>
        </View>
      </View>
    )
  }
}

export default Player;
const styles = StyleSheet.create({
  player:{
    width:115,
    height:42,
    backgroundColor:"#141009",
    opacity:.8,
    position:"absolute",    
    flexDirection:"row",
    justifyContent:"flex-start",
    borderWidth:1,
    borderColor:"#c9c8c6",
    borderRadius:4,
    //overflow:"hidden",
  },
  player1:{
    left:"50%",
    marginLeft:-56,
    bottom:64,
  },
  headLeftImgWrap:{
    width:42,
    height:42,
    borderRadius:4,
    borderWidth:2,
    borderColor:"#5b5c5c",
    marginLeft:-1,
    marginTop:-1,
    backgroundColor:"rgba(0,0,0,0)",
    //backgroundImage:"linear-gradient(90deg,transparent 50%,#16a085 50%)"
   
  },
  headLeftImg:{
    width:"100%",
    height:"100%",
  },
  playerLeft:{
   height:40,
   width:73,
   alignItems:"center"
  },
  playerText:{
    textAlign:"center",
    backgroundColor:"rgba(0,0,0,0)",
    lineHeight:18,
  },
  textBorder:{
    borderColor:"#989d96",
    borderWidth:.5,
    height:0,
    width:50,
    marginTop:2
  },
  green:{
    color:"#1f833a"
  },
  gloden:{
    color:"#d3b252"
  },
  headRightImgWrap:{
    width:42,
    height:42,
    borderRadius:4,
    borderWidth:1,
    borderColor:"#5b5c5c",
    marginLeft:-1,
    marginTop:-1,
    position:"absolute",
    right:0,
    top:0,
  },
  border:{
    width:115,
    height:42,
    borderColor:"#44eb1d",
    borderTopWidth:2,
    position:"absolute",
    top:-1,
    left:0,
    zIndex:10000,
    borderRadius:4
  },
  topBorder:{
    borderTopWidth:2,
  },
  leftBorder:{
    borderRightWidth:2,
  }
});