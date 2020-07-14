import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import classes from './ShoppingCart.module.css';
import CartElement from '../../Component/Cart-Element/CartElement'
import ShoppingSummary from '../../Component/ShoppingSummary/ShoppingSummary';
import * as actionTypes from '../../Store/actionTypes';
import Modal from '../../Component/Modal/Modal';

function ShoppingCart(props) {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      let tempArray = []
      for (const product in props.products) {
         tempArray.push(props.products[product])
      }
      setProducts(tempArray);
   }, [props.products]);

   const checkoutClickHandler = () => {
      if (props.isAuthenticate) {
         props.history.push('/checkout')
      } else {
         props.history.push('/auth');
         props.authRedirect('/checkout');
      }
      
   }

   const carts = products.map( product => {
      return (
         <CartElement {...product} upClicked={props.onProductAdd} downClicked={props.onProductReduce} key={product.item._id}/>
      )
   })

   const shopping = (
      <>
         <h2>Shopping Cart</h2>
         <div className={classes.shoppingCart}>
            <div className={classes.cartList} >
               {carts}
            </div>
            <div className={classes.cartSummary} >
               <ShoppingSummary totalPrice={props.totalPrice} checkoutClicked={checkoutClickHandler} />
            </div>
         </div>
      </>
   )

   return (
      <div className="container">
         <Modal className={classes.modal}>
            <p>Something Wrong</p>
            <button className={classes.modalButton}>ok</button>
      </Modal>
         {products.length > 0 ? shopping : <h1>No Item In The Cart</h1>}
      </div>
   )
}

const mapStateToProps = state => {
   return {
      isAuthenticate: !!state.auth.token,
      products: state.shopping.items,
      totalQty: state.shopping.totalQty,
      totalPrice: state.shopping.totalPrice
   }
}

const mapDispatchToProps = dispatch => {
   return {
      authRedirect: (path) => dispatch({type: actionTypes.AUth_REDIRECT_PATH, data: path}),
      onProductAdd: (product) => dispatch({ type: actionTypes.ADD_PRODUCT_TO_CART, product: product}),
      onProductReduce: (product) => dispatch({ type: actionTypes.REDUCE_PRODUCT_TO_CART, product: product})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
