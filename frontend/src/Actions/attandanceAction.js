import axios from "axios";
import Cookies from "js-cookie";
import Cookie from "js-cookie";

import {
  NEW_ATTENDANCE_FAIL,
  NEW_ATTENDANCE_REQUEST,
  NEW_ATTENDANCE_SUCCESS,
  LOGIN_USER_ATTENDANCE_REQUEST,
  LOGIN_USER_ATTENDANCE_SUCCESS,
  LOGIN_USER_ATTENDANCE_FAIL,
  ALL_USER_ATTENDANCE_FAIL,
  ALL_USER_ATTENDANCE_REQUEST,
  ALL_USER_ATTENDANCE_SUCCESS,
  SPECIFIC_USER_ATTENDANCE_FAIL,
  SPECIFIC_USER_ATTENDANCE_REQUEST,
  SPECIFIC_USER_ATTENDANCE_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/attandanceConstance";

const token_Data = Cookies.get("token");
let config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token_Data}`,
  },
};
export const createAttendance =
  (inTime, outTime, user, timer) => async (dispatch) => {
    try {
      dispatch({ type: NEW_ATTENDANCE_REQUEST });
      // console.log(
      //   "in time" + inTime,
      //   "outTime" + outTime,
      //   "user" + user,
      //   "timer" + timer
      // );
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/attendances/new`,
        { inTime, outTime, timer, user },
        config
      );
      // console.log(data);
      dispatch({
        type: NEW_ATTENDANCE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_ATTENDANCE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get attendances
export const getUserAttendance = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_ATTENDANCE_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/attendances`,
      config
    );
    // console.log(data);
    dispatch({ type: LOGIN_USER_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ATTENDANCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get attendances
export const getSpecificUserAttendance = (id) => async (dispatch) => {
  try {
    dispatch({ type: SPECIFIC_USER_ATTENDANCE_REQUEST });
    // console.log(id);
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/attendances/${id}`,
      config
    );
    // console.log(data);
    dispatch({ type: SPECIFIC_USER_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SPECIFIC_USER_ATTENDANCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUserAttendance = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_ATTENDANCE_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/records`,
      config
    );
    // console.log(data);
    dispatch({ type: ALL_USER_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_USER_ATTENDANCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
