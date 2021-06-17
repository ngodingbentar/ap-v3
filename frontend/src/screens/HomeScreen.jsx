import React, { useEffect } from 'react'
import Product from '../components/Product';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'
import { listPacket, listProducts, listRecomendation } from '../actions/productActions';
import { Link } from 'react-router-dom';
import CategoriesComp from '../components/CategoriesComp';
import { Button } from 'reactstrap';

export default function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productRecomendation = useSelector((state) => state.productRecomendation);
  const {
    loading: loadingRecomendation,
    products: recomendation,
    error: errorRecomendation,
  } = productRecomendation

  const productPacket = useSelector((state) => state.productPacket);
  const {
    loading: loadingPacket,
    products: packet,
    // error: errorPacket,
  } = productPacket

  useEffect(() => {
    dispatch(listProducts({}))
    dispatch(listRecomendation())
    dispatch(listPacket())
  }, [dispatch])

  return (
    <div className="mt-4">
      {/* <h2 className="my-4">Rekomendasi</h2> */}
      {loadingRecomendation ? (
        <LoadingBox></LoadingBox>
      ) : errorRecomendation ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {recomendation.length === 0 && <MessageBox>Tidak ada rekomendasi</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {recomendation.map((product) => (
              <div className="item-slide" key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img className="list-recomendation" src={product.image} alt={product.name} />
                  <p className="legend">{product.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <div className="row my-4 center">
        <h2>Produk</h2>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
      {products && products.length > 0 && (
        <div className="row my-4 center">
          <Link to="/search/name/">
            <Button color="secondary">Selengkapnya</Button>
          </Link>
        </div>
      )}
      <hr/>

      <div className="row my-4 center">
        <h2>Paket</h2>
      </div>
      {loadingPacket ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {packet.length === 0 && <MessageBox>Tidak ada paket</MessageBox>}
          <div className="row center">
            {packet.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
      {packet && packet.length > 0 && (
        <div className="row my-4 center">
          <Link to="/search/name/paket">
            <Button color="secondary">Selengkapnya</Button>
          </Link>
        </div>
      )}
      <hr/>

      <div className="row mt-4 center">
        <h2>Kategori</h2>
      </div>
      <CategoriesComp/>
    </div>
  )
}
