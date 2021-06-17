import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
// import CheckoutSteps from '../components/CheckoutSteps';
import { listCityId, listProvince } from '../actions/orderActions';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  // const [lat, setLat] = useState(shippingAddress.lat);
  // const [lng, setLng] = useState(shippingAddress.lng);
  // const userAddressMap = useSelector((state) => state.userAddressMap);
  // const { address: addressMap } = userAddressMap;

  const cityList = useSelector((state) => state.cityList);
  const { cities } = cityList;

  const provinceList = useSelector((state) => state.provinceList);
  const { provincies } = provinceList;

  // if (!userInfo) {
  //   props.history.push('/login');
  // }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [cityId, setCityId] = useState(shippingAddress.cityId);
  const [allCity, setAllCity] = useState([]);
  const [allProvince, setAllProvince] = useState([]);
  const [province, setProvince] = useState([]);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // const newLat = addressMap ? addressMap.lat : lat;
    // const newLng = addressMap ? addressMap.lng : lng;
    // if (addressMap) {
    //   setLat(addressMap.lat);
    //   setLng(addressMap.lng);
    // }
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
          // lat: newLat,
          // lng: newLng,
        })
      );
      props.history.push('/payment');
    }
  };

  useEffect(() => {
    if(!provincies){
      dispatch(listProvince())
    }
    if(provincies){
      setAllProvince(provincies?.rajaongkir?.results)
    }
    if(cities) {
      setAllCity(cities?.rajaongkir?.results)
    }
  }, [cities, dispatch, provincies]);
  
  const cekProvince = (e) => {
    dispatch(listCityId(e))
    setCityId(e)
    allProvince.forEach((x) => {
      if( e === x.province_id){
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

  const cek = () => {
    console.log('user', user)
  }

  return (
    <div>
      <button onClick={()=>cek()}>cek</button>
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h3>Alamat pengiriman</h3>
        </div>
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
        {allProvince && (
          <div>
            <label htmlFor="Provinsi">Provinsi</label>
            <select
              onChange={(e) => cekProvince(e.target.value)}
              required
            >
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
        <div>
          <label />
          <button className="primary text-white" type="submit">
            <b>Lanjut</b>
          </button>
        </div>
      </form>
    </div>
  );
}
