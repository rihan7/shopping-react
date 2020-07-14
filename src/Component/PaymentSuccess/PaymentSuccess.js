import React from 'react'

import classes from './PaymentSuccess.module.css'

function PaymentSuccess() {
   return (
      <div className={classes.success}>
            <h1>congrats!</h1>
            <p>your payment was successfully processed</p>
      </div>
   )
}

export default PaymentSuccess
