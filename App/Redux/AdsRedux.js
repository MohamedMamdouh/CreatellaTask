import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  adsRequest: ['param'],
  adsSuccess: ['adsData'],
  adsFailure: null
})

export const AdsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  adsData: null,
  adsFetching: null,
  error: null
})

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

// request the Initial Ads
export const request = (state, {param}) =>
  state.merge({adsFetching: true})

// successful Ad lookup
export const success = (state, action) => {
  const { adsData } = action
  return state.merge({ adsFetching: false, error: null, adsData })
}

// failed to get the Ad
export const failure = (state) =>
  state.merge({ adsFetching: false, error: true, adsData: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADS_REQUEST]: request,
  [Types.ADS_SUCCESS]: success,
  [Types.ADS_FAILURE]: failure
})
