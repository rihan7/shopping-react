import React, { useState, useEffect } from 'react'

import { store } from '../../index';
import Modal from '../../Component/Modal/Modal';


const errorHandler = (WrappedComponent, axios) => {
   return props => {
      const [error, setError] = useState(null);

      const axiosReq = axios.interceptors.request.use(req => {
         const token = store.getState().auth.token;
         req.headers.Authorization = token;
         setError(null);
         return req;
      });

      const axiosRes = axios.interceptors.response.use(
         res => {
            return res
         },
         err => {
            setError(err.response.data);
            return Promise.reject(err);
         });

      useEffect(() => {
         return () => {
            axios.interceptors.response.eject(axiosReq);
            axios.interceptors.response.eject(axiosRes);
         }
      }, [axiosReq, axiosRes]);

      const setErrorHandler = () => {
         setError(null);
      }

      return (
         <div>
            <Modal show={!!error} errorHandler={setErrorHandler} >
               {!!error ?
                  error.message ? error.message : 'Something Wrong'
                  : null}
            </Modal>
            <WrappedComponent {...props} />
         </div>
      )
   }
}

export default errorHandler
