import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroOmniLight
  // ViroARPlane,
  // ViroMaterials,
  // ViroNode,
  // ViroUtils,
  // ViroConstants,
  // ViroQuad,
  // ViroSpotLight,
  // Viro3DObject,
  // ViroAnimations,
  // ViroOmniLight
} from 'react-viro';
import Object3D from './Object3D';

export default class ArInit extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
    };
  }

  _onTrackInit = () => {
    this.props.sceneNavigator.viroAppProps._onTrackingInit();
  }
  showObject = (arscene) => {
    let objects = [];
    const { cartItem } = this.props
    cartItem.forEach((item, index) => {
      objects.push(<Object3D
        index={index}
        item={item}
        key={item.name}
        arSceneNavigator={{ ...this.props.arSceneNavigator }}
        arscene={arscene}
      />)
    })
    return objects
  }

  render() {
    const { sceneNavigator } = this.props
    return (
      <ViroARScene ref="arscene" onTrackingUpdated={sceneNavigator.viroAppProps._onInitialized}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroOmniLight />        
        {this.showObject(this.refs["arscene"])}
      </ViroARScene>
    )
  }
}

module.exports = ArInit;
