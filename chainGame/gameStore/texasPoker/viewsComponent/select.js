import React, { Component, } from 'react'
import {View,TouchableOpacity,StyleSheet,ImageBackground,Text} from 'react-native'

class Select extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      noLimit: true,
      limit: false,
      potLimit: false,
    }
  }
  noLimitPress(){
    this.setState({
      noLimit: true,
      limit: false,
      potLimit: false,
    })
  }
  limitPress(){
    this.setState({
      noLimit: false,
      limit: true,
      potLimit: false,
    })
  }
  potLimitPress(){
    this.setState({
      noLimit: false,
      limit: false,
      potLimit: true,
    })
  }
  render(){
    const {I18n} = this.props;
    return (
      <View style={this.props.style}>
        <TouchableOpacity activeOpacity={1} style={styles.noLimit} onPress={()=>{this.noLimitPress()}}>
          <ImageBackground  source={ this.state.noLimit ? require(".././static/images/buttonSelect1.png") :require(".././static/images/noSelectType1.png") } style={styles.tableBg}>
            <Text style={styles.text}>{I18n.t("noLimit")}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1}  style={styles.limit} onPress={()=>{this.limitPress()}}>
          <ImageBackground source={ this.state.limit ? require("./../static/images/buttonSelect1.png") : require("./../static/images/noSelectType1.png") } style={styles.tableBg}>
            <Text style={styles.text}>{I18n.t("limit")}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.potLimit} onPress={()=>{this.potLimitPress()}}>
          <ImageBackground source={ this.state.potLimit ? require("./../static/images/buttonSelect1.png") : require("./../static/images/noSelectType1.png") } style={styles.tableBg}>
            <Text style={styles.text}>{I18n.t("potLimit")}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Select;
const styles = StyleSheet.create({
  tableBg:{
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  noLimit:{
    width:120,
    height:35,
    position:"absolute",
    left:15,
    top:8,
  },
  limit:{
    width:120,
    height:35,
    position: "absolute",
    left:150,
    top:8,
  },
  potLimit:{
    width: 120,
    height: 35,
    position: "absolute",
    borderRadius: 5,
    left: 285,
    top: 8,
  },
  text:{
    backgroundColor: 'rgba(0,0,0,0)',
    color: "#714c1f",
    textAlign: "center",
    lineHeight: 28,
    fontSize: 16
  },
});


