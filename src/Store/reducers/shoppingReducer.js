import * as actionsTypes from '../actionTypes'

const initialState = {
   allProducts: [],
   items : {},
   totalQty : 0,
   totalPrice : 0,
   loading: false
}

const loadedProduct = (oldState, data) => {
   return {
      ...oldState,
      ...data
   }
}

const addToCart = (oldState, item) => {
   let newState = { ...oldState }
   let storeItem = newState.items[item._id];
   if (!storeItem) {
      storeItem = newState.items[item._id] = { item: item, qty: 0, price: 0 };
   }
   storeItem.qty++;
   storeItem.price = storeItem.item.price * storeItem.qty;
   newState.totalQty++;
   newState.totalPrice += storeItem.item.price;
   return newState;
}

const reduceToCart = (oldState, item) => {
   let newState = { ...oldState }
   let storeItem = newState.items[item._id];
   if (storeItem.qty > 0) {
      storeItem.qty--;
      storeItem.price = storeItem.item.price * storeItem.qty;
      newState.totalQty--;
      newState.totalPrice -= storeItem.item.price;
   }
   return newState;
}

const purchaseSuccess = (state) => {
   return {
      ...state,
      items: {},
      totalQty: 0,
      totalPrice: 0,
   }
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionsTypes.LOAD_PRODUCTS: return loadedProduct(state, action.data);
      case actionsTypes.ADD_PRODUCT_TO_CART: return addToCart(state, action.product);
      case actionsTypes.REDUCE_PRODUCT_TO_CART: return reduceToCart(state, action.product);
      case actionsTypes.PURCHASE_SUCCESS: return purchaseSuccess(state)
      default: return state;
   }
}

export default reducer;