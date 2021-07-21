import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'
import {
  customProductListReducer,
  customProductDetailsReducer,
  customProductUpdateReducer,
  customProductCreateReducer,
  customProductDeleteReducer,
} from './reducers/customProductReducers'
import {
  customAccentDetailsReducer,
  customAccentListReducer,
  customAccentCreateReducer,
  customAccentUpdateReducer,
  customAccentDeleteReducer,
} from './reducers/customAccentReducers'
import {
  customBaseListReducer,
  customBaseDetailsReducer,
  customBaseCreateReducer,
  customBaseUpdateReducer,
  customBaseDeleteReducer,
} from './reducers/customBaseReducers'
import {
  customPaintListReducer,
  customPaintDetailsReducer,
  customPaintCreateReducer,
  customPaintUpdateReducer,
  customPaintDeleteReducer,
} from './reducers/customPaintReducers'
import {
  customSpeciesListReducer,
  customSpeciesDetailsReducer,
  customSpeciesCreateReducer,
  customSpeciesUpdateReducer,
  customSpeciesDeleteReducer,
} from './reducers/customSpeciesReducers'
import {
  customStainListReducer,
  customStainDetailsReducer,
  customStainCreateReducer,
  customStainUpdateReducer,
  customStainDeleteReducer,
} from './reducers/customStainReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'
import {
  tablePriceListReducer,
  tablePriceDetailsReducer,
  tablePriceCreateReducer,
  tablePriceUpdateReducer,
  tablePriceDeleteReducer,
} from './reducers/priceReducers/tablePriceReducers'
import {
  bedFramePriceListReducer,
  bedFramePriceDetailsReducer,
  bedFramePriceCreateReducer,
  bedFramePriceUpdateReducer,
  bedFramePriceDeleteReducer,
} from './reducers/priceReducers/bedFramePriceReducers'
import {
  doorPriceListReducer,
  doorPriceDetailsReducer,
  doorPriceCreateReducer,
  doorPriceUpdateReducer,
  doorPriceDeleteReducer,
} from './reducers/priceReducers/doorPriceReducers'
import {
  accentPriceListReducer,
  accentPriceDetailsReducer,
  accentPriceCreateReducer,
  accentPriceUpdateReducer,
  accentPriceDeleteReducer,
} from './reducers/priceReducers/accentPriceReducers'
import {
  paintPriceListReducer,
  paintPriceDetailsReducer,
  paintPriceCreateReducer,
  paintPriceUpdateReducer,
  paintPriceDeleteReducer,
} from './reducers/priceReducers/paintPriceReducers'
import {
  stainPriceListReducer,
  stainPriceDetailsReducer,
  stainPriceCreateReducer,
  stainPriceUpdateReducer,
  stainPriceDeleteReducer,
} from './reducers/priceReducers/stainPriceReducers'

const reducer = combineReducers({
  // CUSTOM PRICES
  // Table
  tablePriceList: tablePriceListReducer,
  tablePriceDetails: tablePriceDetailsReducer,
  tablePriceCreate: tablePriceCreateReducer,
  tablePriceUpdate: tablePriceUpdateReducer,
  tablePriceDelete: tablePriceDeleteReducer,
  // Bed Frame
  bedFramePriceList: bedFramePriceListReducer,
  bedFramePriceDetails: bedFramePriceDetailsReducer,
  bedFramePriceCreate: bedFramePriceCreateReducer,
  bedFramePriceUpdate: bedFramePriceUpdateReducer,
  bedFramePriceDelete: bedFramePriceDeleteReducer,
  // Door
  doorPriceList: doorPriceListReducer,
  doorPriceDetails: doorPriceDetailsReducer,
  doorPriceCreate: doorPriceCreateReducer,
  doorPriceUpdate: doorPriceUpdateReducer,
  doorPriceDelete: doorPriceDeleteReducer,
  // Accent
  accentPriceList: accentPriceListReducer,
  accentPriceDetails: accentPriceDetailsReducer,
  accentPriceCreate: accentPriceCreateReducer,
  accentPriceUpdate: accentPriceUpdateReducer,
  accentPriceDelete: accentPriceDeleteReducer,
  // Paint
  paintPriceList: paintPriceListReducer,
  paintPriceDetails: paintPriceDetailsReducer,
  paintPriceCreate: paintPriceCreateReducer,
  paintPriceUpdate: paintPriceUpdateReducer,
  paintPriceDelete: paintPriceDeleteReducer,
  // Stain
  stainPriceList: stainPriceListReducer,
  stainPriceDetails: stainPriceDetailsReducer,
  stainPriceCreate: stainPriceCreateReducer,
  stainPriceUpdate: stainPriceUpdateReducer,
  stainPriceDelete: stainPriceDeleteReducer,
  // CUSTOM PRODUCTS
  customProductList: customProductListReducer,
  customProductDetails: customProductDetailsReducer,
  customProductCreate: customProductCreateReducer,
  customProductUpdate: customProductUpdateReducer,
  customProductDelete: customProductDeleteReducer,
  // CUSTOM ACCENTS
  customAccentList: customAccentListReducer,
  customAccentDetails: customAccentDetailsReducer,
  customAccentCreate: customAccentCreateReducer,
  customAccentUpdate: customAccentUpdateReducer,
  customAccentDelete: customAccentDeleteReducer,
  // CUSTOM BASES
  customBaseList: customBaseListReducer,
  customBaseDetails: customBaseDetailsReducer,
  customBaseCreate: customBaseCreateReducer,
  customBaseUpdate: customBaseUpdateReducer,
  customBaseDelete: customBaseDeleteReducer,
  // CUSTOM PAINTS
  customPaintList: customPaintListReducer,
  customPaintDetails: customPaintDetailsReducer,
  customPaintCreate: customPaintCreateReducer,
  customPaintUpdate: customPaintUpdateReducer,
  customPaintDelete: customPaintDeleteReducer,
  // CUSTOM SPECIES
  customSpeciesList: customSpeciesListReducer,
  customSpeciesDetails: customSpeciesDetailsReducer,
  customSpeciesCreate: customSpeciesCreateReducer,
  customSpeciesUpdate: customSpeciesUpdateReducer,
  customSpeciesDelete: customSpeciesDeleteReducer,
  // CUSTOM STAINS
  customStainList: customStainListReducer,
  customStainDetails: customStainDetailsReducer,
  customStainCreate: customStainCreateReducer,
  customStainUpdate: customStainUpdateReducer,
  customStainDelete: customStainDeleteReducer,
  // PRODUCTS
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  // CART
  cart: cartReducer,
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  // ORDER
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

// Gets data from local storage and parses it back from string(in actions) to JavaScript format

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

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
