import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';

import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listCityId, listProvince } from '../actions/orderActions';

// import e from 'cors';

export default function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
   
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile; // data from redux store

  const [tabProfile, setTabProfile] = useState('biodata');
  const [editAddress, setEditAddress] = useState(false);

  const cityList = useSelector((state) => state.cityList);
  const { cities } = cityList;

  const provinceList = useSelector((state) => state.provinceList);
  const { provincies } = provinceList;
  const [allCity, setAllCity] = useState([]);
  const [allProvince, setAllProvince] = useState([]);
  const [province, setProvince] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState('');

  const [initialAddress, setInitialAddress] = useState(false);

  const [nameReceiver, setNameReceiver] = useState('');
  const [labelAddress, setLabelAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isEditBiodata, setIsEditBiodata] = useState(false);
  const [successUpdateData, setSuccessUpdateData] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      // setNameReceiver(user.nameReceiver)
      // setLabelAddress(user.labelAddress)
      // setPostalCode(user.postalCode)
      // setCityId(user.cityId)
      if(!initialAddress){
        setInitialAddress(true)
        setNameReceiver(user.nameReceiver || '')
        setLabelAddress(user.labelAddress || '')
        setPostalCode(user.postalCode || '')
        setPhone(user.phone || '')
        setProvince(user.province || '')
        setCity(user.city || '')
        setCityId(user.cityId || '')
        setProvinceId(user.provinceId || '')
      }
    }

    if(successUpdate){
      setSuccessUpdateData(true)
    }

    if(successUpdateData){
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
      setSuccessUpdateData(false)
    }

    
    
  }, [dispatch, userInfo._id, user, initialAddress, tabProfile, successUpdate, successUpdateData]);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    // password: Yup.string()
    //   .required('Password is required'),
  })

  return (
    <div>
      <button onClick={() => console.log('userInfo', userInfo)}>cek</button>
      {isEditBiodata ? (
        <Formik
        initialValues={{
          email: 'email1',
          username: 'name2',
        }}
        validationSchema={validate}
        onSubmit={values => {
          // console.log('submit')
          const userId= user._id
          const name= values.username
          const email= values.email
          console.log('name', name, 'email', email)
          
          dispatch(updateUserProfile({
            userId,
            email,
            name,
            nameReceiver,
            labelAddress,
            province,
            provinceId,
            city,
            cityId,
            postalCode,
            phone
          }));
          setIsEditBiodata(false)
        }}
      >
        {formik => (
          <div className="my-form">
            <h3 className="my-4 font-weight-bold .display-4">Biodata</h3>
            
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {loading && <LoadingBox></LoadingBox>}
            <Form>
              <TextField id="myInput" label="Username" name="username" type="text" placeholder={name} />
              <TextField label="Email" name="email" type="email" placeholder={email} />
              <button className="primary text-white" type="submit">
                <b>Update</b>
              </button>
            </Form>
            <button className="primary text-white" onClick={() => setIsEditBiodata(false)}>
              <b>Batal</b>
            </button>
          </div>
        )}
      </Formik>
      )
      :
      (
        <Formik
        initialValues={{
          email: '',
          username: '',
        }}
      >
        {formik => (
          <div className="my-form">
            <h3 className="my-4 font-weight-bold .display-4">Biodata</h3>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {loading && <LoadingBox></LoadingBox>}
            <Form>
              <TextField id="myInput" label="Username" name="username" type="text" value={name} disabled />
              <TextField label="Email" name="email" type="email" value={email} disabled/>
              
            </Form>
            <button className="primary text-white" type="submit" onClick={() => setIsEditBiodata(true)}>
                <b>Edit Biodata</b>
              </button>
          </div>
        )}
      </Formik>
      )
    }
    </div>
  )
}
