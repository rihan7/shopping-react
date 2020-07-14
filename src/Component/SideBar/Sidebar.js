import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart, FaUserAlt, FaCaretDown } from "react-icons/fa";


import classes from './Sidebar.module.css'
import Backdrop from '../UI/Backdrop/Backdrop';
import DropDown from '../UI/DropDown/DropDown'


function Sidebar(props) {
   let { totalQty, isAuthenticate, show } = props;
   const [dropDownOpen, setDropdownOpen] = useState(false);
   const showClasses = show ? [classes.mobileNav, classes.translateRight] : [classes.mobileNav, classes.translateLeft];
   totalQty = props.totalQty > 0 ? <span className={classes.badge}>{props.totalQty}</span> : '';

   return (
      <div>
         {show && <Backdrop show clicked={props.backdropClicked} />}
         <div className={showClasses.join(' ')}>
            <div className={classes.brandName}>
               <NavLink to="/">
                  New Market
                  </NavLink>
            </div>
            <div className={classes.navList}>
               <div>
                  <NavLink to="/shopping-cart">
                     <FaShoppingCart /> Shopping Cart {totalQty}
                  </NavLink>
               </div>
               {isAuthenticate ?
                  <div>
                     <div onClick={() => setDropdownOpen(!dropDownOpen)} >
                        User <FaCaretDown />
                     </div>
                     {dropDownOpen && <DropDown />}
                  </div>
                  :
                  <div>
                     <NavLink to='/auth'><FaUserAlt /> Log In</NavLink>
                  </div>
               }
            </div>
         </div>
      </div>
   )
}

export default Sidebar
