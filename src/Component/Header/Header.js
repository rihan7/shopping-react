import React from 'react'
import { useState } from 'react';
import { FaShoppingCart, FaUserAlt, FaCaretDown } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Header.module.css';
import DropDown from '../UI/DropDown/DropDown'
import { logOut } from '../../Store/action/ActionCreator';
import Sidebar from '../SideBar/Sidebar';


function Header(props) {
   const [dropDownOpen, setDropdownOpen] = useState(false);
   const [sideBar, setSideBar] = useState(false);
   let totalQty = props.totalQty > 0 ? <span className={classes.badge}>{props.totalQty}</span> : '';

   return (
      <div>
         <div className={classes.header}>
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
               {props.isAuthenticate ?
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
            <div className={classes.navCollapse} onClick={() => setSideBar(!sideBar)} >
               <div></div>
               <div></div>
               <div></div>
            </div>
         </div>
         <Sidebar backdropClicked={() => setSideBar(!sideBar)} show={sideBar} {...props} />
      </div>

   )
}

const mapStateToProps = state => {
   return {
      totalQty: state.shopping.totalQty,
      isAuthenticate: !!state.auth.token
   }
}

const mapDispatchToProps = dispatch => {
   return {
      logOut: () => dispatch(logOut())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
