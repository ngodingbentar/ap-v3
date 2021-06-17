import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


export default function ProductEditScreen(props) {
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [weight, setWeight] = useState('');
  const [numberOfPage, setNumberOfPage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isRecomendation, setIsRecomendation] = useState(false);
  const [isPacket, setIsPacket] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/all-product');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setWeight(product.weight);
      setNumberOfPage(product.numberOfPage)
      setPublisher(product.publisher)
      setAuthor(product.author);
      setDescription(product.description);
      setIsPacket(product.isPacket);
      setIsRecomendation(product.isRecomendation)
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        author,
        countInStock,
        weight,
        numberOfPage,
        publisher,
        description,
        isRecomendation,
        isPacket,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
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

  return (
    <div>
      <div>
        <Link to="/all-product">
          <Button color="secondary mt-4">
            <i className="fa fa-arrow-left"></i>
            {' '}Kembali
          </Button>
        </Link>
      </div>
      <div>
        <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <img className="large" src={image} alt="img" onClick={toggle}/>
          </ModalBody>
        </Modal>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h3>Produk</h3>
        </div>
        
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nama</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Harga</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            {/* <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div> */}
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <img className="small img-detail" src={image} alt="img" onClick={toggle}/>
            </div>
            {categories && (
              <div>
                <label htmlFor="category">Kategori</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {
                    categories.map( (x) => (
                      <option key={x._id} value={ x.name}>{ x.name }</option>
                    ))
                  }
                </select>
              </div>
            )}
            <div>
              <label htmlFor="author">Penulis</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Stok</label>
              <input
                id="countInStock"
                type="text"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="numberOfPage">Jumlah Halaman</label>
              <input
                id="numberOfPage"
                type="text"
                value={numberOfPage}
                onChange={(e) => setNumberOfPage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="weight">Berat <b>(gram)</b></label>
              <input
                id="weight"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="publisher">Penerbit</label>
              <input
                id="publisher"
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isRecomendation">Rekomendasi</label>
              <input
                id="isRecomendation"
                type="checkbox"
                checked={isRecomendation}
                onChange={(e) => setIsRecomendation(e.target.checked)}
              ></input>
            </div>
            <div>
              <label htmlFor="isPacket">Paket</label>
              <input
                id="isPacket"
                type="checkbox"
                checked={isPacket}
                onChange={(e) => setIsPacket(e.target.checked)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Deskripsi</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary text-white" type="submit" style={{width: 100}}>
                <b>Update</b>
              </button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
