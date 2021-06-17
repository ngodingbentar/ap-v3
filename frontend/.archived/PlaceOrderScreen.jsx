import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { biayaOngkir, createOrder } from '../actions/orderActions';
// import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Col } from 'reactstrap';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const [kurir, setKurir] = useState([]);
  const [courier, setCourier] = useState();
  const [loadingBiaya, setLoadingBiaya] = useState(true);

  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;


  const ongkirku = useSelector((state) => state.ongkirku);
  const { ongkir } = ongkirku;
  
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.totalWeight = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.weight, 0)
  );

  const [biaya, setBiaya] = useState(0);
  const [biayaAlert, setBiayaAlert] = useState(false);

  cart.shippingPrice = biaya ;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  cart.courier = courier
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    if(biaya){
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    } else {
      setBiayaAlert(true)
    }

  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if(cart && loadingBiaya){
      dispatch(biayaOngkir(cart.shippingAddress.cityId, cart.totalWeight))
      setLoadingBiaya(false)
    }
    if(ongkir){
      setKurir(ongkir?.rajaongkir?.results[0]?.costs)
    }
  }, [cart, dispatch, kurir, loadingBiaya, order, ongkir, props.history, success]);

  const wadudu = (x) => {
    setBiaya(x.cost[0].value)
    setCourier(x.service)
  }

  return (
    <div>
      {/* <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> */}
      <div className="row top">
        <Col xs="8">
        <div className="acol2-2">
          <ul>
            <li>
              <div className="card card-body">
                <h4>Kurir : JNE</h4>
                {biayaAlert && (
                  <MessageBox variant="danger">Anda belum memilih kurir</MessageBox>
                )}
                {/* <hr/> */}
                {kurir && (
                <div>
                  {kurir.map((x, index) => (
                    <span key={index} className="rdb-kurir">
                      <input required className="rdb-kurir" type="radio" id={x.service} name="gender" onClick={() => wadudu(x)} />
                      <label>{x.service} : {new Intl.NumberFormat('ID').format(x.cost[0].value)}</label>
                    </span>
                  ))}
                </div>
              )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h4>Pengiriman</h4>
                {/* <hr/> */}
                <p>
                  <strong>Nama :</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Alamat : </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.province}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h4>Pembayaran</h4>
                {/* <hr/> */}
                <p>
                  <strong>Bank:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h4>Produk</h4>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product} className="flexCol">
                      <Col xs="8" className="flexCol">
                        <Col xs="3">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                        </Col>
                      </Col>
                      <Col xs="4">
                        <ul>
                          <li>
                            {item.qty} x Rp. {new Intl.NumberFormat('ID').format(item.price)} = Rp. {item.qty * new Intl.NumberFormat('ID').format(item.price)}{}
                          </li>
                          <li>
                            {item.qty} x {item.weight} gram = {item.qty * item.weight} gram
                          </li>
                        </ul>
                      </Col>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        </Col>
        <Col xs="4">
        <div>
          <div className="card order-summary">
            <ul>
              <li>
                <h2>Ringkasan</h2>
              </li>
              <li>
                <div className="row-order">
                  <div>Produk</div>
                  <div>Rp. {new Intl.NumberFormat('ID').format(cart.itemsPrice)}</div>
                </div>
              </li>
              <li>
                <div className="row-order">
                  <div>Biaya Kirim</div>
                  <div>Rp. {new Intl.NumberFormat('ID').format(cart.shippingPrice)}</div>
                </div>
              </li>
              <li>
                <div className="row-order">
                  <div>Berat</div>
                  <div>{cart.totalWeight} gram / {cart.totalWeight / 1000} kg</div>
                </div>
              </li>
              <li>
                <div className="row-order">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>Rp. {new Intl.NumberFormat('ID').format(cart.totalPrice)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="clr-secondary block text-white"
                  disabled={cart.cartItems.length === 0}
                >
                  Buat Pesanan
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
        </Col>
      </div>
    </div>
  );
}
