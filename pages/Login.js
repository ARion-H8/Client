import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1 } from 'native-base';


export default class Login extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#f1ded3' }}>
        <Content style={{ marginVertical: 250, marginHorizontal:10, backgroundColor: '#cd9774', borderRadius: 10, paddingRight: 20, paddingTop: 15 }}>
          <Form style={{ alignItems: 'center', paddingVertical: 0}}>
            <H1 style={{ alignSelf: 'center', fontWeight: 'bold' }}>Login</H1>
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
            <Text> Sign In </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}