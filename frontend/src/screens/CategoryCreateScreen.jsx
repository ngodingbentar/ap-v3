import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../actions/categoryActions';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
export default function CategoryCreateScreen(props) {

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { error, success } = categoryCreate;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(createCategory({name, image}));
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

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

  useEffect(() => {
    if (success) {
      props.history.push("/daftar-kategori");
    }
  }, [props.history, success]);
  
  return (
    <div>
      <div>
      <Link to="/daftar-kategori">
        <Button color="secondary mt-4">
          <i className="fa fa-arrow-left"></i>
          {' '}Kembali
        </Button>
      </Link>
      </div>
      <div className="text-center">
        <h3>Tambah Kategori</h3>
      </div>
      <form className="form" onSubmit={submitHandler}>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
          {image && (
            <img className="small" src={image} alt="img"/>
          )}
        </div>
        <div>
          <label />
          <button className="primary text-white" type="submit" style={{maxWidth: 200}}>
            <b>Tambah Kategori</b>
          </button>
        </div>
      </form>
    </div>
  );
}
