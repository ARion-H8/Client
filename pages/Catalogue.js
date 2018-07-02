import React, { Component } from 'react';
import { StatusBar, 
  AsyncStorage, 
  StyleSheet, 
  View, 
  ScrollView, 
  Image } from 'react-native';
import { Container, Header, Content, Card,CardItem,Icon,Body,Thumbnail,Left,Button,Right,Text } from 'native-base';
import product from '../Graphql'
import { graphql, compose } from 'react-apollo'
import ListProducts from '../components/ListProducts'
import CartIcon from '../components/CartIcon'

class Catalogue extends Component {
  constructor(){
    super()
    this.state={
      totalCart:0
    }
  }

  addToCart = async (newData) => {
    const { _id } = newData
    try{
      let result = await this.props.mutate({
        variables:{
          newCart:{
            product:_id,
            quantity:1
          }
        },
        refetchQueries: [{ query:product.cart }]
      })
      console.log(result)
    }catch(err){
      console.log(err)
    }
    let { totalCart } = this.state
    totalCart+=1
    this.setState({ totalCart })
  }

  toCart = () => {
    this.props.navigation.navigate('Cart')
  }

  render() {
    const { products, loading,user } = this.props.data
    const  navigation = this.props.navigation
    if(loading){
			return (
				<View style={ styles.container } >
					<Image source={ require('../Arion.jpg') }/>
				</View>
			)
		}else{
      return (
        <Container>
        <Header style={{ backgroundColor:'white' }} >
          <Left>
            <Text style={{ fontWeight:'bold' }} >Catalogue</Text>
          </Left>
          <Right>
            <CartIcon navigation={ navigation } totalCart={ this.state.totalCart } />
          </Right>
        </Header>
        <ScrollView contentContainerStyle={ styles.scroll } >
          {
            products.map(item=>{
              return  <ListProducts product={ item } key={item._id} navigation= { navigation } addToCart={ this.addToCart } />
            })
          }
        </ScrollView>
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
  content:{
    flex:1,
    borderWidth:1,
    borderColor:'#ccc',
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  scroll:{
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'stretch',
  }
})

export default compose(
  graphql(product.show),
  graphql(product.addCart)
)(Catalogue)