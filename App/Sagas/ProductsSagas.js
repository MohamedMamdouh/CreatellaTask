import { call, put } from 'redux-saga/effects'
import PrductsActions from '../Redux/ProductsRedux'

export function * getProductsData (api, action) {
  const { _page, _limit, _sort } = action
  // make the call to the api
  const response = _sort ? yield call(api.getProductsWithSort, _page, _limit, _sort) : yield call(api.getProductsWithoutSort, _page, _limit)

  if (response.ok) {
    const productsInitialData = response.data

    // do data conversion here if needed
    yield put(PrductsActions.productSuccess(productsInitialData))
  } else {
    yield put(PrductsActions.productFailure())
  }
}
