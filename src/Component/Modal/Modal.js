import React from 'react'

import Backdrop from '../UI/Backdrop/Backdrop';
import classes from './Modal.module.css'

function Modal(props) {
   return (
      <React.Fragment>
         <Backdrop show={props.show} clicked={props.errorHandler} />
         <div className={classes.Modal}
            style={{
               transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
               opacity: props.show ? '1' : '0'
            }}
         >
            {props.children}
            <button className={classes.button} onClick={props.errorHandler} >Ok</button>
         </div>
      </React.Fragment>
   )
}

export default React.memo(Modal)
