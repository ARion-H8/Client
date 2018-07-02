import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1 } from 'native-base';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import product from '../Graphql'
import { graphql } from 'react-apollo'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  next = () => {
    this._passInput._root.focus()
  }
  signUp = () => {
    this.props.navigation.navigate('Register')
  }
  signIn = async () => {
    let { email, password } = this.state
		try{
			let result = await this.props.mutate({
				variables: { 
					email,
					password
				}
      })
			let { token, _id, name } = result.data.signIn
			if(token){
          // ToastAndroid.showWithGravity(
            // '   Success to Login \n \nRedirect to Catalogue',
            // ToastAndroid.SHORT,
            // ToastAndroid.CENTER
          // )
          this.props.screenProps.changeLoginState(true, token)
			}
		}catch(err){
			Alert.alert(
				'Failed To Login',
				'Username or password wrong',
				[
				  {text: 'OK'},
				],
				{ cancelable: false }
			)
		}
  }
  componentDidMount = async () => {
		try{
      let token = await AsyncStorage.getItem('token')
			if(token) this.props.navigation.navigate('Catalogue')
		}catch(err){
			console.log(err)
		}
	}
  render() {
    return (
      <Container style={{ backgroundColor: '#f1ded3' }}>
        <View style={ styles.container } >
          <Form style={{ alignItems: 'center'}}>
            <H1 style={ styles.login }>Login</H1>
            <View style={ styles.input } >
              <Item style={ styles.input } fixedLabel>
                <Label>Email</Label>
                <Input
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={this.next}
                  underlineColorAndroid='transparent'
                  password={true}
                  blurOnSubmit={false}
                />
              </Item>
            </View>
            <View style={ styles.input }>
              <Item style={ styles.input } fixedLabel>
                <Label>Password</Label>
                <Input
                  value={this.state.password}
                  onChangeText={password => this.setState({password})}
                  ref={(ref) => {this._passInput = ref}}
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={this.submit}
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                  blurOnSubmit={true}
                />
              </Item>
            </View>
          </Form>
          <Button 
          success
          onPress={ this.signIn }
          style={ styles.btnStyle }>
            <Text> Sign In </Text>
          </Button>
        </View>
        <TouchableOpacity onPress={ this.signUp } style={ styles.footer }  >
					<Text>
						<Text style = {{ fontSize: 11, color:'#595959' }} > Don't have an account? </Text>
						<Text style={{ fontSize: 11, color:'#595959', fontWeight: 'bold' }}>Sign up</Text>
					</Text>
				</TouchableOpacity>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    },
  input: {
    marginBottom: 10,
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#b8b894',
    borderWidth: 1,
  },
  btnStyle: { 
    marginTop: 10, 
    alignSelf: 'center' ,
    borderRadius: 6
  },
  login:{ 
    alignSelf: 'center', 
    fontWeight: 'bold', 
    marginBottom:15,
    color:'#666666' 
  },
  footer: {
		height: 55,
		width: '100%',
		borderColor: '#b8b894',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
})

export default graphql(product.signIn)(Login)