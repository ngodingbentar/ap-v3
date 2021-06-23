import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import SearchBoxSimple from './SearchBoxSimple';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavbarCompSimple = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="my-simple-nav clr-primary">
      <ul className="my-simple-nav-ul">
        <li className="ap-logo-full">
          <Link to="/">
            <b>
              Aruspinggir
            </b>
          </Link>
        </li>
        <li className="ap-logo-simple">
          <Link to="/">
            <i className="fa fa-home simple-nav-icon"></i>
          </Link>
        </li>
        {/* <li className="simple-nav-li" style={{float:'right'}}>
          <i className="fa fa-user simple-nav-icon"></i>
        </li>
        <li className="simple-nav-li" style={{float:'right'}}>
          <i className="fa fa-shopping-cart simple-nav-icon"></i>
        </li> */}
        <li style={{float:'right'}}>
          <Link to="/profile">
            <i className="fa fa-user simple-nav-icon"></i>
          </Link>
        </li>
        <li style={{float:'right'}}>
          <Link to="/cart">
            <i className="fa fa-shopping-cart simple-nav-icon"></i>
          </Link>
        </li>

        <li style={{float:'right'}}>
          <Route
            render={({ history }) => (
              <SearchBoxSimple history={history}></SearchBoxSimple>
            )}
          ></Route>
        </li>
      </ul>
    </div>
  );
}

export default NavbarCompSimple;