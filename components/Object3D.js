import React, { Component } from 'react'
import {
  ViroNode,
  Viro3DObject,
  ViroMaterials
} from 'react-viro';
import { Alert } from 'react-native'

export default class Object3D extends Component {
  constructor() {
    super()
    this.state = {
      scale: [.1, .1, .1],
      rotation: [0, 0, 0],
      clickFlag: 0,
      shouldBillboard: true,
    }
  }

  _setARNodeRef = (component) => {
    this.arNodeRef = component;
  }

  _setSpotLightRef = (component) => {
    this.spotLight = component;
  }

  _onPinch = (pinchState, scaleFactor, _) => {
    var newScale = this.state.scale.map((x) => {
      return x * scaleFactor
    })

    if (pinchState == 3) {
      this.setState({
        scale: newScale
      });
      return;
    }

    this.arNodeRef.setNativeProps({ scale: newScale })
  }

  _onRotate = (rotateState, rotationFactor, _) => {
    if (rotateState == 3) {
      this.setState({
        rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      })
      return;
    }

    this.arNodeRef.setNativeProps({ rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]] });
  }

  _onDrag = () => {
    this.setState({
      clickFlag: 0
    })
  }

  _onClick = () => {
    this.setState({
      clickFlag: this.state.clickFlag + 1
    })
    if (this.state.clickFlag === 1) {
      Alert.alert(
        `${this.props.item.name}`,
        'What are you gonna do?',
        [
          { text: 'Add to Cart', onPress: () => this.addToCart() },
          { text: 'Delete', onPress: () => this.deleteThis() },
          { text: 'Cancel', onPress: () => { }, style: 'cancel' }
        ],
        {
          cancelable: true
        }
      )
      this.setState({
        clickFlag: 0
      })
    }
  }

  render() {
    ViroMaterials.createMaterials({
      apron: {
        lightingModel: "Constant",
        diffuseTexture: require('../js/assets/apron/apron_color.png')
      },
      flower: {
        lightingModel: "Constant",
        diffuseTexture: require('../js/assets/apron/apron_color.png')
      },
      emoji: {
        lightingModel: "Constant",
        diffuseTexture: require('../js/assets/apron/apron_color.png')
      },
      coffee: {
        lightingModel: "Constant",
        diffuseTexture: require('../js/assets/Texture/Texture.jpg')
      },
      camo: {
        lightingModel: "Constant",
        diffuseTexture: require('../js/assets/shirt/CAMO-texture.jpg')
      },
      felt: {
        lightingModel: "Constant",
        diffuseTexture: require('../js/assets/shirt/FELT-texture.jpg')
      },
    });
    return (
      <ViroNode
        visible={this.props.item.display}
        key={this.props.item.name}
      >
        <Viro3DObject
          ref={this._setARNodeRef}
          position={[0, 0, -10]}
          onClick={this._onClick}
          // source={this.props.item.source}
          source={require('../js/assets/Womens-Hoodie_Apose-2.obj')}
          onLoadEnd={this._onLoadEnd}
          onLoadStart={this._onLoadStart}
          // onDrag={this._onDrag}
          onPinch={this._onPinch}
          onRotate={this._onRotate}
          rotation={this.state.rotation}
          onDrag={this._onDrag}
          dragType={"FixedToWorld"}
          type={"OBJ"}
          onClick={this._onClick}
          materials={["camo"]}
        />
      </ViroNode>
    )
  }
}
