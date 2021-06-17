import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { Col, Button } from 'reactstrap';

export default function CartScreen(props) {
  const cart = useSelector(state => state.cart)
  const { cartItems, error } = cart
  
  const dispatch = useDispatch()
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    props.history.push('/login?redirect=shipping')
  }
  return (
    <div className="rowC mt-4">
      <Col>
        <div>
          <h3>Keranjang</h3>
          <hr/>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {
            cartItems.length === 0
            ?
            <MessageBox>
              Keranjang kosong. <Link to="/search/name/">Cari Produk</Link>
            </MessageBox>
            :
            (
              <ul>
                {
                  cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div className="flexCol">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            />
                          </div>
                          <div className="item-detail">
                            <Link to={`/product/${item.product}`}>
                            { (item.name).length < 30 ? 
                              (<span>{item.name}</span>) : 
                              (<span>{item.name.substring(0, 30)}. . .</span>)
                            }
                              
                            </Link>
                            <div>
                              Rp. {new Intl.NumberFormat('ID').format(item.price)}
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="">
                        <div className="end">
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
                          <div className="ml-4">
                            <Button
                              color="danger"
                              onClick={()=> removeFromCartHandler(item.product)}
                            >
                              <i className="fa text-white fa-trash "></i>
                            </Button>
                          </div>
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
      <Col className="mw-300">
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
      </Col>
      
    </div>
  )
}
