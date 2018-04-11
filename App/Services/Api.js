// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import RNFetchBlob from 'react-native-fetch-blob'

// our "constructor"
const create = (baseURL = 'http://localhost:3000') => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'v1'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Get Some data from APIs
  const getProductsWithSort = (_page, _limit, _sort) => api.get('api/products', {_page, _limit, _sort})
  const getProductsWithoutSort = (_page, _limit) => api.get('api/products', {_page, _limit})

  const getAds = (param) => {
    return new Promise((resolve, reject) => {
      // Fetch attachment
      RNFetchBlob.fetch('GET', `http://localhost:3000/ads/r=${param}`)
        .then((response) => {
          let base64Str = response.data
          var imageBase64 = 'data:image/png' + ';base64,' + base64Str
          // Return base64 image
          resolve(imageBase64)
        })
    }).catch((error) => {
      // error handling
      console.log('Error: ', error)
      throw error
    })
  }
  return {
    // a list of the API functions
    getProductsWithSort,
    getProductsWithoutSort,
    getAds
  }
}

// let's return back our create method as the default.
export default {
  create
}
