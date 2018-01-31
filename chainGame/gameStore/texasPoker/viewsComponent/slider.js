import React, { Component, } from 'react'
import { View, } from 'react-native'

class Slider extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <View style={styles.bottomBox}>
                  <View style={styles.bottomBoxTop}>
                    <Text style={styles.buyIn}>Buyin:</Text>
                  </View>
                  <View style={styles.bottomBoxMain}>
                    <Slider onValueChange={value=>this.setState({
                        maxValue:value
                      })} style={styles.bar} value={0} minimumValue={0} maximumValue={10000} trackShowImage={require("./static/images/slideFrameShow.png")} trackImage={require("./static/images/slideFrameBg.png")} thumbTouchSize={{width:20,height:50}} minimumTrackTintColor="rgba(0,0,0,0)" trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor="#95712a">
                    </Slider>
                  </View>
                  <Text style={styles.account}>${parseInt(this.state.maxValue)}</Text>
                  <View style={styles.buyInRatio}>
                    <Text style={styles.buyInRatioInfo} >Small/Big</Text>
                    <Text style={styles.buyInRatioNum} >{this.state.blind}</Text>
                  </View>
                </View>
      </View>
    )
  }
}

export default Slider