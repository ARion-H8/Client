import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroOmniLight
} from 'react-viro';
import Object3D from './Object3D';

export default class ArInit extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
    };
  }

  showObject = (arscene) => {
    let objects = [];
    const { cartItem } = this.props
    cartItem.forEach((item, index) => {
      if(item.product.display) {
        objects.push(<Object3D
          index={index}
          item={item.product}
          key={item.product.name}
          arSceneNavigator={{ ...this.props.arSceneNavigator }}
          arscene={arscene}
        />)
      }
    })
    return objects
  }

  render() {
    return (
      <ViroARScene ref="arscene" onTrackingUpdated={this.props._onInitialized}>
        {/* <ViroAmbientLight color="#ffffff" intensity={200} /> */}
        <ViroOmniLight />        
        {this.showObject(this.refs["arscene"])}
      </ViroARScene>
    )
  }
}

module.exports = ArInit;
