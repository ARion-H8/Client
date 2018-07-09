import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, ScrollView, ActivityIndicator } from 'react-native';

import { ViroARSceneNavigator, ViroConstants } from 'react-viro';
import { Text, Footer, FooterTab, Button, Header, Container, Content } from 'native-base';

let ArInit = require('../components/ArInit')
let sharedProps = {
	apiKey: '637783C0-7B08-4336-A463-922B852892BC'
}

import renderIf from '../js/helpers/renderIf';

export default class ArCam extends Component {
	constructor() {
		super()
		this.state = {
			cartItem: [],
			sharedProps: sharedProps,
			isObject: false,
			trackingInitialized: false,
			isLoading: false,
			// header: false,
			index: 0,
			// material: 'obj1'
		}
	}

	componentDidMount() {
		const { navigation } = this.props;
		let cartItem = [...navigation.state.params.itemCart]
		cartItem.forEach(item => {
			item.product.display = false
		})
		this.setState({
			cartItem
		})
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

	_onInitialized = (state, _) => {
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
		cartItem[objIndex].product.display = true
		this.setState({
			cartItem
		});
	}

	hideObject = (objIndex) => {
		let cartItem = this.state.cartItem
		cartItem[objIndex].product.display = false
		this.setState({
			cartItem
		});
	}

	showHeader = (idx) => {
		this.setState({
			header: true,
			index: idx
		})
	}

	hideHeader = () => {
		// this.setState({
		// 	header: false
		// })
	}

	changeColor = (idx) => {
		// if (idx === 0) {
		// 	this.setState({
		// 		material: 'obj1'
		// 	})
		// } else {
		// 	this.setState({
		// 		material: 'obj2'
		// 	})
		// }
	}

	handleHeader = () => {
		const { cartItem, index, header } = this.state
		if (header) {
			return (
				<Header>
					<ScrollView horizontal={true}>
						<Button transparent
							onPress={() => this.changeColor(0)}
							style={{ margin: 5, borderRadius: 5, padding: 5 }}
						>
							<Image
								source={{ uri: cartItem[index].product.texture_img1 }}
								style={{
									width: 50,
									height: 50,
									borderRadius: 5,
									margin: 5
								}}
							/>
						</Button>
						<Button transparent
							onPress={() => this.changeColor(1)}
							style={{ margin: 5, borderRadius: 5, padding: 5 }}
						>
							<Image
								source={{ uri: cartItem[index].product.texture_img2 }}
								style={{
									width: 50,
									height: 50,
									borderRadius: 5
								}}
							/>
						</Button>
					</ScrollView>
				</Header>
			)
		}
	}

	handleButton = () => {
		if (this.state.isObject) {
			return (
				<Footer style={{ backgroundColor: "#000000" }}>
					<Button transparent onPress={this._onDisplayDialog}
						style={{
							borderRadius: 4,
							opacity: 0.7
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
									key={item.product.name}
									style={{ margin: 5, borderRadius: 5, padding: 5 }}
								>
									<Image
										source={{ uri: item.product.image }}
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
				</Footer>
			)
		} else {
			return (
				<View
					style={{ position: 'absolute', left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
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
				</View >
			)
		}
	}

	render() {
		const { navigation } = this.props
		console.log(this.state.material)
		let updateMaterial = this.state.material
		return (
			<Container>
				{/* {this.handleHeader()} */}
				<ViroARSceneNavigator
					{...this.state.sharedProps}
					initialScene={{ scene: ArInit, passProps: { cartItem: navigation.state.params.itemCart, _onInitialized: this._onInitialized, hideObject: this.hideObject, /* showHeader: this.showHeader, material:updateMaterial */ } }}
				/>

				{renderIf(this.state.isLoading,
					<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff' />
					</View>)}
				{this.handleButton()}
			</Container>
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



