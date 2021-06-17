import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Container,
  Col
} from 'reactstrap';
import { addToCart } from '../actions/cartActions';
// import axios from 'axios'


export default function ProductScreenNew(props) {
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch()
  const productId = props.match.params.id
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [isSame, setIsSame] = useState(false)
  const [alertSame, setAlertSame] = useState(false)
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cekData = async () => {
    try{
      const localCart = localStorage.getItem('cartItems') ?
      JSON.parse(localStorage.getItem('cartItems')) :
      0

      if(localCart.length > 0){
        localCart.forEach((item, index) => {
          if(item.product === productId){
            setIsSame(true)
          }
        });
      }
    
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    cekData()
    dispatch(detailsProduct(productId))
  }, [dispatch, productId])

  const addToCartHandler = async () => {
    if(userInfo){
      if(isSame){
        setAlertSame(true)
        setTimeout(()=>{
          setAlertSame(false)
        }, 2000)
      }else{
        dispatch(addToCart(productId, qty))
        setAdded(true)
        setIsSame(true)
        setTimeout(()=>{
          setAdded(false)
        }, 2000)
      }
    } else {
      alert('Anda Belum Login')
    }
  }

  return (
    <>
    {loading ?
        (
          <LoadingBox></LoadingBox>
        )
        : error ? 
        (
          <MessageBox variant="danger">{error}</MessageBox>
        ) 
        : 
        (
          <Container>
            <Link to="/search/name/">
              <Button color="secondary mt-4">
                <i className="fa fa-arrow-left"></i>
                {' '}Kembali
              </Button>
            </Link>
            {added && (<MessageBox variant="success">Barang ditambah ke keranjang</MessageBox>)}
            {alertSame && (<MessageBox variant="warning">Barang sudah ada di keranjang</MessageBox>)}
            
            <span>
              <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                  <img className="large" src={product.image} alt="img" onClick={toggle}/>
                </ModalBody>
              </Modal>
            </span>
            <div className="rowC">
              <Col>
                <div className="product-right">

                  <div className="product-detail mt-4">
                    <img onClick={toggle} className="img-detail" src={product.image} alt={product.name}/>
                  </div>
                  <div className="acol-1 pl-4 mt-4">
                    <ul>
                      <li>
                        <h4>{product.name}</h4>
                      </li>
                      <li><b>Harga</b> : Rp. {new Intl.NumberFormat('ID').format(product.price)}</li>
                      <li><b>Berat</b> : {product.weight} gram</li>
                      <li><b>Jumlah Halaman</b> : {product.numberOfPage}</li>
                      <li><b>Penulis</b> : {product.author}</li>
                      <li><b>Penerbit</b> : {product.publisher}</li>
                    </ul>
                    <hr/>
                    <p><b>Kategori</b> : {' '}
                      <Link to={"/search/category/"+product.category}>
                        {product.category}
                      </Link>
                    </p>
                  </div>
                </div>
                {/* <div>
                <div className="rowC my-4">
                  <b>Deskripsi</b> : <p>{product.description}</p>
                </div>
                </div> */}
              </Col>
              {/* <Col>
                <div className="acol-1">
                  <ul>
                    <li>
                      <h4>{product.name}</h4>
                    </li>
                    <li><b>Harga</b> : Rp. {new Intl.NumberFormat('ID').format(product.price)}</li>
                    <li><b>Berat</b> : {product.weight} gram</li>
                    <li><b>Jumlah Halaman</b> : {product.numberOfPage}</li>
                    <li><b>Penulis</b> : {product.author}</li>
                    <li><b>Penerbit</b> : {product.publisher}</li>
                  </ul>
                  <hr/>
                  <p><b>Kategori</b> : {' '}
                    <Link to={"/search/category/"+product.category}>
                      {product.category}
                    </Link>
                  </p>
                </div>
              </Col> */}
              <Col className="colAddToChart">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row-product">
                        <div>Harga</div>
                        <div className="price">Rp. {new Intl.NumberFormat('ID').format(product.price)}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row-product">
                        <div>Status</div>
                        <div>
                          {product.countInStock >0 
                            ? (<span className="success">Ada</span>)
                            : (<span className="danger">Habis</span>)
                          }
                        </div>
                      </div>
                    </li>
                    {
                      product.countInStock >0 && (
                        <>
                          <li>
                            <div className="row-product">
                              <div>Jumlah</div>
                              <div>
                                <select value={qty} onChange={ e => setQty(e.target.value)}>
                                  {
                                    [...Array(product.countInStock).keys()].map( x => (
                                      <option key={ x + 1 } value={ x + 1 }>{ x + 1 }</option>
                                    ))
                                  }
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <button
                              onClick={addToCartHandler}
                              className="clr-secondary block addChart text-white"
                            >
                              <b>+</b> Keranjang
                            </button>
                          </li>
                        </>
                      )
                    }
                  </ul>
                </div>
              </Col>
            </div>
            <div className="my-4 px-2">
              <b>Deskripsi</b> : <p>{product.description}</p>
            </div>
          </Container>
        )
        }
    </>
  )
}
