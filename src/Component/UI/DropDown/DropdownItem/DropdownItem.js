import React from 'react';
import { Link } from 'react-router-dom'

import classes from './DropdownItem.module.css'

function DropdownItem(props) {
   let { link, icon, children, clicked } = props
   return (
      <div className={classes.DropdownItem} onClick={clicked} >
         <Link to={link} >
            <span className="DropdownItemIcon" >{icon}</span>
            {children}
         </Link>
      </div>
   )
}

export default DropdownItem
