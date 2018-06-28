import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput
} from 'react-native';


export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Login
          </Text>
          <Text style={styles.subtitle}>Email:</Text>
          <TextInput
          name='email'
          placeholder='Email'
          style={styles.textInput}
          />
          <Text style={styles.subtitle}>Password:</Text>
          <TextInput
          name='password'
          placeholder='Password'
          style={styles.textInput}
          />
          <Button
          title='Sign In'
          onPress={() => this.props.navigation.navigate('Catalogue')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1
  },
  textInput: {
    width: 300,
    padding: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 5,
    alignSelf: 'center'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    margin: 2
  }
})