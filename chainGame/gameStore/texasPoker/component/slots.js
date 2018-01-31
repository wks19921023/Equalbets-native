import React, { Component, } from 'react'
import { View,StyleSheet, } from 'react-native'
import Slot from './slot';
class Slots extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Slot wrap="big" text="5685"/>
        <Slot wrap="small" text="85"/>
        <Slot wrap="normal" text="888"/>
      </View>
    )
  }
}

export default Slots;
const styles = StyleSheet.create({
  wrap:{
    width:270,
    height:26,
    position:"absolute",
    left:"50%",
    marginLeft:-135,
    top:45,
    flexDirection:"row",
    justifyContent:"center",
  },
});