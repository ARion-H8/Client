import React, { Component } from 'react';
import {
  YellowBox,
  View,
  AsyncStorage,
  StyleSheet,
  Image
} from 'react-native';
import { getToken, signIn, signOut } from './auth'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
YellowBox.ignoreWarnings(['Module'])
YellowBox.ignoreWarnings(['Task'])
console.ignoredYellowBox = ['Remote debugger']

import { createStackNavigator, createDrawerNavigator, StackNavigator } from 'react-navigation'
import ArCam from './pages/ArCam'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Catalogue from './pages/Catalogue'
import SideBar from './components/SideBar';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "https://arion-208509.appspot.com/graphql",
  request: async (operation) => {
    const token = await AsyncStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
})

const HomeScreenRouter = createDrawerNavigator(
  {
    Catalogue: {
      screen: createStackNavigator(
        {
          Catalogue:{
            screen:Catalogue,
            navigationOptions:{
              header:null
            }
          }
        }
      )
    },
    ArCam: {
      screen: createStackNavigator(
        {
          ArCam:{
            screen:ArCam,
            navigationOptions:{
              header:null
            }
          }
        }
      )
    },
    Login: {
      screen: Login,
      navigationOptions:{
        header: null
      }
    },
    Cart: {
      screen: createStackNavigator(
        {
          Cart:{
            screen:Cart,
            navigationOptions:{
              title: null,
              header: null
            }
          },
          ArCam:{
            screen:ArCam,
            navigationOptions:{
              header:null
            }
          }
        }
      )
    },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions:{
      header: null
    }
  },
})

const Navigator = createStackNavigator({
  Catalogue: {
    screen: HomeScreenRouter,
    navigationOptions:{
      header:null
    }
  },
});

export default class App extends React.Component {
  constructor(){
    super()
    this.state ={
       loggedIn: false,
       loading: true,
       cart: null
    }
  }

  async componentDidMount() {
    const token = await getToken()
    if (token) {
      this.setState({ loggedIn: true });
      this.setState({ loading: false });
    }else{
      this.setState({ loading: false });
    }
  }

  handleChangeLoginState = (loggedIn = false, token) => {
    this.setState({ loggedIn });
    if (loggedIn) {
      signIn(token);
    } else {
      signOut();
    }
  };

  refetch = () => {
    let cart = AsyncStorage.getItem(cart, [])
    this.setState({
      cart
    }
    )
  }

  render() {
    const{ loggedIn,loading } = this.state
    if(loading){
			return (
				<View style={ styles.container } >
          <Image source={ require('./js/assets/Arion.png') }/>
				</View>
			)
		}else{
      return (
        <ApolloProvider client = { client }>
          {
            loggedIn ?
            <Navigator screenProps={{ changeLoginState: this.handleChangeLoginState, refetch: this.refetch }} />
            :
            <AuthStack screenProps={{ changeLoginState: this.handleChangeLoginState }} />
          }
        </ApolloProvider>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
