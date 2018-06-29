import React, { Component } from 'react';

import {StyleSheet, View, Text} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  Viro3DObject,
  ViroNode,
  ViroImage
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text : "Initializing AR...",
      scale: [.5, .5, .5],
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    // const obj3d = require('./components/model.jpg')
    // console.log('3D ==>',  obj3d)
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#ffffff" />
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
          <ViroNode
            dragType="FixedToWorld"
            onPinch= { this._onPinch.bind(this) }
            onDrag={()=>{}}
            ref={this._setARNodeRef} 
          >
            <ViroImage
              source={{ uri: 'https://storage.googleapis.com/storagetestupload/1530253507880glasses.png' }}
              position={[0, -.5, -1]} scale={this.state.scale}
              type="OBJ"
            />
          </ViroNode>
      </ViroARScene>
    );
  }

  _setARNodeRef = (component) => {
    this.arNodeRef = component;
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "ARion"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  _onPinch (pinchState, scaleFactor, source) {
    let newScale = this.state.scale.map(scale=>{
      return scale * scaleFactor
    })
    console.log(newScale)
    if(pinchState == 3) {
      this.setState({
        scale:newScale
      })
     return;
    }
    this.arNodeRef.setNativeProps({ scale: newScale })
}
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../js/res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldSceneAR