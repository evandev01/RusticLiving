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
  tableListReducer,
  tableDetailsReducer,
  tableCreateReducer,
  tableUpdateReducer,
  tableDeleteReducer,
} from './reducers/customProductReducers/tableReducers'
import {
  bedFrameListReducer,
  bedFrameDetailsReducer,
  bedFrameCreateReducer,
  bedFrameUpdateReducer,
  bedFrameDeleteReducer,
} from './reducers/customProductReducers/bedFrameReducers'
import {
  doorListReducer,
  doorDetailsReducer,
  doorCreateReducer,
  doorUpdateReducer,
  doorDeleteReducer,
} from './reducers/customProductReducers/doorReducers'
import {
  accentListReducer,
  accentDetailsReducer,
  accentCreateReducer,
  accentUpdateReducer,
  accentDeleteReducer,
} from './reducers/customProductReducers/accentReducers'
import {
  paintListReducer,
  paintDetailsReducer,
  paintCreateReducer,
  paintUpdateReducer,
  paintDeleteReducer,
} from './reducers/customProductReducers/paintReducers'
import {
  stainListReducer,
  stainDetailsReducer,
  stainCreateReducer,
  stainUpdateReducer,
  stainDeleteReducer,
} from './reducers/customProductReducers/stainReducers'
import {
  baseListReducer,
  baseDetailsReducer,
  baseCreateReducer,
  baseUpdateReducer,
  baseDeleteReducer,
} from './reducers/customProductReducers/baseReducers'
import {
  estCompListReducer,
  estCompDetailsReducer,
  estCompCreateReducer,
  estCompUpdateReducer,
  estCompDeleteReducer,
} from './reducers/customProductReducers/estCompReducers'
import { tableBuildReducer } from './reducers/customPreOrderReducers/customBuildReducers'
import {
  customPreOrderAddReducer,
  customPreOrderListReducer,
  customPreOrderDetailsReducer,
  customPreOrderUpdateReducer,
  customPreOrderDeleteReducer,
} from './reducers/customPreOrderReducers/customPreOrderReducers'

const reducer = combineReducers({
  // CUSTOM
  // Tables
  tableList: tableListReducer,
  tableDetails: tableDetailsReducer,
  tableCreate: tableCreateReducer,
  tableUpdate: tableUpdateReducer,
  tableDelete: tableDeleteReducer,
  // Bed Frame
  bedFrameList: bedFrameListReducer,
  bedFrameDetails: bedFrameDetailsReducer,
  bedFrameCreate: bedFrameCreateReducer,
  bedFrameUpdate: bedFrameUpdateReducer,
  bedFrameDelete: bedFrameDeleteReducer,
  // Door
  doorList: doorListReducer,
  doorDetails: doorDetailsReducer,
  doorCreate: doorCreateReducer,
  doorUpdate: doorUpdateReducer,
  doorDelete: doorDeleteReducer,
  // Accents
  accentList: accentListReducer,
  accentDetails: accentDetailsReducer,
  accentCreate: accentCreateReducer,
  accentUpdate: accentUpdateReducer,
  accentDelete: accentDeleteReducer,
  // Paints
  paintList: paintListReducer,
  paintDetails: paintDetailsReducer,
  paintCreate: paintCreateReducer,
  paintUpdate: paintUpdateReducer,
  paintDelete: paintDeleteReducer,
  // Stains
  stainList: stainListReducer,
  stainDetails: stainDetailsReducer,
  stainCreate: stainCreateReducer,
  stainUpdate: stainUpdateReducer,
  stainDelete: stainDeleteReducer,
  // Bases
  baseList: baseListReducer,
  baseDetails: baseDetailsReducer,
  baseCreate: baseCreateReducer,
  baseUpdate: baseUpdateReducer,
  baseDelete: baseDeleteReducer,
  // Est Completion Dates
  estCompList: estCompListReducer,
  estCompDetails: estCompDetailsReducer,
  estCompCreate: estCompCreateReducer,
  estCompUpdate: estCompUpdateReducer,
  estCompDelete: estCompDeleteReducer,
  //
  // PRE-ORDERS
  customPreOrderAdd: customPreOrderAddReducer,
  customPreOrderList: customPreOrderListReducer,
  customPreOrderDetails: customPreOrderDetailsReducer,
  customPreOrderUpdate: customPreOrderUpdateReducer,
  customPreOrderDelete: customPreOrderDeleteReducer,

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
  // CUSTOM SUBTOTAL
  tableBuild: tableBuildReducer,
})

// Gets data from local storage and parses it back from string (in actions) to JavaScript format

// BUILD OPTIONS //
const sizeFromStorage = localStorage.getItem('size')
  ? JSON.parse(localStorage.getItem('size'))
  : 'Size'

const speciesFromStorage = localStorage.getItem('species')
  ? JSON.parse(localStorage.getItem('species'))
  : {}
const speciesTotalFromStorage = localStorage.getItem('speciesTotal')
  ? JSON.parse(localStorage.getItem('speciesTotal'))
  : 0

const stainFromStorage = localStorage.getItem('stain')
  ? JSON.parse(localStorage.getItem('stain'))
  : {}
const stainTotalFromStorage = localStorage.getItem('stainTotal')
  ? JSON.parse(localStorage.getItem('stainTotal'))
  : 0

const paintFromStorage = localStorage.getItem('paint')
  ? JSON.parse(localStorage.getItem('paint'))
  : {}
const paintTotalFromStorage = localStorage.getItem('paintTotal')
  ? JSON.parse(localStorage.getItem('paintTotal'))
  : 0

const baseFromStorage = localStorage.getItem('base')
  ? JSON.parse(localStorage.getItem('base'))
  : {}
const baseTotalFromStorage = localStorage.getItem('baseTotal')
  ? JSON.parse(localStorage.getItem('baseTotal'))
  : 0

//
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
  // size: sizeFromStorage,
  tableBuild: {
    size: sizeFromStorage,
    species: speciesFromStorage,
    stain: stainFromStorage,
    speciesTotal: speciesTotalFromStorage,
    stainTotal: stainTotalFromStorage,
    paint: paintFromStorage,
    paintTotal: paintTotalFromStorage,
    base: baseFromStorage,
    baseTotal: baseTotalFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
