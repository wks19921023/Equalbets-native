import React, { Component, } from 'react'
import { View,StyleSheet,Text,ImageBackground } from 'react-native'
import Picker from 'react-native-hardskilled-picker';
class Roller extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      array: [],
    }
  }
  componentWillMount(){
    const array = [];
    for(let i = 0;i<24;i++){
      array.push({value:i,label:`It's ${i}`});
    }
    this.setState({
      array:array
    });
  }
  handlerOnChange(item){
    console.log(item);
  }
  render() {
    return (
        <View style={styles.content}>
          <Text style={styles.size}>大/小 盲注:</Text>
          {/* <Text style={styles.sizeSelect}>MAX</Text> */}
          <View style={styles.wheel}>
            <ImageBackground source={require(".././static/images/wheelBg.png")} style={styles.tableBg}>
              <Picker
                array={this.state.array} 
                elements={3} 
                upButton={<Text>eeee</Text>}
                downButton={<Text>eeee</Text>}
                onChange={this.handlerOnChange} // onChange callback
                currentTextStyles={{ color: 'orange' }} // Style for current element
                currentTopStyles={{ borderTopColor: 'orange' }} // Style for top border
                currentBottomStyles={{ borderBottomColor: 'orange' }} // Style for bottom border
                textItem={{ fontSize: 18 }} // Text item style
                viewItem={{ height: 20 }} // View item style
                value={3} // Default value
               />
            </ImageBackground>
          </View>
        </View>
    )
  }
}

export default Roller;
const styles = StyleSheet.create({
  content:{
    width: 420,
    height: 90,
    position: "absolute",
    left: 82,
    top: 118,
  },
  size: {
    width: 120,
    height: 90,
    textAlign: "center",
    lineHeight: 56,
    color: "#fff",
    fontSize: 20,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor:"rgba(0,0,0,0)",
  },
  wheel: {
    width: 80,
    height: 60,
    position: "absolute",
    left: 120,
    top: 15,
    backgroundColor:"rgba(0,0,0,0)",
  },
  tableBg:{
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});