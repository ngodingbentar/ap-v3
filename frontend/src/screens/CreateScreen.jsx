import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';
import { createNewProduct } from '../actions/productActions';

export default function CreateScreen(props) {
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
  const [createLoading, setCreateLoading] = useState(false);
  const productCreateNew = useSelector((state) => state.productCreateNew);
  const { error, success } = productCreateNew;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    setCreateLoading(true)
    e.preventDefault();
      dispatch(createNewProduct({name, price, image, category, countInStock, weight, numberOfPage, publisher, author, description, isRecomendation, isPacket}));
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if(file){
      console.log(file.size)
      if(file.size < 500000){
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
      } else {
        alert('lebih besar 500kb')
      }
    }
  };

  useEffect(() => {
    if (success) {
      setCreateLoading(false)
      props.history.push("/all-product");
    }
  }, [props.history, success]);

  return (
    <div>
        {/* {loading && <LoadingBox></LoadingBox>} */}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h3>Tambah Produk</h3>
        </div>
        <div>
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            id="harga"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="imageFile">Image File</label>
          <input
            type="file"
            id="imageFile"
            label="Choose Image"
            onChange={uploadFileHandler}
            // required
          ></input>
          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && (
            <MessageBox variant="danger">{errorUpload}</MessageBox>
          )}
        </div>
        <div>
          {image && (
            <img className="small" src={image} alt="img"/>
          )}
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
            // required
          ></input>
        </div>
        <div>
          <label htmlFor="countInStock">Stok</label>
          <input
            id="countInStock"
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            // required
          ></input>
        </div>
        <div>
          <label htmlFor="numberOfPage">Jumlah Halaman</label>
          <input
            id="numberOfPage"
            type="number"
            value={numberOfPage}
            onChange={(e) => setNumberOfPage(e.target.value)}
            // required
          ></input>
        </div>
        <div>
          <label htmlFor="weight">Berat <b>(gram)</b></label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="publisher">Penerbit</label>
          <input
            id="publisher"
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            // required
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
            required
          ></textarea>
        </div>
        <div>
          <label />
          <button className="primary text-white" type="submit" style={{maxWidth: 200}}>
            <b>Tambah Produk</b>
          </button>
          {createLoading && (
            <LoadingBox></LoadingBox>
          )}
        </div>
      </form>
    </div>
  );
}
