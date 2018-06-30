import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  ViroNode,
  ViroOmniLight
} from 'react-viro';
import Body3DObject from "./Body";
import Head3DObject from "./Head";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      scale: [.1, .1, .1],
      rotation: [0, 0, 0],
      clickFlag: 0
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  _onClick = () => {
    this.setState({
      clickFlag: this.state.clickFlag + 1
    })
    if (this.state.clickFlag === 2) {
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.setState({
        clickFlag: 0
      })
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroOmniLight />
        <ViroNode position={[0, 0, 0]} dragType={'FixedDistance'}>
          <Body3DObject />
          <Head3DObject />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "ARion"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}
module.exports = HelloWorldSceneAR