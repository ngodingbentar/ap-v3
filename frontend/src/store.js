import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  bayarReducer,
  cityReducer,
  ongkirPosReducer,
  ongkirReducer,
  ongkirTikiReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderUpdateReducer,
  provinceReducer
} from './reducers/orderReducers'
import {
  productAllListReducer,
  productCategoryListReducer,
  productCreateNewReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productPacketReducer,
  productRecomendationReducer,
  productUpdateReducer
} from './reducers/productReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from './reducers/userReducers'
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer } from './reducers/categoryReducers'

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) :
    null
  },
  cart: {
    cartItems:
      localStorage.getItem('cartItems') ?
      JSON.parse(localStorage.getItem('cartItems')) :
      [],
    shippingAddress:
      localStorage.getItem('shippingAddress') ?
      JSON.parse(localStorage.getItem('shippingAddress')) :
      {},
  }
}
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  allProduct: productAllListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productRecomendation: productRecomendationReducer,
  productPacket: productPacketReducer,
  productCreateNew: productCreateNewReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  orderBayar: bayarReducer,
  orderUpdate: orderUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productCategoryList: productCategoryListReducer,
  cityList: cityReducer,
  provinceList: provinceReducer,
  ongkirku: ongkirReducer,
  ongkirkuPos: ongkirPosReducer,
  ongkirkuTiki: ongkirTikiReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer

})
const composeEnhancher = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancher(applyMiddleware(thunk))
)

export default store