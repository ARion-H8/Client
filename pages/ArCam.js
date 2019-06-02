
import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import HelloWorldSceneAR from '../components/HelloWorldSceneAR'
import { ViroARSceneNavigator } from 'react-viro'

let HelloAr = require('../components/HelloWorldSceneAR')
let sharedProps = {
	apiKey:'637783C0-7B08-4336-A463-922B852892BC'
}

export default class ArCam extends Component {
	constructor(){
		super()
			this.state ={
				sharedProps: sharedProps
			}
	}

  render() {
     	return (
			<ViroARSceneNavigator {...this.state.sharedProps} 
				initialScene={{ scene: HelloAr }}
			/>
		)
  }
}

