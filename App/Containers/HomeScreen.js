import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet, TouchableOpacity} from 'react-native'
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
      let adNum = this.state.adNum + 1
      this.props.adsRequest(this.getRandomAds())
      this.setState({adNum})
      console.log(this.state.adNum - 1)
      return <Ads data = {this.state.adsData[this.state.adNum - 1]}></Ads>}
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
    if(!adsFetching && this.props.adsData !== adsData){
      adsData ? this.setState({adsData:[...this.state.adsData,adsData]}) : null      
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
    console.log(this.state)
    if (this.state.productsInitialData.length) {
      return (
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress =  {()=>this._handleSort("price")}>
              <Text>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress =  {()=>this._handleSort("size")}>
              <Text>size</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress =  {()=>this._handleSort("id")}>
              <Text>id</Text>
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
        <View><Text>Waitiing</Text></View>
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
