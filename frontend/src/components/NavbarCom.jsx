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
  NavbarText,
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
        {/* <NavbarBrand href="/">Aruspinggir</NavbarBrand> */}
        <div className="container">
        <NavbarToggler onClick={toggle} />
        {/* <div className="my-search" >
          <Route 
            render={({ history }) => (
              <SearchBox history={history}></SearchBox>
            )}
          ></Route>
        </div> */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-text nav-brand no-under" href="/"><b>Aruspinggir</b></NavLink>
            </NavItem>
            {(userInfo && !userInfo.isAdmin) && (
              <UncontrolledDropdown nav inNavbar className="togle-dropdown">
                <DropdownToggle nav caret className="nav-text">
                  <b>User</b>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {/* <Link className="no-under dropdown-link" to="/profile">
                      Profil
                    </Link> */}
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
                  <b>Admin</b>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <a className="no-under dropdown-link" href="/profile">
                      Profil
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <Link className="dropdown-link" to="/all-product">
                      Produk
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link className="dropdown-link" to="/daftar-pesanan">
                      Pesanan
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link className="dropdown-link" to="/daftar-pengguna">
                      Pengguna
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link className="dropdown-link" to="/daftar-kategori">
                      Kategori
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <a className="dropdown-link" href="/" onClick={signoutHandler}>
                      Logout
                    </a>
                  </DropdownItem>
                  {/* <DropdownItem>
                    <Link to="/daftar-konfirmasi">
                      Konfirmasi
                    </Link>
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            )}

            <NavItem>
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </NavItem>
          </Nav>
          {/* <NavbarText> */}
            <NavLink href="/cart" className="nav-text">
              <i className="fa fa-shopping-cart my-chart"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </NavLink>
          {/* </NavbarText> */}
          {/* <NavbarText> */}
            {(userInfo && !userInfo.isAdmin) && (
              <UncontrolledDropdown nav inNavbar className="togle-dropdown">
                <DropdownToggle nav caret className="nav-text">
                  <b>User</b>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {/* <Link className="no-under dropdown-link" to="/profile">
                      Profil
                    </Link> */}
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
            )}
          {/* </NavbarText> */}
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarComp;