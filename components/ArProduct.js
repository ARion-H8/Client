import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
<<<<<<< HEAD
  ViroNode,
  ViroOmniLight
=======
  ViroMaterials,
  ViroAmbientLight,
  Viro3DObject,
  ViroNode,
  ViroImage,
  ViroQuad,
  ViroOmniLight,
  ViroButton
>>>>>>> edit ArProduct
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
<<<<<<< HEAD
        <ViroOmniLight />
        <ViroNode position={[0, 0, 0]} dragType={'FixedDistance'}>
          <Body3DObject />
          <Head3DObject />
=======
        <ViroAmbientLight color="#ffffff" />
        <ViroOmniLight
          innerAngle={5}
          outerAngle={20}
          direction={[0, -1, 0]}
          position={[0, 0, -5]}
          color="#ffffff"
          castsShadow={true}
          shadowNearZ={10}
          shadowFarZ={20}
          shadowOpacity={.9}
          /* ref={this._setSpotLightRef}  *//>
        <ViroNode
          dragType="FixedToWorld"
          // onDrag={() => { }}
          position={[0, -1, 0]}
          ref={this._setARNodeRef}
        >
          <Viro3DObject
            source={{ uri: 'https://storage.googleapis.com/logo-image/1530197584087m_trousers_01.obj' }}
            // resource={[
            //   require('../js/assets/illustration_Maska.jpg')
            // ]}
            onDrag={() => {
              this.setState({
                clickFlag: 0
              })
            }}
            rotation={this.state.rotation}
            onRotate={this._onRotate}
            onPinch={this._onPinch}
            position={[0, 0, -5]}
            scale={this.state.scale}
            type="OBJ" />

          <ViroQuad
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            width={4} height={4}
            arShadowReceiver={true} />

>>>>>>> edit ArProduct
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