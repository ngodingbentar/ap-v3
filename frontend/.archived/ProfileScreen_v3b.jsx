import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listCityId, listProvince } from '../actions/orderActions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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
    }
    if(tabProfile === 'alamat'){
      if(!provincies){
        dispatch(listProvince())
      }
      if(initialAddress === false){
        setInitialAddress(true)
        setNameReceiver(user.nameReceiver || '')
        setLabelAddress(user.labelAddress || '')
        setPostalCode(user.postalCode || '')
        setPhone(user.phone || '')
        setProvince(user.province || '')
        setCity(user.city || '')
        setProvinceId(user.provinceId || '')
      }
    }
    if(provincies){
      setAllProvince(provincies?.rajaongkir?.results)
    }
    if(cities) {
      setAllCity(cities?.rajaongkir?.results)
    }
  }, [dispatch, userInfo._id, user, cities, provincies, tabProfile]);
  const submitHandler = () => {
    
    if(changePassword){
      if (password.length < 6) {
        alert('Password Terlalu pendek, password harus lebih dari 6 karakter');
      } else if(password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok');
      } else {
        dispatch(
          updateUserProfile({
            userId: user._id,
            name,
            email,
            password,
          })
        );
      }
    } else {
      setEditAddress(false)
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          nameReceiver,
          labelAddress,
          province,
          provinceId,
          city,
          cityId,
          postalCode,
          phone
        })
      );
    }
  };

  // const cek = () => {
  //   console.log('province',province)
  // }
  const cekProvince = (e) => {
    console.log('e', e)
    dispatch(listCityId(e))
    setCityId(e)
    allProvince.forEach((x) => {
      if( e === x.province_id){
        console.log('x.province', x.province)
        setProvince(x.province)
      }
    })
  }

  const cekKota = (e) => {
    setCityId(e)
    allCity.forEach((x) => {
      if( e === x.city_id){
        setCity(x.city_name)
      }
    })
  }

  return (
    <div>
      <div className="center-div mt-2">
        <Button onClick={()=> setTabProfile('biodata')}>Biodata</Button>
        <Button onClick={()=> setTabProfile('alamat')}>Alamat</Button>
      </div>
      {tabProfile === 'biodata' && (
        <div className="form">
        <div>
          <h3>Biodata</h3>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Berhasil update profil
              </MessageBox>
            )}
            {/* <div>
              <label htmlFor="name">Nama</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div> */}
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
            <button className="ml-4" onClick={() => setChangePassword(!changePassword)}>ubah password</button>
            {changePassword && (
              <>
                <div>
                  <label htmlFor="password">Password <i>(Lebih dari 6 karakter)</i></label>
                  <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Ulangi password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button onClick={() => submitHandler()} className="primary text-white" style={{width: 100}} >
                <b>Update</b>
              </button>
            </div>
          </>
        )}
      </div>
      )}
      {tabProfile === 'alamat' && (
        <>
        {/* <button onClick={() => cek()}>cek</button> */}
        <div className="form">
        <div>
          <h3>Alamat</h3>
        </div>
        {editAddress ? (
          <>
            <div>
              <label htmlFor="nameReceiver">Nama penerima</label>
              <input
                id="nameReceiver"
                type="text"
                placeholder="Nama penerima"
                value={nameReceiver}
                onChange={(e) => setNameReceiver(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="labelAddress">Label Alamat</label>
              <input
                id="labelAddress"
                type="text"
                placeholder="Label Alamat"
                value={labelAddress}
                onChange={(e) => setLabelAddress(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="phone">Nomor Telp.</label>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              ></input>
            </div>
            {allProvince && (
              <div>
                <label htmlFor="Provinsi">Provinsi</label>
                <select
                  onChange={(e) => cekProvince(e.target.value)}
                  required
                >
                  {allProvince.map(( x, index ) =>
                    <option key={x.province_id} value={x.province_id}>{ x.province }</option>
                  )}
                  {/* {
                    allProvince.map( (x, index) => (
                      <option key={x.province_id} value={x.province_id}>{ x.province }</option>
                    ))
                  } */}
                </select>
              </div>
            )}

            {allCity && (
              <div>
                <label htmlFor="Kota">Kota</label>
                <select
                  onChange={(e) => cekKota(e.target.value)}
                  required
                >
                  {
                    allCity.map( x => (
                      <option key={x.city_id} value={x.city_id}>{ x.city_name }</option>
                    ))
                  }
                </select>
              </div>
            )}
            <div>
              <label htmlFor="postalCode">Kode POS</label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              ></input>
            </div>
          </>
        ):(
          <>
            <table className="mx-4 biodata">
              <tbody>
                <tr>
                  <th>Nama penerima</th>
                  <td>{nameReceiver}</td>
                </tr>
                <tr>
                  <th>Label Alamat</th>
                  <td>{labelAddress}</td>
                </tr>
                <tr>
                  <th>Nomor telp.</th>
                  <td>
                    {(phone.substring(0,1) === '8' ? (<span>0</span>):(<span></span>))}{phone}
                  </td>
                </tr>
                <tr>
                  <th>Provinsi</th>
                  <td>{province}</td>
                </tr>
                <tr>
                  <th>Kota</th>
                  <td>{city}</td>
                </tr>
                <tr>
                  <th>Kode Pos</th>
                  <td>{postalCode}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        
        <div>
          <label />
          {editAddress ? (
            <div className="center-div">
              <button onClick={() => setEditAddress(false)} className="w-half" style={{width: 100}}>
                <b>Batal</b>
              </button>
              <button onClick={() => submitHandler()} className="primary text-white w-half" style={{width: 100}}>
                <b>Update</b>
              </button>
            </div>
          ) : (
            <button onClick={() => setEditAddress(true)} className="primary text-white" style={{width: 100}}>
              <b>Edit</b>
            </button>
          )}
          {/* <button onClick={() => submitHandler()} className="primary text-white">
            <b>Update</b>
          </button> */}
        </div>
      </div>
      </>
      ) }
    </div>
  );
}