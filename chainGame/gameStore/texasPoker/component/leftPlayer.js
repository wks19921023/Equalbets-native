import React, { Component, } from 'react'
import { View, } from 'react-native'

class LeftPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={[styles.player,styles.player2]}>
            <View style={styles.headLeftImgWrap}>
              <Image style={styles.headLeftImg} source={require("./static/images/defaultPlayer.png")}/>
            </View>
            <View style={styles.playerLeft}>
              <Text style={[styles.playerText,styles.gloden]}>player2</Text>
              <Text style={styles.textBorder}></Text>
              <Text style={[styles.playerText,styles.green]}>8000</Text>
            </View>
      </View>
    )
  }
}

export default LeftPlayer