import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import PrductsActions from '../Redux/ProductsRedux'
import AdsActions from '../Redux/AdsRedux'
import Product from '../Components/Product'
import Ads from '../Components/Ads'
import { Images } from '../Themes'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productsInitialData:[],
      adsData:[],
      page: 1,
      sort: null,
      limit:15,
      sort:undefined,
      adNum: 0 
    }
  }

  getRandomAds = ()=>{
    return Math.floor(Math.random()*100)
  }

  _renderItem = ({item:{price, date, size, face},index}) => {
    if((index !== 0) && index % 20 === 0){
      return <Ads data = {this.state.adsData[this.state.page]}></Ads>
    }
      else{
        return <Product price={price} date={date} size={size} face={face}/>
      }}
      
    _keyExtractor = (item, index) => item.id;

  componentDidMount(){
    let {page,limit,sort} = this.state
    this.props.productRequest(page,limit,sort)
    this.props.adsRequest(this.getRandomAds())
  }

  _handleLoadMore = () => {
    if(!this.props.fetching){
      let page = this.state.page + 1
      this.setState({
        page
      })
      this.props.productRequest(page,this.state.limit,this.state.sort)
    }
  }

  componentWillReceiveProps(nextProps){
    let {productsInitialData,fetching,adsData,adsFetching} = nextProps
    if(!fetching && this.props.productsInitialData !== productsInitialData){
      productsInitialData ? this.setState({productsInitialData:[...this.state.productsInitialData,...productsInitialData]}) : null
    }
    if(!adsFetching && this.props.adsData !== adsData && (this.state.adsData.length < 16)){
      adsData ? this.setState({adsData:[...this.state.adsData,adsData]}) : null
      this.props.adsRequest(this.getRandomAds())      
    }
  }

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

  render () {
    if (this.state.productsInitialData.length) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress =  {()=>this._handleSort("price")}
              style={styles.buttons}
              >
              <Text>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress =  {()=>this._handleSort("size")}
              style={styles.buttons}>
              <Text>Size</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress =  {()=>this._handleSort("id")}
              style={styles.buttons}>
              <Text>Id</Text>
            </TouchableOpacity>
          </View>
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
    } else {
      return (
        <View style={styles.container}>
        <ActivityIndicator size="large"/>
        <Text>Loading...</Text>
      </View>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  productRequest: (_page, _limit, _sort) => dispatch(PrductsActions.productRequest(_page, _limit, _sort)),
  adsRequest: (param) => dispatch(AdsActions.adsRequest(param))
})

const mapStateToProps = ({products: {productsInitialData, fetching},ads:{adsData,adsFetching}}) => {
  return {
    productsInitialData,
    fetching,
    adsData,
    adsFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
