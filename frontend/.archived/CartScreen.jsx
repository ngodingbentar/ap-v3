import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { Col, Button } from 'reactstrap';

export default function CartScreen(props) {
  const cart = useSelector(state => state.cart)
  const { cartItems, error } = cart
  const productId = props.match.params.id
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1]) 
    : 1 ;
  
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if(productId){
  //     dispatch(addToCart(productId, qty))
  //   }
  // }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    props.history.push('/login?redirect=shipping')
  }
  return (
    <div className="row top mt-4">
      <Col xs="8">
        <div>
          <h3>Keranjang</h3>
          <hr/>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {
            cartItems.length === 0
            ?
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
            :
            (
              <ul>
                {
                  cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30 pl-4">
                          <Link to={`/product/${item.product}`}>
                          { (item.name).length < 30 ? 
                            (<span>{item.name}</span>) : 
                            (<span>{item.name.substring(0, 30)}. . .</span>)
                          }
                            
                          </Link>
                        </div>
                        <div>
                          <select
                            value={item.qty}
                            onChange={ e =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {
                              [...Array(item.countInStock).keys()].map( x => (
                                <option key={ x + 1 } value={ x + 1 }>{ x + 1 }</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mx-4">
                          Rp. {new Intl.NumberFormat('ID').format(item.price)}
                        </div>
                        <div>
                          <Button
                            color="danger"
                            onClick={()=> removeFromCartHandler(item.product)}
                          >
                            <i className="fa text-white fa-trash "></i>
                          </Button>
                        </div>
                      </div>
                      <hr/>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
      </Col>
      <Col xs="4">
        <div className="card card-body mt-4">
          <ul>
            <li>
              <p>
                Total ({cartItems.reduce((a, c) => a + c.qty, 0 )} items)
                :<b> Rp. {new Intl.NumberFormat('ID').format(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}</b>
              </p>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary text-white"
                disabled={cartItems.length === 0}
              >
                <b>Checkout</b>
              </button>
            </li>
          </ul>
        </div>
      </Col>
    </div>
  )
}
