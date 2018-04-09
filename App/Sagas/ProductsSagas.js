import { call, put } from 'redux-saga/effects'
import PrductsActions from '../Redux/ProductsRedux'

export function * getProductsData (api, action) {
//   const { sort } = action
  // make the call to the api
  console.log(api)
  const _limit = 15
  const response = yield call(api.getProducts, _limit)

  if (response.ok) {
    const productsInitialData = response.data

    // do data conversion here if needed
    yield put(PrductsActions.productSuccess(productsInitialData))
  } else {
    yield put(PrductsActions.productFailure())
  }
}
