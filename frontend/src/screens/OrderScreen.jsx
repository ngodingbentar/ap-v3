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
  const [isExpired, setIsExpired] = useState(false);
  const [cekCreated, setCekCreated] = useState(false);
  const [waktu, setWaktu] = useState(0);
  const [backLink, setBackLink] = useState('/riwayat-pesanan');
  const [orderStatus, setOrderStatus] = useState('Proses');
  const [changeStatus, setChangeStatus] = useState(false);

  const sekarang = Date.now()

  const dispatch = useDispatch();
  useEffect(() => {
    if(successOrderUpdate){
      console.log('successOrderUpdate')
      if(changeStatus){
        setOrderStatus('Pengecekan Pembayaran')
        setChangeStatus(false)
      }
    }
    if(order && !loading){
      if(orderStatus === 'Proses'){
        setOrderStatus(order.status)
      }
      if(!cekCreated){
        setWaktu(new Date(Date.parse(order.createdAt)+86400000).toString().substring(4, 21))
        if((Date.parse(order.createdAt)+86400000) < sekarang){
          setIsExpired(true)
          if(!userInfo.isAdmin){
            alert('pesanan dibatalkan')
          }
        }
        setCekCreated(true)
      }
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
  }, [dispatch, userInfo, loading, loadingOngkir, order, orderId, successDeliver, successBayar, cekCreated, successOrderUpdate]);

  const getMyData = async (id, qty) => {
    try{
      const result = await Axios.get(`/api/products/${id}`)
      // console.log('result', result.data)
      if(result.data){
        const nowStock = result.data.countInStock - qty
        // console.log(nowStock)
        const product = {
          _id: id,
          countInStock: nowStock,
        }
        await Axios.put(`/api/products/stock/${id}`, product, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })

        // console.log('data update', data)
      }
    }catch(err){
      console.log(err)
    }
  }

  const bayarHandler = () => {
    dispatch(bayar(order._id));
    order.orderItems.forEach((item) => {
      getMyData(item.product, item.qty)
    })
  };

  const confirmHandler = () => {
    setChangeStatus(true)
    dispatch(
      confirmOrder({
        orderId: order._id,
        confirmImg: image,
        status: 'Pengecekan Pembayaran',
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
        const result = await Axios.get(`/api/orders/cekresi/${order.resi}/${order.courierName}`)
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
      {/* <button onClick={() => console.log(order)}>cek</button> */}
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
                      <td>Kurir</td>
                      <td className="pl-4">: {dataresi.summary.courier}</td>
                    </tr>
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
      {(!order.confirmImg && !successOrderUpdate && !userInfo.isAdmin && !isExpired) && (
        <Alert color="warning">
          Anda belum melakukan konfirmasi pembayaran, segera lakukan konfirmasi.
        </Alert>
      )}
      {(isExpired && !userInfo.isAdmin) && (
        <Alert color="danger">
          <b>Pesanan dibatalkan</b>, Sudah melewati batas pembayaran, silakan <Link to="/search/name/">beli ulang</Link>
        </Alert>
      )}
      {(isExpired && userInfo.isAdmin && !order.paidAt) && (
        <Alert color="danger">
          Sudah melewati batas pembayaran
        </Alert>
      )}
      <div className="rowC top mt-4">
        <Col>
        <div>
          <ul>
            <li>
              <div className="card no-border">
                {/* <p>Batas Waktu Pembayaran : {new Date(waktu)}</p> */}
                {/* <div>{new Date(waktu).toString()}</div> */}
                <p><b>Batas Waktu Pembayaran : </b>{waktu}</p>
                <p><b>Status : {orderStatus}</b></p>
                <button onClick={() => console.log(orderStatus)}>cek</button>
                <h5>ID pesanan : {order._id}</h5>
                <h3>Pengiriman</h3>
                <p>
                  <strong>Nama :</strong> {order.shippingAddress.fullName} <br />
                  <strong>No Telp. :</strong> {(order.phone.substring(0,1) === '8' ? (<span>0</span>):(<span></span>))}{order.phone} <br />
                  <strong>Alamat : </strong> {order.shippingAddress.address}, {' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.province},{' '}
                  {order.shippingAddress.postalCode}<br/>
                  <strong>Kurir : </strong>{order.courierName} - {order.courier}<br/>
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
              <div className="card no-border">
                <h3>Pembayaran</h3>
                <p>
                  Rekening: <b>{order.paymentMethod}</b>
                </p>
                {(!isExpired) && (
                  <span>
                    <p>Atas Nama : <b>Aruspinggir</b></p>
                    <p>Nomor Rekening : {''}
                      <b>
                        {order.paymentMethod === 'BCA' ? (
                          <>
                            4586766791 
                          </>
                        ) : (
                          <>
                            635601014994535
                          </>
                        )}
                      </b>
                    </p>
                  </span>
                )}
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
              <div className="card no-border">
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
                          <div>
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
        
        <Col className="mw-400">
          
            <div>
              {/* <button onClick={() => console.log(order)}>cek</button> */}
              <div className="card no-border">
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
                      <div>Kode unik</div>
                      <div>{order.uniqueCode}</div>
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
                  {(order.user === userInfo._id && !isExpired) && (
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