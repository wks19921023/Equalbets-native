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
    return (
      <View>
      <Image style={this.props.style} source={require("./../static/images/dealer.png")}/>
      </View>
    )
  }
}

export default WaitIcon;