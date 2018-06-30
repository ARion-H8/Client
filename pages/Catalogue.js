import React, { Component } from 'react';
import { StatusBar, AsyncStorage, StyleSheet, ActivityIndicator, View, FlatList } from 'react-native';
import { Container, Header, Content} from 'native-base';
import product from '../Graphql'
import { graphql } from 'react-apollo'
import ListProducts from '../components/ListProducts'

class Catalogue extends Component {

  async componentDidMount(){
    try{
      await AsyncStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM0YTFjMmJiNGYwNDQ5ZGM2YThmYzYiLCJlbWFpbCI6InJleUBnbWFpbC5jb20iLCJpYXQiOjE1MzAxNzc3MDl9.8q1YWBBsyOdkQO3pXKQqHCZ3EWKd_84CqWpOgDq3TDY')
    }catch(err){
      console.log(err)
    }
  }

  render() {
    const { products, loading } = this.props.data
    const  navigation = this.props.navigation
    if(loading){
			return (
				<View style={ styles.container } >
					<ActivityIndicator />
					<StatusBar barStyle="default" />
				</View>
			)
		}else{
      return (
        <Container>
          <Content>
            <FlatList
              data= { products }
              keyExtractor= { item => item._id }
              renderItem ={({ item }) => <ListProducts product= { item } navigation= { navigation } /> }
            />
          </Content>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  detail:{
    alignSelf:'flex-end',
    backgroundColor:'green',
    marginTop: 10,
    borderRadius: 4,
    width:55,
    height:25,
    alignItems: 'center',
  },
  toCart:{
    alignSelf:'flex-end',
    backgroundColor:'red',
    marginTop: 10,
    borderRadius: 4,
    width:95,
    height:25,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

export default graphql(product.show)(Catalogue)