import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text} from 'react-native'

class Slot extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      chipImage:require('./../static/images/borderOpacity1.png'),
      chipBg:require('./../static/images/borderOpacity1.png'),
    }
  }
  componentDidMount(){
    const type = this.props.wrap;
    switch(type){
      case "big":
        this.setState({
          chipBg:require('./../static/images/borderOpacity1.png'),
          chipImage:require('./../static/images/slotChips.png'),
        });
        break;
      case "normal":
        this.setState({
          chipBg:require('./../static/images/borderOpacity1.png'),
          chipImage:require('./../static/images/slotChipsNormal.png'),
        });
        break;
      case "small":
        this.setState({
          chipBg:require('./../static/images/borderOpacity2.png'),
          chipImage:require('./../static/images/slotChipsSmall.png'),
        });
        break;
      default:
        return false;
        break;
    }
  }
  render() {
    return (
      /***
        big >1000
        normal 100-1000
        small <100
      **/
      <View style={styles[this.props.wrap]}>       
        <Image style={styles[this.props.wrap+"Opacity"]} source={this.state.chipBg}/>
        <Image style={styles[this.props.wrap+"Chip"]} source={this.state.chipImage}/>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

export default Slot;
const styles = StyleSheet.create({
  big:{
    flexDirection:"row",
    justifyContent:"center",  
    width:55,
    height:26,
    marginLeft:10,
  },
  small:{
    flexDirection:"row",
    justifyContent:"center",  
    width:40,
    height:26,
    marginLeft:10,
  },
  normal:{
    flexDirection:"row",
    justifyContent:"center",  
    width:55,
    height:26,
    marginLeft:10,
  },
  bigOpacity:{
    width:55,
    height:17,
    position:"absolute",
    bottom:0,
    left:0,
  },
  smallOpacity:{
    width:40,
    height:17,
    position:"absolute",
    bottom:0,
    left:0,
  },
  normalOpacity:{
    width:55,
    height:17,
    position:"absolute",
    bottom:0,
    left:0,
  },
  bigChip:{
    width:17,
    height:24,
    position:"absolute",
    bottom:2,
    left:3
  },
  smallChip:{
    width:17,
    height:20,
    position:"absolute",
    bottom:2,
    left:3
  },
  normalChip:{
    width:17,
    height:25,
    position:"absolute",
    bottom:2,
    left:3
  },
  text:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#d1d22f",
    position:"absolute",
    left:22,
    bottom:2,
    fontSize:12
  },
});