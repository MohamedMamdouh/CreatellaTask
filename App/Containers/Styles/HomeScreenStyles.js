import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#cfd8dc'
  },
  contentContainer: {
    width: Metrics.screenWidth
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: Metrics.screenWidth
  },
  buttons: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
