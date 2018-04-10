// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import RNFetchBlob from 'react-native-fetch-blob'

// our "constructor"
const create = (baseURL = 'http://localhost:3000') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
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

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getProductsWithSort = (_page, _limit, _sort) => api.get('api/products', {_page, _limit, _sort})
  const getProductsWithoutSort = (_page, _limit) => api.get('api/products', {_page, _limit})
  // const getAds = (param) => api.get(`/ads/?r=${param}`)

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
    })
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getProductsWithSort,
    getProductsWithoutSort,
    getAds
  }
}

// let's return back our create method as the default.
export default {
  create
}
