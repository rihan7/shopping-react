import React from 'react';
import { Link } from 'react-router-dom'

import classes from './ShoppingSummary.module.css'

function ShoppingSummary(props) {
   return (
      <div className={classes.shoppingSummary}>
         <Link to='/'>
            <header>Continue Shopping</header>
         </Link>
         <h3>Order Summary</h3>
         <hr />
         <div className={classes.summary}>
            <p>Sub-Total: </p>
            <p>${props.totalPrice}</p>
         </div>
         <div className={classes.summary}>
            <p>Shipping: </p>
            <p>$0</p>
         </div>
         <div className={classes.summary}>
            <p>Tax: </p>
            <p>$0</p>
         </div>
         <div className={classes.summary}>
            <p><strong>Total:</strong></p>
            <p><strong>${props.totalPrice}</strong></p>
         </div>
         {/* <Link to='/checkout'> */}
            <header onClick={props.checkoutClicked}>CheckOut</header>
         {/* </Link> */}
      </div>
   )
}

export default ShoppingSummary
