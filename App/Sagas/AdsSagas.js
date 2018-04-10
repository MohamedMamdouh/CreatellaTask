import { call, put } from 'redux-saga/effects'
import AdsActions from '../Redux/AdsRedux'

export function * getAdsData (api, action) {
  const {param} = action
  // make the call to the api
  const response = yield call(api.getAds, param)

  if (response) {
    const adsData = response
    // do data conversion here if needed
    yield put(AdsActions.adsSuccess(adsData))
  } else {
    yield put(AdsActions.adsFailure())
  }
}
