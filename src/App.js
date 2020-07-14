import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';


import './App.css';
import Header from './Component/Header/Header'
import Home from './Pages/Home/Home';
import ShoppingCart from './Pages/Shopping-cart/ShoppingCart';
import Auth from './Pages/Auth/Auth';
import paymentForm from './Pages/Checkout/paymentForm'
import { authCheck } from './Store/action/ActionCreator'
import PaymentSuccess from './Component/PaymentSuccess/PaymentSuccess';
import Profile from './Pages/Profile/Profile';

function App(props) {
  const { checkAuth } = props;
  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  let route = <Switch>
    <Route path='/shopping-cart' component={ShoppingCart} />
    <Route path='/auth' component={Auth} />
    <Route path='/' exact component={Home} />
    <Redirect to='/' />
  </Switch>

  if (props.isAuthenticate) {
    route = <Switch>
      <Route path='/shopping-cart' component={ShoppingCart} />
      <Route path='/success' component={PaymentSuccess} />
      <Route path='/checkout' component={paymentForm} />
      <Route path='/profile' component={Profile} />
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' />
    </Switch>
  }

  return (
    <div className="App">
      <Header />
      {route}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    checkAuth: () => dispatch(authCheck())
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(App);
