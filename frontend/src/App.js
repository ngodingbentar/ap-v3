import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listCategory } from './actions/categoryActions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchScreen from './screens/SearchScreen';
import AboutScreen from './screens/AboutScreen';
import FooterComp from './components/FooterComp';
import LayoutScreen from './screens/LayoutScreen';
// import NavbarComp from './components/NavbarCom';
import ProductScreenNew from './screens/ProductScreenNew';
import ProductListScreen from './screens/ProductListScreen';
import CreateScreen from './screens/CreateScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import CategoryCreateScreen from './screens/CategoryCreateScreen';
import CategoryScreen from './screens/CategoryScreen';
import { ContactScreen } from './screens/ContactScreen';
import GuideScreen from './screens/GuideScreen';
// import NavbarCompNew from './components/NavbarCompNew';
import NavbarCompSimple from './components/NavbarCompSimple';
import NotFoundScreen from './screens/404';
// import Register from './screens/Register';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        {/* <NavbarComp/> */}
        {/* <NavbarCompNew/> */}
        <NavbarCompSimple />
        
        <main className="main-section container-custom">
          <Switch>
            <Route exact path="/tentang" component={AboutScreen}></Route>
            <Route exact path="/panduan-belanja" component={GuideScreen}></Route>
            <Route exact path="/layout" component={LayoutScreen}></Route>
            <PrivateRoute path="/cart/:id?" exact component={CartScreen}></PrivateRoute>
            <Route path="/product/:id" component={ProductScreenNew} exact></Route>
            <Route
              path="/product/:id/edit"
              component={ProductEditScreen}
              exact
            ></Route>
            <Route path="/login" exact component={SigninScreen}></Route>
            <Route path="/register" exact component={RegisterScreen}></Route>
            {/* <Route path="/signin" exact component={Login}></Route>
            <Route path="/signup" exact component={Register}></Route> */}
            <Route path="/kontak" exact component={ContactScreen}></Route>
            <PrivateRoute path="/shipping" exact component={ShippingAddressScreen}></PrivateRoute>
            <PrivateRoute path="/payment" exact component={PaymentMethodScreen}></PrivateRoute>
            <PrivateRoute path="/placeorder" exact component={PlaceOrderScreen}></PrivateRoute>
            <PrivateRoute path="/order/:id" exact component={OrderScreen}></PrivateRoute>
            <PrivateRoute path="/riwayat-pesanan" exact component={OrderHistoryScreen}></PrivateRoute>
            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
              component={SearchScreen}
              exact
            ></Route>
            <PrivateRoute
              exact
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <AdminRoute
              path="/daftar-pesanan"
              component={OrderListScreen}
              exact
            ></AdminRoute>
            <AdminRoute path="/daftar-pengguna" exact component={UserListScreen}></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/all-product"
              component={ProductListScreen}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/create-product"
              component={CreateScreen}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/daftar-kategori"
              component={CategoryListScreen}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/tambah-kategori"
              component={CategoryCreateScreen}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/kategori/:id"
              component={CategoryScreen}
            ></AdminRoute>

            <Route path="/" component={HomeScreen} exact></Route>
            {/* <Route component={NotFoundScreen } exact></Route> */}
            <Route component={NotFoundScreen} />
          </Switch>
        </main>
        <FooterComp/>
      </div>
    </BrowserRouter>
  );
}

export default App;
