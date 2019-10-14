import { USER_SIGNED_IN, USER_SIGN_IN_FAILED, USER_SIGNED_UP, USER_SIGN_UP_FAILED, USER_SIGNED_OUT } from "../types/types";

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_SIGNED_IN:
          return {
            ...state,
            user: payload,
            isAuthenticated: true
          };
        case USER_SIGN_IN_FAILED:
          return {
            ...state,
            user: null,
            isAuthenticated: false
          };
        case USER_SIGNED_OUT:
          return {
            user: null,
            isAuthenticated: false
          };
        case USER_SIGNED_UP:
          return {
            ...state,
            user: payload,
            isAuthenticated: true
          };
        case USER_SIGN_UP_FAILED:
          return {
            ...state,
            user: null,
            isAuthenticated: false
          };
        default:
          return state;
    }
}