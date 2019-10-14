import axios from 'axios';
import { USER_SIGNED_IN, USER_SIGN_IN_FAILED, USER_SIGNED_UP, USER_SIGN_UP_FAILED, USER_SIGNED_OUT } from '../types/types';
import { HOST_URL } from "../../constants";

// user sign in
export const signIn = (user) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/user/sign-in', user);
    if(!res.data[0]) {
      dispatch({
        type: USER_SIGN_IN_FAILED
      });
    } else {
      dispatch({
        type: USER_SIGNED_IN,
        payload: res.data
      });
    }
  } catch(err) {
    dispatch({
      type: USER_SIGN_IN_FAILED
    });
  }
};

// user sign out
export const signOut = (user) => async dispatch => {
  dispatch({
    type: USER_SIGNED_OUT
  });
};

// user sign up
export const signUp = (user) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/user/sign-up', user);
    dispatch({
      type: USER_SIGNED_UP,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: USER_SIGN_UP_FAILED
    });
  }
};