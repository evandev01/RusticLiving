import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

// Gets items from local storage and parses them back from string(in cartActions) to JavaScript format
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// Gets user info from local storage and parses them back from string(in userActions) to JavaScript format
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// Gets shipping address from local storage and parses them back from string(in userActions) to JavaScript format
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

// Gets payment method from local storage and parses them back from string(in userActions) to JavaScript format
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
