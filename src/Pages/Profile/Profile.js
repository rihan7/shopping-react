import React, { useState, useEffect } from 'react'

import classes from './Profile.module.css';
import axios from '../../Axios';
import Loading from '../../Component/Loading/Loading';
import { Link } from 'react-router-dom';
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler'
import { connect } from 'react-redux';
import { useCallback } from 'react';



function OrderHistory(props) {
   const [loading, setLoading] = useState(false);
   const [orders,  setOrders] = useState([]);
   
   const getOrders = useCallback(async () => {
      setLoading(true)
      let { data } = await axios.post('/user/profile', { user: props.user });

      let dataArray = Array.from(data).map(order => {
         return {
            id: order._id,
            totalPrice: order.cart.totalPrice,
            totalQty: order.cart.totalQty,
            items: Object.keys(order.cart.items).map(id => {
               return order.cart.items[id]
            }),
            date: order.paymentDate
         }
      })
      setOrders(dataArray);
      setLoading(false)
   }, [props.user])

   useEffect(() => {
      getOrders();
   }, [getOrders]);

   let list = null;
   if(loading) {
      list = <Loading loading="block" />
   }

   if(orders.length > 0) {
      list = orders.map(order => (
         <div key={order.id} className={classes.orderList} >
            <p>Order Date: {order.date}</p>
            {order.items.map( item => (
               <Item item={item} key={item.item._id} />
            ))}

            <div className={classes.subTotal} >
               <p><Link to={`invoice/${order.id}`} >ID: {order.id}</Link></p>
               <p>Total Quantity: {order.totalQty}</p>
               <p>Total Price: {order.totalPrice}</p>
            </div>
         </div>
      ))
   }
   if (!loading && orders.length <= 0) {
      list = <div className={classes.noOrder}>There Is No Order Yet</div>
   }
   
   return (
      <div className={classes.OrderHistoryContainer} >
         {list}
      </div>
   )
}

function Item(props) {
   return (
      <div className={classes.order} >
         <h4>{props.item.item.title}</h4>
         <p>{props.item.qty} {props.item.qty > 1 ? 'Units' : 'Unit'}</p>
         <p>Total Price: ${props.item.price}</p>
      </div>
   )
}

const mapStateToProps = state => {
   return {
      user: state.auth.user
   }
}

export default connect(mapStateToProps)(ErrorHandler(OrderHistory, axios));
