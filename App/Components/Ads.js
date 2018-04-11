import React, { Component } from 'react'
import { View, Image } from 'react-native'
import AdsActions from '../Redux/AdsRedux'
import { connect } from 'react-redux'

import styles from './Styles/AdsStyles'

class Ads extends Component {
  constructor (props) {
    super(props)
    this.state = {
      adsData: null,
    }
  }

  getRandomAds = ()=>{
    return Math.floor(Math.random()*100)
  }

  componentWillReceiveProps (nextProps) {
    let {adsData, adsFetching} = nextProps
    if (!this.state.adsData && !adsFetching && this.props.adsData !== adsData) {
      this.setState({adsData})
    }
  }

  componentDidMount(){
    this.props.adsRequest(this.getRandomAds())
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.container}
          source={{uri: this.state.adsData}}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  adsRequest: (param) => dispatch(AdsActions.adsRequest(param))
})

const mapStateToProps = ({ads: {adsData, adsFetching}}) => {
  return {
    adsData,
    adsFetching
  }
}

export default new connect(mapStateToProps, mapDispatchToProps)(Ads)
