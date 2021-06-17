import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
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
  DropdownItem,
  NavbarBrand,
} from 'reactstrap';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';

const NavbarComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="" light expand="md" className="clr-primary navbar-custom">
        <div className="container">
        <NavbarBrand href="/">Aruspinggir</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="my-search">
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </NavItem>
            <NavItem>
              <NavLink href="/cart" className="nav-text">
                <i className="fa fa-shopping-cart my-chart"></i>
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </NavLink>
            </NavItem>
            {(userInfo && !userInfo.isAdmin) && (
              <UncontrolledDropdown nav inNavbar className="togle-dropdown">
                <DropdownToggle nav caret className="nav-text">
                  {/* <b>User</b> */}
                  <i className="fa fa-user my-chart"></i>
                </DropdownToggle>
                <DropdownMenu right className="profile-item">
                  <a className="no-under dropdown-link" href="/profile">
                    <DropdownItem>
                        Profil
                    </DropdownItem>
                  </a>
                  {!userInfo.isAdmin && (
                    <DropdownItem className="hover-white">
                      <Link className="dropdown-link" to="/riwayat-pesanan">
                        Riwayat pesanan
                      </Link>
                    </DropdownItem>
                  )}
                  <DropdownItem className="hover-white">
                    <a className="dropdown-link" href="/" onClick={signoutHandler}>
                      Logout
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}

            {!userInfo && (
              <>
              <NavItem className="nav-text">
                <NavLink href="/login"><b>Login</b></NavLink>
              </NavItem>
              <NavItem className="nav-text">
                <NavLink href="/register"><b>Register</b></NavLink>
              </NavItem>
              </>
            )}

            {userInfo && userInfo.isAdmin && (
              <UncontrolledDropdown nav inNavbar className="togle-dropdown">
                <DropdownToggle nav caret className="nav-text" >
                  {/* <b>Admin</b> */}
                  <i className="fa fa-user my-chart"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <a className="no-under dropdown-link my-drop-item" href="/profile">
                  <DropdownItem>
                      Profil
                  </DropdownItem>
                  </a>
                  <Link className="no-under dropdown-link my-drop-item" to="/all-product">
                    <DropdownItem>
                        Produk
                    </DropdownItem>
                  </Link>
                  <Link className="no-under dropdown-link my-drop-item" to="/daftar-pesanan">
                    <DropdownItem>
                        Pesanan
                    </DropdownItem>
                  </Link>
                  <Link className="no-under dropdown-link my-drop-item" to="/daftar-pengguna">
                    <DropdownItem>
                        Pengguna
                    </DropdownItem>
                  </Link>
                  <Link className="no-under dropdown-link my-drop-item" to="/daftar-kategori">
                    <DropdownItem>
                        Kategori
                    </DropdownItem>
                  </Link>
                  <a className="no-under dropdown-link my-drop-item" href="/" onClick={signoutHandler}>
                    <DropdownItem>
                        Logout
                    </DropdownItem>
                  </a>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}

          </Nav>
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarComp;