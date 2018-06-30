import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  Viro3DObject,
  ViroNode,
  ViroImage,
  ViroARPlaneSelector,
  ViroOrbitCamera,
  ViroSpotLight,
  ViroQuad,
  ViroOmniLight
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      scale: [.1, .1, .1],
      rotation: [0, 45, 0],
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
    // const obj3d = require('./components/model.jpg')
    // console.log('3D ==>',  obj3d)
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {/* <ViroAmbientLight color="#ffffff" /> */}
        {/* <ViroARPlaneSelector> */}
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
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
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

          {/* <ViroQuad
              rotation={[-90, 0, 0]}
              position={[0, -.001, 0]}
              width={2.5} height={2.5}
              arShadowReceiver={true}
              ignoreEventHandling={true} /> */}
        </ViroNode>
        {/* </ViroARPlaneSelector> */}
      </ViroARScene>
    );
  }

  _setARNodeRef = (component) => {
    this.arNodeRef = component;
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
  _onPinch = (pinchState, scaleFactor, source)  => {
    let newScale = this.state.scale.map(scale => {
      return scale * scaleFactor
    })

    // console.log(newScale)
    if (pinchState == 3) {
      this.setState({
        scale: newScale
      })
      return;
    }
    this.arNodeRef.setNativeProps({ scale: newScale })
  }

  _onRotate = (rotateState, rotationFactor, source) => {
    if (rotateState == 3) {
      this.setState({
        rotation : [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      })
      return;
    }

    this.arNodeRef.setNativeProps({rotation:[this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]});
  }
}

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../js/res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldSceneAR