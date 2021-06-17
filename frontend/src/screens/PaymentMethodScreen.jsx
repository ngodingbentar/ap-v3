import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
// import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('BCA');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h3>Metode Pembayaran</h3>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="BCA"
              value="BCA"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="BCA">BCA</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="BRI"
              value="BRI"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="BRI">BRI</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary text-white" type="submit" style={{width: 100}}>
            <b>Lanjut</b>
          </button>
        </div>
      </form>
    </div>
  );
}
