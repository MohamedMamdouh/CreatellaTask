import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    margin: 5,
    minWidth: 170,
    maxWidth: 223,
    height: 200,
    maxHeight: 304
  },
  productView: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  ProductDetailsView: {
    flex: 1
  }

})
