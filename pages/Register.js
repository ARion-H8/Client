import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1 } from 'native-base';

class Register extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#f1ded3' }}>
        <Content style={{ marginVertical: 220, marginHorizontal:10, backgroundColor: '#cd9774', borderRadius: 10, paddingRight: 20, paddingTop: 15 }}>
          <Form style={{ alignItems: 'center', paddingVertical: 0 }}>
            <H1 style={{ alignSelf: 'center', fontWeight: 'bold' }}>Register</H1>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input 
              name='username'
              />
            </Item>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input 
              name='email'
              />
            </Item>
            <Item fixedLabel>
              <Label>Password</Label>
              <Input
              name='password'
              secureTextEntry={true}
              />
            </Item>
          </Form>
          <Button 
          success
          style={{ marginTop: 20, alignSelf: 'center' }}>
            <Text> Sign Up </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 3,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 1
//   },
//   textInput: {
//     width: 300,
//     padding: 8
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 25,
//     margin: 5,
//     alignSelf: 'center'
//   },
//   subtitle: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     margin: 2
//   }
// })

export default Register;