import React from 'react'
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { connect } from 'react-redux';

import classes from './DropDown.module.css';
import DropdownItem from './DropdownItem/DropdownItem';
import { logOut } from '../../../Store/action/ActionCreator';

function DropDown(props) {
   return (
      <div className={classes.dropdown} >
         <DropdownItem link="/profile" ><AiOutlineUser /> Profile</DropdownItem>
         <DropdownItem link='#' clicked={props.logout} ><AiOutlineLogout /> Logout</DropdownItem>
      </div>
   )
}

const mapDispatchToProps = dispatch => {
   return {
      logout: () => dispatch(logOut())
   }
}

export default connect(null, mapDispatchToProps)(DropDown)
