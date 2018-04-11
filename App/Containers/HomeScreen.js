import React, { Component } from 'react'
import {Text, FlatList, View, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import PrductsActions from '../Redux/ProductsRedux'
import Product from '../Components/Product'
import Ads from '../Components/Ads'

// Styles
import styles from './Styles/HomeScreenStyles'

//TODO: Error Handling

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productsInitialData:[],
      page: 1,
      sort: null,
      limit:15,
      sort:undefined,
    }
  }

  // This to Render Items of Products and also make decision for rendering Products or Ads
  _renderItem = ({item:{price, date, size, face},index}) => {
    if((index !== 0) && index % 20 === 0){
      return <Ads />
    }
    else{
      return <Product price={price} date={date} size={size} face={face}/>
    }}
      
  // Extract Keys for List Item
  _keyExtractor = (item, index) => item.id;

  //First Call of Product API after component mount
  componentDidMount(){
    let {page,limit,sort} = this.state
    this.props.productRequest(page,limit,sort)
  }

  //Load more to prefetch date before the end of list beside load more 
  _handleLoadMore = () => {
    if(!this.props.fetching){
      let page = this.state.page + 1
      this.setState({
        page
      })
      this.props.productRequest(page,this.state.limit,this.state.sort)
    }
  }

  //Append new products to the list 
  //Display message for '~ end of catalogue ~' if no products found
  componentWillReceiveProps(nextProps){
    let {productsInitialData,fetching} = nextProps
    if(!fetching && this.props.productsInitialData !== productsInitialData){
      productsInitialData.length > 0  ? this.setState({productsInitialData:[...this.state.productsInitialData,...productsInitialData]}) : alert('~ end of catalogue ~')
    }
  }

  //Handling sort and also canceling sort
  _handleSort = (_sort) =>{
    if(this.state._sort !== _sort) {
      this.setState({
        productsInitialData : [],
        page: 1,
        sort : _sort
      })
      this.props.productRequest(1,this.state.limit,_sort)
    }
  }

  //Sparated Component for the header 
  _headerComponent = () => {
    return(<View style={styles.header}>
      <TouchableOpacity 
        onPress =  {()=>this._handleSort("price")}
        style={[styles.buttons,this.state.sort === "price"?{backgroundColor:'#4fb3bf'}:null]}
        >
        <Text>Price</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress =  {()=>this._handleSort("size")}
        style={[styles.buttons,this.state.sort === "size"?{backgroundColor:'#4fb3bf'}:null]}>
        <Text>Size</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress =  {()=>this._handleSort("id")}
        style={[styles.buttons,this.state.sort === "id"?{backgroundColor:'#4fb3bf'}:null]}>
        <Text>Id</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress =  {()=>this._handleSort(null)}
        style={[styles.buttons,!this.state.sort?{backgroundColor:'#4fb3bf'}:null]}>
        <Text>None</Text>
      </TouchableOpacity>
    </View>
  )}

  //Render function and Container Started Here!! 
  render () {
    if (this.state.productsInitialData.length) {
      return (
        <View style={styles.container}>
          {this._headerComponent()}
          <FlatList
            data={this.state.productsInitialData}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={styles.contentContainer}
            onEndReached={this._handleLoadMore}
            numColumns={2}
          />
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
        <ActivityIndicator size="large"/>
        <Text>Loading...</Text>
      </View>
      )
    }
  }
}

//Map Product Request function to props
const mapDispatchToProps = dispatch => ({
  productRequest: (_page, _limit, _sort) => dispatch(PrductsActions.productRequest(_page, _limit, _sort)),
})

//Get Product Data and fetching state from redux store state
const mapStateToProps = ({products: {productsInitialData, fetching}}) => {
  return {
    productsInitialData,
    fetching,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
