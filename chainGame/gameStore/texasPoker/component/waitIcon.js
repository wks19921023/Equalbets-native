import React, { Component, } from 'react'
import { View,Image} from 'react-native'

class WaitIcon extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let waitImg,src;
    const type = this.props.type;
    if(type=="self"){
      src = require("./../static/images/wait.png");
    }else if(type=="left"){
      src = require("./../static/images/smallWait.png");
    }else{
      src = require("./../static/images/smallWait.png");
    }
    return (
      <View>
      <Image style={this.props.style} source={src}/>
      </View>
    )
  }
}

export default WaitIcon;