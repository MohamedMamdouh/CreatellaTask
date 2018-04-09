import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import PrductsActions from '../Redux/ProductsRedux'
import Product from '../Components/Product'
import { Images } from '../Themes'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productsInitialData:{}
    }
  }

  _renderItem = ({item:{price, date, size, face},index}) => (
    ((index + 1) % 5) === 0 ? <View style={{backgroundColor:'red',width:500,height:30,flex:1}}></View>:<Product price={price} date={date} size={size} face={face}/>)

  _keyExtractor = (item, index) => item.id;

  componentDidMount(){
    this.props.productRequest()
  }
  
  render () {
    if (this.props.productsInitialData) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.productsInitialData}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={styles.contentContainer}
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
  productRequest: () => dispatch(PrductsActions.productRequest())
})

const mapStateToProps = ({products: {productsInitialData}}) => {
  console.log(productsInitialData)
  return {
    productsInitialData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
