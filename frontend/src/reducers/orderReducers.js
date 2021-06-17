import {
  ORDER_BAYAR_FAIL,
  ORDER_BAYAR_REQUEST,
  ORDER_BAYAR_RESET,
  ORDER_BAYAR_SUCCESS,
  ORDER_CITY_FAIL,
  ORDER_CITY_REQUEST,
  ORDER_CITY_RESET,
  ORDER_CITY_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_ONGKIR_FAIL,
  ORDER_ONGKIR_REQUEST,
  ORDER_ONGKIR_RESET,
  ORDER_ONGKIR_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_PROVINCE_FAIL,
  ORDER_PROVINCE_REQUEST,
  ORDER_PROVINCE_RESET,
  ORDER_PROVINCE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_RESET,
  ORDER_ONGKIR_POS_REQUEST,
  ORDER_ONGKIR_POS_SUCCESS,
  ORDER_ONGKIR_POS_FAIL,
  ORDER_ONGKIR_POS_RESET,
  ORDER_ONGKIR_TIKI_REQUEST,
  ORDER_ONGKIR_TIKI_SUCCESS,
  ORDER_ONGKIR_TIKI_FAIL,
  ORDER_ONGKIR_TIKI_RESET,
} from '../constants/orderConstants';

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const bayarReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_BAYAR_REQUEST:
      return { loading: true };
    case ORDER_BAYAR_SUCCESS:
      return { loading: false, success: true };
    case ORDER_BAYAR_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_BAYAR_RESET:
      return {};
    default:
      return state;
  }
};

// export const cityReducer = (state = {}, action) => {
export const cityReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_CITY_REQUEST:
      return { loading: true };
    case ORDER_CITY_SUCCESS:
      return { loading: false, success: false, cities: action.payload };
    case ORDER_CITY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CITY_RESET:
      return {};
    default:
      return state;
  }
};

export const provinceReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_PROVINCE_REQUEST:
      return { loading: true };
    case ORDER_PROVINCE_SUCCESS:
      return { loading: false, success: false, provincies: action.payload };
    case ORDER_PROVINCE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PROVINCE_RESET:
      return {};
    default:
      return state;
  }
};

export const ongkirReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ONGKIR_REQUEST:
      return { loading: true };
    case ORDER_ONGKIR_SUCCESS:
      return { loading: false, success: false, ongkir: action.payload };
    case ORDER_ONGKIR_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ONGKIR_RESET:
      return {};
    default:
      return state;
  }
};

export const ongkirPosReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ONGKIR_POS_REQUEST:
      return { loading: true };
    case ORDER_ONGKIR_POS_SUCCESS:
      return { loading: false, success: false, ongkirPos: action.payload };
    case ORDER_ONGKIR_POS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ONGKIR_POS_RESET:
      return {};
    default:
      return state;
  }
};

export const ongkirTikiReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ONGKIR_TIKI_REQUEST:
      return { loading: true };
    case ORDER_ONGKIR_TIKI_SUCCESS:
      return { loading: false, success: false, ongkirTiki: action.payload };
    case ORDER_ONGKIR_TIKI_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ONGKIR_TIKI_RESET:
      return {};
    default:
      return state;
  }
};
export const orderListReducer2 = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};