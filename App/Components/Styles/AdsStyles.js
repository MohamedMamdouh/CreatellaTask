import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    flex: 2,
    margin: 5,
    minWidth: Metrics.screenWidth - 10,
    height: 200,
    maxHeight: 304
  }
})
