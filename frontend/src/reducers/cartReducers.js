import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
// import { CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      ////////////////////////// TAKE NOTES FIRST THING //////////////////////
      ////////////////////////// TAKE NOTES FIRST THING //////////////////////
      ////////////////////////// TAKE NOTES FIRST THING //////////////////////
      ////////////////////////// TAKE NOTES FIRST THING //////////////////////
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // Filter out the id of whatever we remove
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      }
    default:
      return state
  }
}
