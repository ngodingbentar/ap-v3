import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bayar, biayaOngkir, confirmOrder, deliverOrder, detailsOrder, resiOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_BAYAR_RESET, ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import Axios from 'axios';
import {
  Label,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Button
} from 'reactstrap';

export default function OrderScreen(props) {
  // Modal
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalResi, setModalResi] = useState(false);
  const toggleResi = () => setModalResi(!modalResi);

  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    // loading: loadingDeliver,
    // error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingOrderUpdate,
    error: errorOrderUpdate,
    success: successOrderUpdate,
  } = orderUpdate;

  const orderBayar = useSelector((state) => state.orderBayar);
  const {
    loading: loadingBayar,
    error: errorBayar,
    success: successBayar,
  } = orderBayar;

  const [loadingOngkir, setLoadingOngkir] = useState(true);
  const [backLink, setBackLink] = useState('/riwayat-pesanan');

  const dispatch = useDispatch();
  useEffect(() => {
    if(order && !loading){
      if(order.resi){
        setResi(order.resi)
      }
      if(loadingOngkir){
        dispatch(biayaOngkir(order.shippingAddress.cityId))
        setLoadingOngkir(false)
      }
    }
    if(userInfo.isAdmin){
      setBackLink('/daftar-pesanan')
    }
    if (!order || successDeliver || successBayar || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_BAYAR_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, userInfo, loading, loadingOngkir, order, orderId, successDeliver, successBayar]);

  const bayarHandler = () => {
    dispatch(bayar(order._id));
  };

  const confirmHandler = () => {
    dispatch(
      confirmOrder({
        orderId: order._id,
        confirmImg: image,
      })
    );
  }

  const resiHandle = () => {
    if(!order.isDelivered){
      dispatch(
        deliverOrder(order._id),
      );
      dispatch(
        resiOrder({
          orderId: order._id,
          resi: resi,
        })
      );
    } else {
      dispatch(
        resiOrder({
          orderId: order._id,
          resi: resi,
        })
      );
    }
  }

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [image, setImage] = useState('');
  const [resi, setResi] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    Axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        setImage(response.data);
        setLoadingUpload(false);
      })
      .catch((err) => {
        setErrorUpload(err.message);
        setLoadingUpload(false);
      });
  };

  const [loadingResi, setLoadingResi] = useState(true);
  const [dataresi, setDataresi] = useState([]);
  const cekResi = async () => {
    toggleResi()
    setLoadingResi(true)
    if(dataresi.detail){
      setLoadingResi(false)
    } else {
      try{
        const result = await Axios.get(`/api/orders/cekresi/${order.resi}/jne`)
        // console.log('result', result.data.data)
        setDataresi(result.data.data)
        if(result.data.data){
          setLoadingResi(false)
        }
      } catch(err){
        console.log(err)
      }
    }
    
  };


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Link to={backLink}>
      <Button color="secondary mt-4">
        <i className="fa fa-arrow-left"></i>
        {' '}Kembali
      </Button>
      </Link>
      <div>
        <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <img className="large" src={image || order.confirmImg} alt="img" onClick={toggle}/>
          </ModalBody>
        </Modal>
      </div>
      <div>
        <Modal isOpen={modalResi} fade={false} toggle={toggleResi} className={className}>
          <ModalHeader toggle={toggleResi}>Detail Pengiriman</ModalHeader>
          <ModalBody>
              {!loadingResi ? (
              <div>
                <table className="mx-auto">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>No Resi</td>
                      <td className="pl-4">: {order.resi}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="pl-4">: {dataresi.summary.status}</td>
                    </tr>
                    <tr>
                      <td>Service</td>
                      <td className="pl-4">: {dataresi.summary.service}</td>
                    </tr>
                    <tr>
                      <td>Deskripsi</td>
                      <td className="pl-4">: {dataresi.summary.desc}</td>
                    </tr>
                    <tr>
                      <td>Dikirim oleh</td>
                      <td className="pl-4">: {dataresi.detail.shipper} - {dataresi.detail.origin}</td>
                    </tr>
                    <tr>
                      <td>Dikirim ke</td>
                      <td className="pl-4">: {dataresi.detail.receiver} - {dataresi.detail.destination}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <h3 className="text-center my-4">Histori</h3>
                  <section className="timeline-area">
                    {dataresi.history.map((item, index) => (
                      <div className="time" key={index}>
                        <p><b>{item.date}</b></p>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
              ) : (
                <h1>Loading</h1>
              )}
              
            
            
          </ModalBody>
        </Modal>
      </div>
      {successOrderUpdate && (
        <MessageBox variant="success">
          Berhasil Update Data
        </MessageBox>
      )}
      {(!order.confirmImg && !successOrderUpdate && !userInfo.isAdmin) && (
        <Alert color="warning">
          Anda belum melakukan konfirmasi pembayaran, segera lakukan konfirmasi.
        </Alert>
      )}
      <div className="row top mt-4">
        <Col xs="8">
        <div className="acol-2">
          <ul>
            <li>
              <div className="card card-body">
                <h3>Pengiriman</h3>
                <p>
                  {/* <strong>destinasi:</strong> {order.shippingAddress.cityId} <br /> */}
                  <strong>Nama :</strong> {order.shippingAddress.fullName} <br />
                  <strong>Alamat : </strong> {order.shippingAddress.address}, {' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.province},{' '}
                  {order.shippingAddress.postalCode}<br/>
                  <strong>Kurir : </strong>JNE - {order.courier}<br/>
                  {userInfo.isAdmin && (
                    <span><strong>Resi : </strong>{resi || '-'}</span>
                  )}

                  {!userInfo.isAdmin && (
                    <span><strong>Resi : </strong>{order.resi || '-'}</span>
                  )}
                </p>

                <div>
                  {order.resi && (
                    <button className="btn-lacak" onClick={cekResi}>Lacak Pesanan</button>
                  )}
                  {/* <button onClick={() => console.log('dataresi', dataresi)}>cek</button> */}
                </div>
                
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Dikirim pada {order.deliveredAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Belum Dikirim</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h3>Pembayaran</h3>
                <p>
                  <strong>Metode:</strong> {order.paymentMethod}
                </p>
                <p>Atas Nama : Aruspinggir</p>
                <p>Nomor Rekening : 123456789</p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Terbayar pada {order.paidAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Belum Terbayar</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h3>Produk</h3>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <Col xs="3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </Col>
                        <Col xs="8">
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div>
                            {item.qty} x Rp. {new Intl.NumberFormat('ID').format(item.price)} = Rp. {new Intl.NumberFormat('ID').format(item.qty * item.price)}
                          </div>
                        </Col>
                      </div>
                      <hr/>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        </Col>
        <Col xs="4">
        <div className="acol-1">
          <div className="card card-body">
            <ul>
              <li>
                <h3>Ringkasan Pesanan</h3>
              </li>
              <li>
                <div className="rowC">
                  <div>Produk</div>
                  <div>Rp. {new Intl.NumberFormat('ID').format(order.itemsPrice)}</div>
                </div>
              </li>
              <li>
                <div className="rowC">
                  <div>Pengiriman <b>({order.totalWeight / 1000} Kg)</b></div>
                  <div>Rp. {new Intl.NumberFormat('ID').format(order.shippingPrice)}</div>
                </div>
              </li>
              <li>
                <div className="rowC">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>Rp. {new Intl.NumberFormat('ID').format(order.totalPrice)}</strong>
                  </div>
                </div>
              </li>
              {userInfo.isAdmin && !order.isPaid && (
                <li>
                  {loadingBayar && <LoadingBox></LoadingBox>}
                  {errorBayar && (
                    <MessageBox variant="danger">{errorBayar}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="clr-secondary block text-white mt-4"
                    onClick={bayarHandler}
                  >
                    Terbayar
                  </button>
                </li>
              )}
              {order.user === userInfo._id && (
                <div>
                  <hr/>
                  <Label for="exampleFile">Upload bukti transfer</Label>
                  <Input type="file" name="file" id="exampleFile" onChange={uploadFileHandler}/>
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="clr-secondary block text-white confirmation mt-4"
                    onClick={confirmHandler}
                  >
                    Konfirmasi
                  </button>
                  {loadingOrderUpdate && (
                    <LoadingBox></LoadingBox>
                  )}
                  {errorOrderUpdate && (
                    <MessageBox variant="danger">{errorOrderUpdate}</MessageBox>
                  )}
                </div>
              )}
              {(userInfo.isAdmin && order.isPaid) && (
                <div>
                  <hr/>
                  <Label for="resi">Nomor Resi</Label>
                  <Input type="text" name="resi" id="resi" value={resi} onChange={(e) => setResi(e.target.value)}/>
                  <button
                    type="button"
                    className="clr-secondary block text-white confirmation mt-4"
                    onClick={resiHandle}
                  >
                    {!order.isDelivered ? (
                      <span>Pesanan Dikirim</span>
                    ) : (
                      <span>Update Resi</span>
                    )}
                    
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
          {(order.confirmImg || image) && (
            <img onClick={toggle} className="medium mt-4 img-detail" src={image || order.confirmImg} alt="confirm"/>
          )}
        </Col>
      </div>
    </div>
  );
}
