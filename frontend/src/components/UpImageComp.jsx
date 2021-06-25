import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';
import { createNewProduct } from '../actions/productActions';

export default function UpImageComp(props) {
  const [image, setImage] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const productCreateNew = useSelector((state) => state.productCreateNew);
  const { error, success } = productCreateNew;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   if (success) {
  //     setCreateLoading(false)
  //     props.history.push("/all-product");
  //   }
  // }, [props.history, success]);

  return (
    <div>
        {/* {loading && <LoadingBox></LoadingBox>} */}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
            <>
              <p>{image}</p>
              <img className="small" src={image} alt="img"/>
            </>
          )}
        </div>
    </div>
  );
}
