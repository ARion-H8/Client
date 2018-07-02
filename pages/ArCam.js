import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro'
import { StyleSheet, View, TouchableHighlight, Image, AlertIOS, ScrollView, ActivityIndicator } from 'react-native';

// import HelloWorldSceneAR from '../components/ArProduct'
import { ViroARSceneNavigator, ViroConstants } from 'react-viro';
import { Text, Footer, FooterTab, Button } from 'native-base'

let ArProduct = require('../components/ArProduct')
let ArInit = require('../components/ArInit')
let sharedProps = {
	apiKey: '637783C0-7B08-4336-A463-922B852892BC'
}

var objArray = [
	require('../js/assets/apron_low.obj'),
	require('../js/assets/knitted_sweater_01.obj'),
	require('../js/assets/m_trousers_02.obj'),
	require('../js/assets/pith_helmet.obj')
];

import renderIf from '../js/helpers/renderIf';

export default class ArCam extends Component {
	constructor() {
		super()
		this.state = {
			cartItem: [
				{
					_id: "5b39e2662ddd3681e678d666",
					name: "Chef Apron",
					image: "https://storage.googleapis.com/storagetestupload/1530517814601apron.jpg",
					obj_name: "apron",
					obj_url: "https://storage.googleapis.com/storagetestupload/1530517884801apron_low.obj",
					texture_url: "https://storage.googleapis.com/storagetestupload/1530517987448apron_color.png",
					display: false
				},
				{
					_id: "5b39e6d3c8f59d00105c92db",
					name: "Knitted Sweater",
					image: "https://storage.googleapis.com/storagetestupload/1530518221887sweater.png",
					obj_name: "sweater",
					obj_url: "https://storage.googleapis.com/storagetestupload/1530518274275knitted_sweater_01.obj",
					texture_url: "https://storage.googleapis.com/storagetestupload/1530521601333Knitted_Sweater_01.png",
					display: false
				},
				{
					_id: "5b39e73dc8f59d00105c92dc",
					name: "M trousers Jeans",
					image: "https://storage.googleapis.com/storagetestupload/1530518784241jeans.png",
					obj_name: "jeans",
					obj_url: "https://storage.googleapis.com/storagetestupload/1530518846987m_trousers_02.obj",
					texture_url: "https://storage.googleapis.com/storagetestupload/1530518887895M_Trousers_02_SPEC.png",
					display: false
				},
				{
					_id: "5b39e790c8f59d00105c92dd",
					name: "Pith Helmet",
					image: "https://storage.googleapis.com/storagetestupload/1530519614228hat.png",
					obj_name: "hat",
					obj_url: "https://storage.googleapis.com/storagetestupload/1530519500150pith_helmet.obj",
					texture_url: "https://storage.googleapis.com/storagetestupload/1530519478247pith_helmet_spec.jpg",
					display: false
				}
			],
			// cartItem: [{
			// 	pos: 0,
			// 	name: "obj1",
			// 	yOffset: 0,
			// 	source: objArray[0],
			// 	display: false
			// }, {
			// 	pos: 1,
			// 	name: "obj2",
			// 	yOffset: .290760,
			// 	source: objArray[1],
			// 	display: false
			// }, {
			// 	pos: 2,
			// 	name: "obj3",
			// 	yOffset: .497823,
			// 	source: objArray[2],
			// 	display: false
			// }, {
			// 	pos: 3,
			// 	name: "obj4",
			// 	yOffset: .694821,
			// 	source: objArray[3],
			// 	display: false
			// }],
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

	_onShowObject = (objIndex) => {
		let cartItem = this.state.cartItem
		cartItem[objIndex].display = !cartItem[objIndex].display
		this.setState({
			cartItem
		});
	}

	render() {
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

				<View >
					{this.state.isObject ? (
						<Footer style={{ backgroundColor: "#000000" }}>
							<Button transparent onPress={this._onDisplayDialog}
							style={{
								borderRadius:4,
								opacity:0.7
							}}
							>
								<Text>x</Text>
							</Button>
							<FooterTab>
								<ScrollView horizontal={true}>
									{this.state.cartItem.map((item, index) => (
										<Button transparent
											onPress={() => {
												this._onShowObject(index)
											}}
											key={item.name}
											style={{margin: 10, borderRadius: 10, padding: 5}}
										>
											<Image
												source={{uri:item.image}}
												style={{
													width: 50,
													height: 50,
													borderRadius: 10
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
											height: 100,
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



