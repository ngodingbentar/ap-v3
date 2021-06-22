import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
// import CheckoutSteps from '../components/CheckoutSteps';
import { listCityId, listProvince } from '../actions/orderActions';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Button } from 'reactstrap';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  // const { loading, error, user } = userDetails;
  const { user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile; // data from redux store

  const cityList = useSelector((state) => state.cityList);
  const { cities } = cityList;

  const provinceList = useSelector((state) => state.provinceList);
  const { provincies } = provinceList;

  const [initialAddress, setInitialAddress] = useState(false);
  const [foundAddress, setFoundAddress] = useState('tidak');
  const [updateMyAddress, setUpdateMyAddress] = useState(false);
  const [showAllert, setShowAllert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState('');
  const [allCity, setAllCity] = useState([]);
  const [allProvince, setAllProvince] = useState([]);
  const [province, setProvince] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [shipTo, setShipTo] = useState('lainnya');


  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // Hasilnya 0-59
    const mydate = new Date().getSeconds();
    // returns a random integer from 0 to 99
    const myrandom = Math.floor(Math.random() * 100);
    const uniqueCode = mydate + myrandom
    let moveOn = true;
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          cityId,
          province,
          postalCode,
          phone,
          uniqueCode
        })
      );
      // props.history.push('/payment');
      props.history.push('/placeorder');
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } 
    if(user){
      if(user.nameReceiver){
        setFoundAddress('ada')
      }
    }

    if(updateMyAddress){
      if(successUpdate){
        setShowAllert(true)
        setTimeout(()=>{
          setShowAllert(false)
          setUpdateMyAddress(false)
        }, 3000)
      }
      if(errorUpdate){
        setAlertError(true)
        setTimeout(()=>{
          setAlertError(false)
        }, 3000)
      }
    }
    if(shipTo === 'tersimpan'){
      if(initialAddress === false){
        setInitialAddress(true)
      }
      
    }
    
    if(!provincies){
      dispatch(listProvince())
    }
    if(provincies){
      setAllProvince(provincies?.rajaongkir?.results)
    }
    if(cities) {
      setAllCity(cities?.rajaongkir?.results)
    }
  }, [cities, dispatch, provincies, shipTo, initialAddress, user, userInfo]);
  
  const cekProvince = (e) => {
    dispatch(listCityId(e))
    setCityId(e)
    allProvince.forEach((x) => {
      if( e === x.province_id){
        setProvinceId(x.province_id)
        // console.log('x',x.province_id)
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

  const dew = (e) => {
    setShipTo(e)
    if(e === 'tersimpan'){
      setFullName(user.nameReceiver);
      setAddress(user.labelAddress);
      setPostalCode(user.postalCode || '')
      setPhone(user.phone || '')
      setProvince(user.province || '')
      setCity(user.city || '')
      setCityId(user.cityId || '')
      setProvinceId(user.provinceId || '')
      
    }else{
      setFullName('');
      setAddress('');
      setPostalCode('')
      setPhone('')
      setProvince('')
      setCity('')
      setCityId('')
      setProvinceId('')
    }
  }

  const saveAddress = () => {
    try{
      dispatch(
        updateUserProfile({
          userId: user._id,
          nameReceiver: fullName,
          labelAddress: address,
          province,
          provinceId,
          city,
          cityId,
          postalCode,
          phone
        })
      );
      setUpdateMyAddress(true)
      
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      {showAllert && (
        <MessageBox variant="success">
          Berhasil Simpan Alamat
        </MessageBox>
      )}
      {alertError && (
        <MessageBox variant="danger">
          Gagal Simpan Alamat
        </MessageBox>
      )}
      {/* {loadingUpdate && (
        <LoadingBox ></LoadingBox>
      )} */}
      <div className="mt-4 ml-2">
        <h3>Alamat pengiriman</h3>
      </div>
      <div className="setAddress flex mt-4 ml-2">
        <button><b>Kirim ke </b></button>
        <select
          required
          onChange={(e) => dew(e.target.value)}
        >
          <option key="1" value="lainnya">Alamat Baru</option>
          {/* <option key="2" value="tersimpan">Tersimpan</option> */}
          {(foundAddress === 'ada') && (<option key="2" value="tersimpan">Tersimpan</option>)}
          
        </select>
      </div>
      <hr/>
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      {shipTo === 'tersimpan' ? (
        <form className="form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="fullName">Nama</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="address">Alamat</label>
            <input
              type="text"
              id="address"
              value={address}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="phone">Nomor Telp.</label>
            <input
              type="number"
              id="phone"
              value={phone}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="Provinsi">Provinsi</label>
            <select
            disabled
            >
              <option key="1" value="wadudu">{province}</option>
            </select>
          </div>

            <div>
              <label htmlFor="Kota">Kota</label>
              <select
              disabled
              >
                <option key="1" value="wadudu">{city}</option>
              </select>
            </div>
          <div>
            <label htmlFor="postalCode">Kode POS</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              disabled
            ></input>
          </div>
          <div>
            <label />
            <button className="primary text-white" type="submit" style={{width: 100}}>
              <b>Lanjut</b>
            </button>
          </div>
        </form>
      ) : (
        <>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="fullName">Nama</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="address">Alamat</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
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
                <option>--Pilih Provisi--</option>
                {
                  allProvince.map( (x, index) => (
                    <option key={x.province_id} value={ x.province_id}>{ x.province }</option>
                  ))
                }
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
                <option>--Pilih Kota--</option>
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
              type="number"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <button className="primary text-white" type="submit" style={{width: 100}}>
              <b>Lanjut</b>
            </button>
          </div>
        </form>
        <div className="container save-address">
          {/* {(foundAddress === 'tidak') && (<button className="secondary" onClick={()=>saveAddress()}>Simpan Alamat</button>)} */}
          {(foundAddress === 'tidak') && (<Button onClick={()=>saveAddress()} color="primary">Simpan Alamat</Button>)}
          {loadingUpdate && (
            <LoadingBox ></LoadingBox>
          )}
        </div>
        {/* <button onClick={()=>saveAddress()}>saveAddress</button> */}
        
        </>
      )}
    </div>
  );
}
