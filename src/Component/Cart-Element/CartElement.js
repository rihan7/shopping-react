import React from 'react'
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import classes from './CartElement.module.css'

function CartElement(props) {
   return (
      <div>
         <div className={classes.shoppingCartEle}>
            <img src={props.item.imagePath} alt="itemImg" />
            <h5>{props.item.title} </h5>
            <p>${props.item.price}</p>
            <span>
               <FaAngleUp onClick={() => props.upClicked(props.item)} />
               <p>{props.qty}</p>
               <FaAngleDown onClick={() => props.downClicked(props.item)} />
            </span>
            <p>Total: ${props.price}</p>
         </div>
         <hr />
      </div>
   )
}

export default CartElement
