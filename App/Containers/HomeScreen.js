import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet, TouchableOpacity,ActivityIndicator,Modal,TouchableHighlight} from 'react-native'
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
      page: 1,
      sort: null,
      limit:15,
      sort:undefined,
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderItem = ({item:{price, date, size, face},index}) => {
    if((index !== 0) && index % 20 === 0){
      return <Ads />
    }
    else{
      return <Product price={price} date={date} size={size} face={face}/>
    }}
      
  _keyExtractor = (item, index) => item.id;

  componentDidMount(){
    let {page,limit,sort} = this.state
    this.props.productRequest(page,limit,sort)
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
      productsInitialData.length > 0  ? this.setState({productsInitialData:[...this.state.productsInitialData,...productsInitialData]}) : this.setState({modalVisible:true})
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
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>~ end of catalogue ~</Text>
  
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
  
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
})

const mapStateToProps = ({products: {productsInitialData, fetching},ads:{adsData,adsFetching}}) => {
  return {
    productsInitialData,
    fetching,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
