import React, { Component, } from 'react'
import { View,ImageBackground,StyleSheet,Text } from 'react-native';
import Player1 from './player1';
import Player2 from './player2';
import Player3 from './player3';
import Player4 from './player4';
import Player5 from './player5';
import Player6 from './player6';
import Player7 from './player7';
import Player8 from './player8';
import Player9 from './player9';
import RiverBox from './riverBox';
import Slots from './slots';

class Table extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (   
      <ImageBackground style={styles.table} source={require("./../static/images/tableBg.png")}>
        <Player1 />
        <Player2 />
        <Player3 />
        <Player4 />
        <Player5 />
        <Player6 />
        <Player7 />
        <Player8 />
        <Player9 />
        {/**river**/}
        <RiverBox />
        {/**slot**/}
        <Slots />
      </ImageBackground>
    )
  }
}

export default Table;
const styles=StyleSheet.create({
  table:{
    width:558,
    height:244,
    position:"absolute",
    left:"50%",
    top:40,
    marginLeft:-278,
  },
});