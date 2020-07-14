import * as actionTypes from '../actionTypes';
import axios from '../../Axios'


export const getProducts = () =>
   async dispatch => {
      try {
         dispatch({ type: actionTypes.LOAD_PRODUCTS, data: { loading: true } })
         const products = await axios.get('/');
         dispatch({ type: actionTypes.LOAD_PRODUCTS, data: { allProducts: products.data, loading: false } })
      } catch (error) {
         dispatch({ type: actionTypes.LOAD_PRODUCTS, data: { loading: false } })
      }
   }

export const logOut = () => {
   localStorage.removeItem('authData');
   return {
      type: actionTypes.LOG_OUT
   }
}

const authTimeOut = (time) =>
   dispatch => {
      setTimeout(() => {
         dispatch(logOut())
      }, time)
   }

export const authCheck = () =>
   dispatch => {
      let { email, token, expiresIn } = JSON.parse(localStorage.getItem('authData') || "{}");
      let remainingTime = expiresIn - new Date().getTime();
      if (token && remainingTime !== null) {
         dispatch(authTimeOut(remainingTime))
         dispatch({ type: actionTypes.GET_AUTH, data: { email, token, expiresIn } })
      } else {
         dispatch(logOut());
      }
   }

export const getAuth = (data, method) =>
   async dispatch => {
      try {
         const endPoint = method ? 'signup' : 'signin';
         dispatch({ type: actionTypes.AUTH_STATUS, data: { loading: true, error: null } })
         const auth = await axios.post('/user/' + endPoint, data);
         localStorage.setItem('authData', JSON.stringify(auth.data));
         let remainingTime = auth.data.expiresIn - new Date().getTime();
         dispatch(authTimeOut(remainingTime));

         dispatch({ type: actionTypes.AUTH_STATUS, data: { loading: false, error: null } })
         dispatch({ type: actionTypes.GET_AUTH, data: auth.data })


         // axios.post('/user/' + endPoint, data)
         //    .then(res => {
         //       console.log(res)
         //    })
         //    .catch(error => {
         //       console.log(error.response)
         //    });
      } catch (error) {
         console.log(error.response)
         dispatch({ type: actionTypes.AUTH_STATUS, data: { loading: false, error: error.response.data } })
      }
   }

export const checkOutPost = (id, details) =>
   async (dispatch, getState) => {
      let order = getState().shopping.items;
      let user = getState().auth.user;
      let currentTime = `${new Date()}`.split(' GMT')[0];
      const something = await axios.post('/checkout', { items: order, id: id, shippingAddress: details, user: user, time: currentTime });
      return something
   }













