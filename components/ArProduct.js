import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  ViroNode,
  ViroOmniLight,
  ViroButton
} from 'react-viro';
import Body3DObject from "./Body";
// import Head3DObject from "./Head";

export default class ArProduct extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      scale: [.1, .1, .1],
      rotation: [0, 0, 0],
      clickFlag: 0,
      buttonStateTag: ''
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {/* <ViroOmniLight /> */}
        <ViroNode position={[0, 0, 0]} dragType={'FixedDistance'}>
          <Body3DObject />
          {/* <Head3DObject /> */}
        </ViroNode>

      </ViroARScene>
    );
  }

  _onButtonGaze() {
      this.setState({
          buttonStateTag: "onGaze"
      });
  }

  _onButtonTap() {
      this.setState({
          buttonStateTag: "onTap"
      });
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
module.exports = ArProduct