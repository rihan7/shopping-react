import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
   CardElement,
   Elements,
   useStripe,
   useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { connect } from 'react-redux';

import classes from './paymentForm.module.css';
import { checkOutPost } from '../../Store/action/ActionCreator';
import * as actionTypes from '../../Store/actionTypes'

const CheckoutForm = (props) => {
   const [personalDets, setPersonalDets] = useState({})
   const [formState, setFormState] = useState(false);
   const [formError, setFormError] = useState('');

   const stripe = useStripe();
   const elements = useElements();

   const handleSubmit = async event => {
      event.preventDefault();
      try {
         setFormState(true);
         const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: personalDets
         });


         if (error) {
            setFormState(false);
            error.type === 'validation_error' ? setFormError('Invalid Card') : setFormError('Enter all shipping & billing information')
         } else {
            await props.sendCheckoutData(paymentMethod.id, personalDets);
            setFormState(false);
            props.purchaseSuccess();
            props.history.push('/success');
         }
      } catch (error) {
         setFormState(false);
         setFormError(error.response.data.message)
      }
   };

   const onchangeHandler = event => {
      let addr = new Set(['name', 'email', 'phone'])
      let field = event.target.name;
      let value = event.target.value;
      
      if (addr.has(field)) {
         setPersonalDets(prevState => {
            return {
               ...prevState,
               [field]: value
            }
         })
      } else  {
         setPersonalDets(prevState => {
            return {
               ...prevState,
               address: {
                  ...prevState.address,
                  [field]: value
               }
            }
         })
      }
      setFormError('')
   }

   return (
      <div className="container" >
         {formError ? <div className={classes.error}>{formError}</div> : null}
         <form onSubmit={handleSubmit} >
            <h5>SHIPPING & BILLING INFORMATION</h5>
            <div className={classes.element}>
               <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Md. Abu Taher" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="taher@example.com" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>Phone</span>
                  <input type="number" name="phone" placeholder="+88 0190 000000" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>Address</span>
                  <input type="text" name="line1" placeholder="500 Jatrabari" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>City</span>
                  <input type="text" name="city" placeholder="Dhaka" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>State</span>
                  <input type="text" name="state" placeholder="Dhaka" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>Zip</span>
                  <input type="number" name="postal_code" placeholder="1234" onChange={event => onchangeHandler(event)} />
               </label>
               <label>
                  <span>Country</span>
                  <input type="text" name="country" placeholder="BD" onChange={event => onchangeHandler(event)} />
               </label>
            </div>
            <h5>PAYMENT INFORMATION</h5>
            <CardElement className={classes.element} />
            <button type="submit" disabled={!stripe || formState} >
               Pay ${props.totalPrice}
      </button>
         </form>
      </div>
   );
};

const stripePromise = loadStripe("pk_test_EsKlwdzy2CNOPPlMwOIkt3Ja00l09oZ9EP");

const Checkout = (props) => (
   <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
   </Elements>
);

const mapStateToProps = (state) => {
   return {
      totalPrice: state.shopping.totalPrice
   }
}

const mapDispatchToProps = dispatch => {
   return {
      sendCheckoutData: (id, details) => dispatch(checkOutPost(id, details)),
      purchaseSuccess: () => dispatch({ type: actionTypes.PURCHASE_SUCCESS})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);