import React, { Component } from 'react';
import {
  View,
	Text,
	TouchableHighlight
} from 'react-native';
import { ViroARSceneNavigator } from 'react-viro'
<<<<<<< HEAD
=======
=======
import { StyleSheet, View, TouchableHighlight, Image, AlertIOS, ScrollView, ActivityIndicator } from 'react-native';

// import HelloWorldSceneAR from '../components/ArProduct'
import { ViroARSceneNavigator, ViroConstants } from 'react-viro';
<<<<<<< HEAD
import { Text, DeckSwiper, Footer, FooterTab, Button } from 'native-base'
>>>>>>> add button in Arr Screen
=======
import { Text, Footer, FooterTab, Button } from 'native-base'
>>>>>>> add 3d object
>>>>>>> add 3d object

let ArProduct = require('../components/ArProduct')
let ArInit = require('../components/ArInit')
let sharedProps = {
	apiKey: '637783C0-7B08-4336-A463-922B852892BC'
}

var objArray = [
	require('../js/res/coffee_mug/object_coffee_mug.vrx'),
	require('../js/res/object_flowers/object_flowers.vrx'),
	require('../js/assets/apron_low.obj'),
	require('../js/res/emoji_smile/emoji_smile.vrx')];

import renderIf from '../js/helpers/renderIf';

export default class ArCam extends Component {
	constructor() {
		super()
		this.state = {
			cartItem: [{
				pos: 0,
				name: "coffee",
				yOffset: 0,
				source: objArray[0],
				display: false
			}, {
				pos: 1,
				name: "flower",
				yOffset: .290760,
				source: objArray[1],
				display: false
			}, {
				pos: 2,
				name: "apron",
				yOffset: .497823,
				source: objArray[2],
				display: false
			}, {
				pos: 3,
				name: "emoji",
				yOffset: .694821,
				source: objArray[3],
				display: false
			}],
			sharedProps: sharedProps,
			isObject: false,
			viroAppProps: {
				displayObject: false,
				objectSource: objArray[0],
				yOffset: 0,
				_onLoadEnd: this._onLoadEnd,
				_onLoadStart: this._onLoadStart,
				_onInitialized: this._onInitialized
			},
			trackingInitialized: false,
			isLoading: false,
		}
	}

	_onLoadStart = () => {
		this.setState({
			isLoading: true,
		});
	}

	_onLoadEnd = () => {
		this.setState({
			isLoading: false,
		});
	}

	_onDisplayDialog = () => {
		this.setState({
			isObject: !this.state.isObject
		})
	}

	_onInitialized = (state, reason) => {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				trackingInitialized: true,
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}

	_onShowObject = (objIndex, objUniqueName, yOffset) => {
		let cartItem = this.state.cartItem
		cartItem[objIndex].display = !cartItem[objIndex].display
		this.setState({
			cartItem,
			viroAppProps: {
				...this.state.viroAppProps,
				displayObject: true,
				yOffset: yOffset,
				displayObjectName: objUniqueName,
				objectSource: objArray[objIndex]
			},
		});
	}

	render() {
		const self = this
		return (
			<View style={localStyles.outer} >
				<ViroARSceneNavigator
					style={localStyles.arView} {...this.state.sharedProps}
					initialScene={{ scene: ArInit, passProps: { displayObject: this.state.viroAppProps.displayObject, cartItem: this.state.cartItem } }}
					viroAppProps={this.state.viroAppProps}
				/>

				{renderIf(this.state.isLoading,
					<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff' />
					</View>)
				}

				<View>
					{this.state.isObject ? (
						<Footer>
							<Button transparent onPress={this._onDisplayDialog}>
								<Text>X</Text>
							</Button>
							<FooterTab style={{ backgroundColor: "#000000" }}>
								<ScrollView horizontal={true}>
									{this.state.cartItem.map((item) => (
										<Button transparent
											onPress={() => {
												this._onShowObject(item.pos, item.name, item.yOffset)
											}}
											key={item.name}
										>
											<Image
												source={require('../js/res/btn_mode_objects.png')}
												style={{
													width: 50,
													height: 50
												}}
											/>
										</Button>
									))}
								</ScrollView>
							</FooterTab>
						</Footer>) : (
							<View style={{ position: 'absolute', left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
								<TouchableHighlight style={localStyles.buttons}
									onPress={this._onDisplayDialog}
									underlayColor={'#00000000'} >
									<Image
										source={require('../js/res/btn_mode_objects.png')}
										style={{
											width: 100,
											height: 100
										}}
									/>
								</TouchableHighlight>
							</View>
						)}
				</View>
			</View>

		)
	}
}


var localStyles = StyleSheet.create({
	outer: {
		flex: 1,
	},

	arView: {
		flex: 1,
	},

	buttons: {
		height: 80,
		width: 80,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: '#00000000',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ffffff00',
		alignSelf: 'center'
	}
});



