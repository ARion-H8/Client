import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1 } from 'native-base';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert, ToastAndroid } from 'react-native'
import product from '../Graphql'
import { graphql } from 'react-apollo'

class Register extends Component {
  constructor(){
    super()
    this.state = {
      username:'',
      email: '',
      password: '',
    }
  }

  next = (status) => {
    if(status=='email'){
      this._passInput._root.focus()
    }else{
      this._emailInput._root.focus()
    }
  }
  signIn = () => {
    this.props.navigation.navigate('Login')
  }
  signUp = async () => {
    const { username, email, password } = this.state
		try{
			let result = await this.props.mutate({
				variables:{
					newUser: {
						username,
						email,
						password
					}
				}
			})
			console.log(result)
			if(result.data.signUp){
				Alert.alert(
					'Success to sign up',
					'You will redirect to login',
					[
					  {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
					],
					{ cancelable: false }
				)
			}
		}catch(err){
			Alert.alert(
				'Failed To SignUp',
				'Your input doesn\'t meet criteria or email already registered',
				[
				  {text: 'OK'},
				],
				{ cancelable: false }
			)
		}
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#f1ded3' }}>
        <View style={ styles.container } >
          <Form style={{ alignItems: 'center'}}>
            <H1 style={ styles.login }>Register</H1>
            <View style={ styles.input } >
              <Item style={ styles.input } fixedLabel>
                <Label>Username</Label>
                <Input
                  value={this.state.name}
                  onChangeText={username => this.setState({username}) }
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => this.next('username')}
                  underlineColorAndroid='transparent'
                  password={true}
                  blurOnSubmit={false}
                />
              </Item>
            </View>
            <View style={ styles.input } >
              <Item style={ styles.input } fixedLabel>
                <Label>Email</Label>
                <Input
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                  ref={(ref) => {this._emailInput = ref}}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={ () => this.next('email')}
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
          onPress={ this.signUp }
          style={ styles.btnStyle }>
            <Text> Register </Text>
          </Button>
        </View>
        <TouchableOpacity onPress={ this.signIn } style={ styles.footer }  >
					<Text>
						<Text style = {{ fontSize: 11, color:'#595959' }} > Already have an account? </Text>
						<Text style={{ fontSize: 11, color:'#595959', fontWeight: 'bold' }}>Sign in</Text>
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

export default graphql(product.signUp)(Register)