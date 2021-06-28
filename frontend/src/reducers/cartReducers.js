import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
// import { CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // Item being added //
      const item = action.payload

      // Checks to see if the item already exists. If it does, store it in constant //
      // Finds item where id of item being added matches the id of an item already in the cart //
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          // If the item exists in the cart, return the item //
          // Else return all of the cart items(Cart items will stay the same) //
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          // If it doesn't exist, add the new item to the array of items in the cart //
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // Filter out the id of whatever we remove //
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    default:
      return state
  }
}
