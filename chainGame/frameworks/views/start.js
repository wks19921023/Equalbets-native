import React, { Component, } from 'react'
import { View,ImageBackground,Text,StyleSheet,Animated,StatusBar} from 'react-native'
import Orientation from 'react-native-orientation';
class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFade:new Animated.Value(0),
      loadingText:"Loading.  ",
      loadingTextIndex:"0",
    };
  }
  componentWillMount(){
    const initial = Orientation.getInitialOrientation();
    if(initial === "PORTRAIT"){
       console.log("竖屏");
       Orientation.lockToLandscape();
    }else{
       console.log("横屏");
    }
  }
  loadingStart(){   //start loading tips animate
    this.loadingStart = setInterval(
      ()=>{
        this.state.loadingTextIndex++;
        if(this.state.loadingTextIndex>2){
          this.state.loadingTextIndex = 0;
        }
        if(this.state.loadingTextIndex == 0){
          this.setState({
            loadingText:"Loading.  "
          });
        }else if(this.state.loadingTextIndex == 1){
          this.setState({
            loadingText:"Loading.. "
          });
        }else{
          this.setState({
            loadingText:"Loading..."
          });
        }
      },
      1000,
    );
  }
  loadingStop(){
      this.loadingStart && clearInterval(this.loadingStart);
      let {navigate} = this.props.navigation;
      navigate("LoginIn");
  }
  componentDidMount(){ //go loginIn page 5min later;
    Animated.timing(
      this.state.imageFade,
      {
        toValue:1,
      }
    ).start();
    this.loadingStart();
    setTimeout(()=>{
      this.loadingStop();
    },1000);
  }
  render() {
    return (
      <View style={styles.backgroundWrap}>
        <StatusBar hidden={true} />
        <Animated.Image style={[styles.backgroundImage,{opacity:this.state.imageFade}]} source={require('./../static/images/start.jpg')}/>
        <Text style={styles.loadingFont}>{this.state.loadingText}</Text>
      </View>
          
    )
  }
}
export default Start;
const styles = StyleSheet.create({
  backgroundWrap:{
    flex:1,
    alignItems:"center",
  },
  backgroundImage:{
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor:'rgba(0,0,0,0)',
    position:"absolute"
  },
  loadingFont:{
    color:"white",
    bottom:20,
    fontSize:16,
    position:'absolute',
    backgroundColor:'rgba(0,0,0,0)',
  }
});