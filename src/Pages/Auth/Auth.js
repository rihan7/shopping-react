import React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaUserAlt, } from 'react-icons/fa';
import { MdMail, MdLockOutline } from 'react-icons/md';
import { useState } from 'react';

import { getAuth } from '../../Store/action/ActionCreator'
import classes from './Auth.module.css';
import Loading from '../../Component/Loading/Loading';
import Axios from '../../Axios'
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler'

function Auth(props) {
   const [isSignUp, setIsSignUp] = useState(false);
   const [formData, setFormData] = useState({ email: '', password: '' });

   const checkIsSignUp = () => {
      setIsSignUp(!isSignUp);
   }

   const onFormValueChange = (event, input) => {
      const value = event.target.value
      setFormData(prevState => {
         return {
            ...prevState,
            [input]: value
         }
      })
   }

   const onAuthentication = () => {
      props.auth(formData, isSignUp)
   }

   let authRedirect = null;
   if (props.isAuthenticate) {
      authRedirect = <Redirect to={props.redirectTo} />
   }

   return (
      <div className={classes.authContainer}>
         {authRedirect}
         {props.loading ?
            <Loading loading="circle" /> :
            <div className={classes.auth}>
               <FaUserAlt />
               <div className={classes.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</div>
               <div className={classes.fields}>
                  <div className={classes.username}>
                     <MdMail />
                     <input type="email" className={classes.userInput} placeholder="Email" onChange={(event) => onFormValueChange(event, 'email')} />
                  </div>
                  <div className={classes.username}>
                     <MdLockOutline />
                     <input type="password" className={classes.passInput} placeholder="Password" onChange={(event) => onFormValueChange(event, 'password')} />
                  </div>
               </div>
               <button className={classes.signinButton} onClick={onAuthentication} >{isSignUp ? 'Sign Up' : 'Sign In'}</button>
               <div className={classes.link}>
                  <NavLink to="#">Forgot password?</NavLink> <strong>or</strong> <p onClick={checkIsSignUp}>{isSignUp ? 'Sign In' : 'Sign Up'}</p>
               </div>
            </div>
         }
      </div>
   )
}

const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      isAuthenticate: !!state.auth.token,
      redirectTo: state.auth.redirectLink
   }
}

const mapDispatchToProps = dispatch => {
   return {
      auth: (formData, method) => dispatch(getAuth(formData, method))
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Auth, Axios));
