import React, { Component } from 'react'
import { View, Image } from 'react-native'
import AdsActions from '../Redux/AdsRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/AdsStyles'

class Ads extends Component {
  constructor (props) {
    super(props)
    this.state = {
      adsData: null,
    }
  }

  //Get Random number 
  //TODO: Depent the random number on date to never repeat
  getRandomAds = ()=>{
    return Math.floor(Math.random()*1000)
  }

  //Set the state with new value for component from redux store 
  componentWillReceiveProps (nextProps) {
    let {adsData, adsFetching} = nextProps
    if (!this.state.adsData && !adsFetching && this.props.adsData !== adsData) {
      this.setState({adsData})
    }
  }

  //Calling Ads Api When Component load 
  componentDidMount(){
    this.props.adsRequest(this.getRandomAds())
  }

  //The begin of Ads component Here !! 
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{uri: this.state.adsData}}
        />
      </View>
    )
  }
}

//Map Ad request to the props 
const mapDispatchToProps = dispatch => ({
  adsRequest: (param) => dispatch(AdsActions.adsRequest(param))
})

//Map Ads data and fetching state from redux store to props
const mapStateToProps = ({ads: {adsData, adsFetching}}) => {
  return {
    adsData,
    adsFetching
  }
}

export default new connect(mapStateToProps, mapDispatchToProps)(Ads)
