import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    flex: 2,
    margin: 5,
    minWidth: Metrics.screenWidth - 10,
    height: 200,
    maxHeight: 304,
    padding: 5
  },
  img: {
    borderRadius: 10,
    flex: 2,
    margin: 1,
    height: 200,
    maxHeight: 304
  }
})
