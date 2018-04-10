import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import styles from './Styles/AdsStyles'

export default class Ads extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.container}
          source={{uri: this.props.data}}
        />
      </View>
    )
  }
}
