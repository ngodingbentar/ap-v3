import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_BAYAR_FAIL,
  ORDER_BAYAR_REQUEST,
  ORDER_BAYAR_SUCCESS,
  ORDER_CITY_FAIL,
  ORDER_CITY_REQUEST,
  ORDER_CITY_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
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
  ORDER_ONGKIR_POS_FAIL,
  ORDER_ONGKIR_POS_REQUEST,
  ORDER_ONGKIR_POS_SUCCESS,
  ORDER_ONGKIR_REQUEST,
  ORDER_ONGKIR_SUCCESS,
  ORDER_ONGKIR_TIKI_FAIL,
  ORDER_ONGKIR_TIKI_REQUEST,
  ORDER_ONGKIR_TIKI_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PROVINCE_FAIL,
  ORDER_PROVINCE_REQUEST,
  ORDER_PROVINCE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
} from '../constants/orderConstants';

export const listCity = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_CITY_REQUEST });
  try {
    const { data } = await Axios.get('/api/orders/city');
    dispatch({ type: ORDER_CITY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_CITY_FAIL, payload: message });
  }
};

export const biayaOngkir = (ongkirId, weight) => async (dispatch, getState) => {
  dispatch({ type: ORDER_ONGKIR_REQUEST });
  try {
    const { data } = await Axios.get(`/api/orders/ongkir/${ongkirId}/${weight}`);
    dispatch({ type: ORDER_ONGKIR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ONGKIR_FAIL, payload: message });
  }
};

export const biayaOngkirPos = (ongkirId, weight) => async (dispatch, getState) => {
  dispatch({ type: ORDER_ONGKIR_POS_REQUEST });
  try {
    const { data } = await Axios.get(`/api/orders/ongkir/pos/${ongkirId}/${weight}`);
    dispatch({ type: ORDER_ONGKIR_POS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ONGKIR_POS_FAIL, payload: message });
  }
};

export const biayaOngkirTiki = (ongkirId, weight) => async (dispatch, getState) => {
  dispatch({ type: ORDER_ONGKIR_TIKI_REQUEST });
  try {
    const { data } = await Axios.get(`/api/orders/ongkir/tiki/${ongkirId}/${weight}`);
    dispatch({ type: ORDER_ONGKIR_TIKI_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ONGKIR_TIKI_FAIL, payload: message });
  }
};

export const cekResi = (awb, ekspedisi) => async (dispatch, getState) => {
  console.log(awb)
  // dispatch({ type: ORDER_ONGKIR_REQUEST });
  // try {
  //   const { data } = await Axios.get(`/api/orders/cekresi/${awb}/${ekspedisi}`);
  //   dispatch({ type: ORDER_ONGKIR_SUCCESS, payload: data });
  // } catch (error) {
  //   const message =
  //     error.response && error.response.data.message
  //       ? error.response.data.message
  //       : error.message;
  //   dispatch({ type: ORDER_ONGKIR_FAIL, payload: message });
  // }
};

export const listCityId = (provId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CITY_REQUEST });
  try {
    const { data } = await Axios.get(`/api/orders/city/${provId}`);
    dispatch({ type: ORDER_CITY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_CITY_FAIL, payload: message });
  }
};

export const listProvince = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_PROVINCE_REQUEST });
  try {
    const { data } = await Axios.get('/api/orders/province');
    dispatch({ type: ORDER_PROVINCE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PROVINCE_FAIL, payload: message });
  }
};


export const createOrder = (order) => async (dispatch, getState) => {
  // console.log(order)
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const confirmOrder = (confirm) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_REQUEST, payload: confirm });
  const {
    userSignin: { userInfo },
  } = getState(); //userSignin diambil dari redux store, getState pertanda redux
  try {
    const { data } = await Axios.put(`/api/orders/${confirm.orderId}`, confirm, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_UPDATE_FAIL, payload: message });
  }
};

export const resiOrder = (resi) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_REQUEST, payload: resi });
  const {
    userSignin: { userInfo },
  } = getState(); //userSignin diambil dari redux store, getState pertanda redux
  try {
    const { data } = await Axios.put(`/api/orders/${resi.orderId}`, resi, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_UPDATE_FAIL, payload: message });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState(); //userSignin diambil dari redux store, getState pertanda redux
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  console.log('orderId', orderId)
  // dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  // try {
  //   const { data } = Axios.delete(`/api/orders/${orderId}`, {
  //     headers: { Authorization: `Bearer ${userInfo.token}` },
  //   });
  //   dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  // } catch (error) {
  //   const message =
  //     error.response && error.response.data.message
  //       ? error.response.data.message
  //       : error.message;
  //   dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  // }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const bayar = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_BAYAR_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/pay`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    console.log('bayar',data)
    dispatch({ type: ORDER_BAYAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_BAYAR_FAIL, payload: message });
  }
};