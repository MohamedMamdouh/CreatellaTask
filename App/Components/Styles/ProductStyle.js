import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 10,
    flex: 1,
    margin: 5,
    minWidth: 170,
    maxWidth: Metrics.screenWidth / 2 - 10,
    height: 200,
    maxHeight: 304,
    backgroundColor: '#FFF'
  },
  productView: {
    flex: 1,
    backgroundColor: '#4fb3bf',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  ProductDetailsView: {
    flex: 1
  }

})
