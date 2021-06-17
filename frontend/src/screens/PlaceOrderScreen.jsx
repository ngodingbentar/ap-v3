import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { biayaOngkir, biayaOngkirPos, biayaOngkirTiki, createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Col } from 'reactstrap';

export default function PlaceOrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const cart = useSelector((state) => state.cart);
  const [kurir, setKurir] = useState([]);
  const [kurirPos, setKurirPos] = useState([]);
  const [kurirTiki, setKurirTiki] = useState([]);
  const [courier, setCourier] = useState();
  const [courierName, setCourierName] = useState();
  const [loadingBiaya, setLoadingBiaya] = useState(true);

  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;


  const ongkirku = useSelector((state) => state.ongkirku);
  const { ongkir } = ongkirku;
  const ongkirkuPos = useSelector((state) => state.ongkirkuPos);
  const { ongkirPos } = ongkirkuPos;
  const ongkirkuTiki = useSelector((state) => state.ongkirkuTiki);
  const { ongkirTiki } = ongkirkuTiki;
  
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
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.shippingAddress.uniqueCode;
  cart.courier = courier
  cart.uniqueCode = cart.shippingAddress.uniqueCode
  cart.phone = cart.shippingAddress.phone
  cart.courierName = courierName
  cart.status = 'Menunggu Pembayaran'
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    if(biaya){
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    } else {
      setBiayaAlert(true)
    }

  };

  const myCourier = (x, y) => {
    setCourierName(y)
    setBiaya(x.cost[0].value)
    setCourier(x.service)
  }

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if(cart && loadingBiaya){
      dispatch(biayaOngkir(cart.shippingAddress.cityId, cart.totalWeight))
      dispatch(biayaOngkirPos(cart.shippingAddress.cityId, cart.totalWeight))
      dispatch(biayaOngkirTiki(cart.shippingAddress.cityId, cart.totalWeight))
      setLoadingBiaya(false)
    }
    if(ongkir){
      setKurir(ongkir?.rajaongkir?.results[0]?.costs)
    }
    if(ongkirPos){
      setKurirPos(ongkirPos?.rajaongkir?.results[0]?.costs)
    }
    if(ongkirTiki){
      setKurirTiki(ongkirTiki?.rajaongkir?.results[0]?.costs)
    }
  }, [cart, dispatch, kurir, loadingBiaya, order, ongkir, ongkirPos, ongkirTiki, props.history, success]);
  

  const cek = () => {
    console.log(userInfo)
  }

  
  return (
    <div>
      <div className="row top">
        <Col>
        <div className="acol2-2">
          <ul>
            <li>
              <div className="card card-body">
                <button onClick={() => console.log(cart)}>cek</button>
                <h3>Kurir</h3>
                {biayaAlert && (
                  <MessageBox variant="danger">Anda belum memilih kurir</MessageBox>
                )}
                {kurir && (
                  <>
                    <div>
                      <h5>JNE</h5>
                      {kurir.map((x, index) => (
                        <div key={index} className="rdb-kurir">
                          <input required className="rdb-kurir" type="radio" id={x.service} name="gender" onClick={() => myCourier(x, 'JNE')} />
                          <label>{x.service} : {new Intl.NumberFormat('ID').format(x.cost[0].value)}</label>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h5>POS</h5>
                      {kurirPos.map((x, index) => (
                        <div key={index} className="rdb-kurir">
                          <input required className="rdb-kurir" type="radio" id={x.service} name="gender" onClick={() => myCourier(x, 'POS')} />
                          <label>{x.service} : {new Intl.NumberFormat('ID').format(x.cost[0].value)}</label>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h5>TIKI</h5>
                      {kurirTiki.map((x, index) => (
                        <div key={index} className="rdb-kurir">
                          <input required className="rdb-kurir" type="radio" id={x.service} name="gender" onClick={() => myCourier(x, 'TIKI')} />
                          <label>{x.service} : {new Intl.NumberFormat('ID').format(x.cost[0].value)}</label>
                        </div>
                      ))}
                    </div>
                  </>
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
                  ,{cart.shippingAddress.province} <br />
                  <strong>No Telp. : </strong> {(cart.shippingAddress.phone.substring(0,1) === '8' ? (<span>0</span>):(<span></span>))}{cart.shippingAddress.phone}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h4>Pembayaran</h4>
                {/* <hr/> */}
                <p>
                  <strong>Bank:</strong> {cart.paymentMethod} - {''}
                  {cart.paymentMethod === 'BCA' ? (
                    <>
                      4586766791 
                    </>
                  ) : (
                    <>
                      635601014994535
                    </>
                  )}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h4>Produk</h4>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product} className="flexCol">
                      <Col className="flexCol">
                        <Col xs="3">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            <ul>
                              <li>
                                {item.qty} x Rp. {new Intl.NumberFormat('ID').format(item.price)} = Rp. {item.qty * new Intl.NumberFormat('ID').format(item.price)}{}
                              </li>
                              <li>
                                {item.qty} x {item.weight} gram = {item.qty * item.weight} gram
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Col>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        </Col>
        <Col className="mw-400">
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
                  <div>Kode Unik</div>
                  <div>{cart.shippingAddress.uniqueCode}</div>
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
              <li className="mt-4">
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
