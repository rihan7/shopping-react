import React from 'react';

import classes from './Loading.module.css'

function Loading(props) {
   if (props.loading === 'circle') {
      return (
         <div className={classes.spinner}>
            <div className={classes.doubleBounce1}></div>
            <div className={classes.doubleBounce2}></div>
         </div>
      )
   }

   if (props.loading === 'block') {
      return (
         <div className={classes.skCubeGrid}>
            <div className={[classes.skCube, classes.skCube1].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube2].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube3].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube4].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube5].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube6].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube7].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube8].join(' ')}></div>
            <div className={[classes.skCube, classes.skCube9].join(' ')}></div>
         </div>
      )
   }


}

export default Loading
