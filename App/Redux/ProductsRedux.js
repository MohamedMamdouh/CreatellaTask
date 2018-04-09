import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: null,
  productSuccess: ['productsInitialData'],
  productFailure: null
})

export const ProductsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  productsInitialData: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

// request the Initial Products
export const request = (state) =>
  state.merge({fetching: true})

// successful Initial Products lookup
export const success = (state, action) => {
  const { productsInitialData } = action
  return state.merge({ fetching: false, error: null, productsInitialData })
}

// failed to get the Initial Products
export const failure = (state) =>
  state.merge({ fetching: false, error: true, productsInitialData: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_FAILURE]: failure
})
