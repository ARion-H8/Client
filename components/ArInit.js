import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroNode,
  ViroUtils,
  ViroConstants,
  ViroQuad,
  ViroSpotLight,
  Viro3DObject,
  ViroAnimations,
  ViroOmniLight
} from 'react-viro';
import Object3D from './Object3D';

export default class ArInit extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      scale: [.1, .1, .1],
      rotation: [0, 0, 0],
      clickFlag: 0,
      shouldBillboard: true,
      objPosition: [0, 0, 0],
    };
  }

  _onTrackInit = () => {
    this.props.sceneNavigator.viroAppProps._onTrackingInit();
  }

  _setARNodeRef = (component) => {
    this.arNodeRef = component;
  }

  _setSpotLightRef = (component) => {
    this.spotLight = component;
  }

  _onLoadStart = () => {
    this.setState({
      shouldBillboard: true,
    });
    this.props.sceneNavigator.viroAppProps._onLoadStart();
  }
  // Perform a hit test on load end to display object.
  _onLoadEnd = () => {
    this.refs["arscene"].getCameraOrientationAsync().then((orientation) => {
      this.refs["arscene"].performARHitTestWithRay(orientation.forward).then((results) => {
        this._onArHitTestResults(orientation.position, orientation.forward, results);
      })
    });
    this.props.sceneNavigator.viroAppProps._onLoadEnd();
  }

  _onArHitTestResults = (position, forward, results) => {
    // Default position is just 1.5 meters in front of the user.
    let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
    let hitResultPosition = undefined;

    // Filter the hit test results based on the position.
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        let result = results[i];
        if (result.type == "ExistingPlaneUsingExtent") {
          var distance = Math.sqrt(((result.transform.position[0] - position[0]) * (result.transform.position[0] - position[0])) + ((result.transform.position[1] - position[1]) * (result.transform.position[1] - position[1])) + ((result.transform.position[2] - position[2]) * (result.transform.position[2] - position[2])));
          if (distance > .2 && distance < 10) {
            // If we found a plane greater than .2 and less than 10 meters away then choose it!
            hitResultPosition = result.transform.position;
            break;
          }
        } else if (result.type == "FeaturePoint" && !hitResultPosition) {
          // If we haven't found a plane and this feature point is within range, then we'll use it
          // as the initial display point.
          var distance = this._distance(position, result.transform.position);
          if (distance > .2 && distance < 10) {
            hitResultPosition = result.transform.position;
          }
        }
      }
    }

    if (hitResultPosition) {
      newPosition = hitResultPosition;
    }

    // Set the initial placement of the object using new position from the hit test.
    this._setInitialPlacement(newPosition);
  }

  _distance = (vectorOne, vectorTwo) => {
    var distance = Math.sqrt(((vectorTwo[0] - vectorOne[0]) * (vectorTwo[0] - vectorOne[0])) + ((vectorTwo[1] - vectorOne[1]) * (vectorTwo[1] - vectorOne[1])) + ((vectorTwo[2] - vectorOne[2]) * (vectorTwo[2] - vectorOne[2])));
    return distance;
  }

  _setInitialPlacement = (position) => {
    this.setState({
      objPosition: position,
    });
    setTimeout(() => { this._updateInitialRotation() }, 200);
  }

  _updateInitialRotation = () => {
    this.arNodeRef.getTransformAsync().then((retDict) => {
      let rotation = retDict.rotation;
      let absX = Math.abs(rotation[0]);
      let absZ = Math.abs(rotation[2]);

      let yRotation = (rotation[1]);

      // If the X and Z aren't 0, then adjust the y rotation.
      if (absX > 1 && absZ > 1) {
        yRotation = 180 - (yRotation);
      }

      this.setState({
        rotation: [0, yRotation, 0],
        shouldBillboard: false,
      });
    });
  }

  _getModel(item) {
    ViroMaterials.createMaterials({
      dress_flower: {
        lightingModel: "Constant",
        normalTexture: require('../js/assets/apron/apron_normal.png'),
        diffuseTexture: require('../js/assets/apron/apron_color.png'),
        specularTexture: require('../js/assets/apron/apron_low_feb_body_backup_lambert5SG_SpecularSmoothness.png'),
      },
      hat: {
        lightingModel: "Constant",
        normalTexture: require('../js/assets/Texture/Texture.jpg'),
      },
    });
    const {
      _setARNodeRef,
      _setSpotLightRef,
      state,
      props,
      _onLoadEnd,
      _onLoadStart
    } = this
    var modelArray = []
    const {
      displayObject,
      displayObjectName,
      yOffset,
      objectSource
    } = props.sceneNavigator.viroAppProps
    const {
      shouldBillboard,
      objPosition,
      scale,
      rotation
    } = state

    if (!displayObject || displayObjectName === undefined) {
      return;
    }

    let transformBehaviors = {};
    if (shouldBillboard) {
      transformBehaviors.transformBehaviors = shouldBillboard ? "billboardY" : [];
    }

    var bitMask = 4;
    modelArray.push(
      <ViroNode
        {...transformBehaviors}
        visible={item.display}
        position={objPosition}
        ref={_setARNodeRef}
        scale={scale}
        onDrag={() => {
          //     this.setState({
          //       clickFlag: 0
          //     })
        }}
        rotation={rotation}
        dragType="FixedDistance" key={item.name}
      >
        <Viro3DObject
          ref={this._setARNodeRef}
          position={[0, yOffset, 0]}
          source={item.source}
          type="VRX"
          onLoadEnd={_onLoadEnd}
          onLoadStart={_onLoadStart}
          materials={["hat"]}
          onRotate={this._onRotate}
          onPinch={this._onPinch}
        />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -.001, 0]}
          width={2.5} height={2.5}
          arShadowReceiver={true}
          ignoreEventHandling={true}
        />

      </ViroNode>
    )
    return modelArray;
  }

  _onPinch(pinchState, scaleFactor, source) {
    let newScale = this.state.scale.map(scale => {
      return scale * scaleFactor
    })

    if (pinchState == 3) {
      this.setState({
        scale: newScale
      })
      return;
    }
    this.arNodeRef.setNativeProps({ scale: newScale })
    // var newScale = this.state.scale.map((x) => { return x * scaleFactor })

    // if (pinchState == 3) {
    //   this.setState({
    //     scale: newScale
    //   });
    //   return;
    // }

    // this.arNodeRef.setNativeProps({ scale: newScale });
    // this.spotLight.setNativeProps({ shadowFarZ: 6 * newScale[0] });
  }

  _onRotate(rotateState, rotationFactor, source) {
    if (rotateState == 3) {
      this.setState({
        rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      })
      return;
    }

    this.arNodeRef.setNativeProps({ rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]] });
  }

  render() {
    const self = this
    const { cartItem, sceneNavigator } = this.props
    return (
      <ViroARScene ref="arscene" onTrackingUpdated={sceneNavigator.viroAppProps._onInitialized}>
        <ViroAmbientLight color="#ffffff" /* intensity={200}  */ />
        {cartItem.map(item => (
          self._getModel(item)
        ))}
      </ViroARScene>
    )
  }
}

module.exports = ArInit;
