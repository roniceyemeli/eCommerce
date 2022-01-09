import {REGISTER, LOGIN, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, } from "./actionTypes";

const userState = {
    accessToken: null,
    loading: false,
    errors: null,
    user: null
}

export const userReducer = (state = userState, { type, payload }) => {
    switch (type) {
      case REGISTER:
      case LOGIN:
        return {
          ...state,
          loading: true,
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          errors: payload,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: payload,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          accessToken: payload,
        };
      default:
        return state;
    }
  };