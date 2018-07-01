import React, { Component } from 'react';
import {
  YellowBox,
  View,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import { getToken, signIn, signOut } from './auth'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
console.ignoredYellowBox = ['Remote debugger']

import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from './pages/Home'
import ArCam from './pages/ArCam'
import Login from './pages/Login'
import Register from './pages/Register'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Catalogue from './pages/Catalogue'
import Profile from './pages/Profile'
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
      screen: Catalogue,
      navigationOptions:{
        title: 'Catalogue',
        headerLeft:null
      }
    },
    Home: {
      screen: Home,
      navigationOptions:{
        title:'Home',
      }
    },
    ArCam: {
      screen: ArCam,
      navigationOptions:{
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions:{
        header: null
      }
    },
    Detail: {
      screen: Detail,
      navigationOptions:{
        header: null
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions:{
        header: null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions:{
        title: 'Profile'
      }
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
      title:'Catalogue',
      headerLeft:null
    }
  },
 
});

export default class App extends React.Component {
  constructor(){
    super()
    this.state ={
       loggedIn: false,
       loading: true
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

  render() {
    const{ loggedIn,loading } = this.state
    if(loading){
			return (
				<View style={ styles.container } >
					<ActivityIndicator />
					<StatusBar barStyle="default" />
				</View>
			)
		}else{
      return (
        <ApolloProvider client = { client }>
          {
            loggedIn ?
            <Navigator screenProps={{ changeLoginState: this.handleChangeLoginState }} />
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
