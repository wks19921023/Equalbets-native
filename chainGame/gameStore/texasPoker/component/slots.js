import React, { Component, } from 'react'
import { View,StyleSheet,DeviceEventEmitter} from 'react-native'
import Slot from './slot';
class Slots extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      slot1Display:"none",
      slot2Display:"none",
      slot3Display:"none",
      text1:"0",
      text2:"0",
      text3:"0"
    }
  }
  componentWillMount(){
    this.roundEnd();
    this.endAll();
  }
  endAll(){
    const _this = this;
    const {store} = this.props;
    DeviceEventEmitter.addListener("END_ALL",function(){
      _this.setState({
        slot1Display:"none",
      });
    });
  }
  roundEnd(){
    const _this = this;
    const {store} = this.props;
    DeviceEventEmitter.addListener("END_ROUND",function(){
      _this.setState({
        slot1Display:"flex",
        text1:store.getState().table.data.pot,
      });
    });
  }
  render() {
    return (
      <View style={styles.wrap}>
        <Slot wrap="big" text={this.state.text1} display={this.state.slot1Display}/>
        <Slot wrap="small" text={this.state.text2} display={this.state.slot2Display}/>
        <Slot wrap="normal" text={this.state.text3} display={this.state.slot3Display}/>
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