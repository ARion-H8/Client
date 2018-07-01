import React, { Component } from 'react';
import { StatusBar, AsyncStorage, StyleSheet, ActivityIndicator, View, FlatList, ScrollView } from 'react-native';
import { Container, Header, Content} from 'native-base';
import product from '../Graphql'
import { graphql } from 'react-apollo'
import ListProducts from '../components/ListProducts'

class Catalogue extends Component {

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
        <View style={ styles.content } >
          <ScrollView contentContainerStyle={ styles.scroll }  >
            {
              products.map(item=>{
                return  <ListProducts product={ item } key={item._id} navigation= { navigation } />
              })
            }
          </ScrollView>
        </View>
        // <Container>
        //   <Content>
        //     <FlatList
        //       data= { products }
        //       keyExtractor= { item => item._id }
        //       renderItem ={({ item }) => <ListProducts product= { item } navigation= { navigation } /> }
        //     />
        //   </Content>
        // </Container>
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

export default graphql(product.show)(Catalogue)