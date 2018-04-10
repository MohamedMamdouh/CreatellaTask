import React, { Component } from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'

import styles from './Styles/ProductStyle'

export default class Product extends Component {
  render () {
    const {price, date, size, face} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.productView}>
          <Text style={{fontSize: size}}> {face} </Text>
        </View>
        <View style={styles.ProductDetailsView}>
          <Text> Price : {price}$ </Text>
          <Text> size : {size} </Text>
          <Text> Date : {(moment().diff(moment(date), 'days') < 7) ? moment(date).fromNow() : moment(date).format('MMMM Do YYYY')}</Text>
        </View>
      </View>
    )
  }
}
