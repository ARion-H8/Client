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
      scale: [.6, .6, .6],
      rotation: [0, 0, 0],
      clickFlag: 0,
      shouldBillboard: true,
      display: false
    }
  }

  componentDidMount() {
    this.setState({
      display: this.props.item.display 
    })
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

  deleteObject = () => {
    this.setState({
      display: false
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
          { text: 'Delete', onPress: () => this.deleteObject() },
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
      [this.props.item.obj_name]: {
        lightingModel: "Constant",
        diffuseTexture: { uri: this.props.item.texture_url }
      }
    });
    return (
      <ViroNode
        visible={this.state.display}
        key={this.props.item.name}
        position={[0, 0, 0]} 
        // dragType={'FixedToWorld'}
      >
        <Viro3DObject
          ref={this._setARNodeRef}
          position={[0, -5, -10]}
          onClick={this._onClick}
          source={{ uri: this.props.item.obj_url }}
          onPinch={this._onPinch}
          onRotate={this._onRotate}
          // rotation={this.state.rotation}
          onDrag={this._onDrag}
          type={"OBJ"}
          onClick={this._onClick}
          scale={this.state.scale}
          materials={[this.props.item.obj_name]}
        />
      </ViroNode>
    )
  }
}
