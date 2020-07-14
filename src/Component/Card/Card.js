import React from 'react';

import classes from './Card.module.css'

function Card(props) {
   let description = (props.discrip).length > 180 ? (props.discrip).substring(0, (props.discrip).indexOf(' ', 170)) + ' ...' : props.discrip;

   return (
      <div className={classes.card}>
         <div className={classes.cardImage}>
            <img src={props.img} alt="Products" />
         </div>
         <div className={classes.cardDescription}>
            <h4 className={classes.cardTitle}>{props.title}</h4>
            <p>
               {description}
            </p>
         </div>
         <div className={classes.cardFooter}>
            <span>${props.price}</span>
            <span onClick={props.clicked}>Add to Cart</span>
         </div>
      </div>
   )
}

export default Card
