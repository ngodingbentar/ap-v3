import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Button } from 'reactstrap';
import { detailsCategory, updateCategory } from '../actions/categoryActions'
import Axios from 'axios';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

export default function CategoryScreen(props) {
  const dispatch = useDispatch()
  const categoryId = props.match.params.id;
  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
        image,
      })
    );
  };
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
    if (successUpdate) {
      props.history.push('/daftar-kategori');
    }
    if (!category || category._id !== categoryId) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(detailsCategory(categoryId));
    } else {
      setName(category.name);
      setImage(category.image);
    }
  }, [dispatch, category, categoryId, successUpdate, props.history])

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
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h3>Kategori</h3>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
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
              <img className="small img-detail" src={image} alt="img"/>
            </div>
            <div>
              <label></label>
              <button className="primary text-white" type="submit" style={{width: 100}}>
                <b>Update</b>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
