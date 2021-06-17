import React, {useState } from 'react';
import { Link, Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { signout } from '../actions/userActions';

const NavbarCompNew = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <div>
        <ul className="my-nav">
          <li className="my-nav">
            <Link to="/">Aruspinggir</Link>
          </li>
          <li className="my-nav">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </li>
          
          <li className="my-nav chart">
            <Link to="/cart">
              <i className="fa fa-shopping-cart my-chart"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </li>
          <li className="">
          {/* <div className="dropdownD">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdownD-content">
            <a href="#x">Link 1</a>
            <a href="#a">Link 2</a>
            <a href="#a">Link 3</a>
            </div>
          </div> */}
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem>Some Action</DropdownItem>
              <DropdownItem text>Dropdown Item Text</DropdownItem>
              <DropdownItem disabled>Action (disabled)</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Foo Action</DropdownItem>
              <DropdownItem>Bar Action</DropdownItem>
              <DropdownItem>Quo Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* {(userInfo && !userInfo.isAdmin) && (
              <UncontrolledDropdown nav inNavbar className="togle-dropdown">
                <DropdownToggle nav caret className="nav-text">
                  <b>User</b>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <a className="no-under dropdown-link" href="/profile">
                      Profil
                    </a>
                  </DropdownItem>
                  {!userInfo.isAdmin && (
                    <DropdownItem>
                      <Link className="dropdown-link" to="/riwayat-pesanan">
                        Riwayat pesanan
                      </Link>
                    </DropdownItem>
                  )}
                  <DropdownItem>
                    <a className="dropdown-link" href="/" onClick={signoutHandler}>
                      Logout
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )} */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarCompNew;