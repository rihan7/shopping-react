import * as actionsTypes from '../actionTypes'

const initialState = {
   user: null,
   loading: false,
   token: null,
   expiresIn: null,
   error: null,
   redirectLink: '/'
}

const authStatus = (state, data) => {
   return {
      ...state,
      ...data
   }
}

const auth = (state, data) => {
   return {
      ...state,
      token: data.token,
      expiresIn: data.expiresIn,
      user: data.email
   }
}

const setAuthRedirectPath = (state, data) => {
   return {
      ...state,
      redirectLink: data
   }
}

const logOut = (state) => {
   return {
      ...state,
      user: null,
      loading: false,
      token: null,
      expiresIn: null,
      error: null,
      redirectLink: '/'
   }
}




const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionsTypes.AUTH_STATUS: return authStatus(state, action.data)
      case actionsTypes.GET_AUTH: return auth(state, action.data)
      case actionsTypes.AUth_REDIRECT_PATH: return setAuthRedirectPath(state, action.data)
      case actionsTypes.LOG_OUT: return logOut(state)
      default: return state;
   }
}

export default reducer;