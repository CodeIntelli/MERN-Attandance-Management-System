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

export const attendanceReducer = (state = { attendance: {} }, action) => {
  switch (action.type) {
    case NEW_ATTENDANCE_REQUEST:
      return {
        loading: true,
      };
    case NEW_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const specificUserAttandanceReducer = (
  state = { attendance: [] },
  action
) => {
  switch (action.type) {
    case SPECIFIC_USER_ATTENDANCE_REQUEST:
      return {
        loading: true,
        attendance: [],
      };
    case SPECIFIC_USER_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        attendance: action.payload,
      };
    case SPECIFIC_USER_ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAttendanceRecord = (state = { attendance: [] }, action) => {
  switch (action.type) {
    case LOGIN_USER_ATTENDANCE_REQUEST:
    case ALL_USER_ATTENDANCE_REQUEST:
      return {
        loading: true,
        attendance: [],
      };
    case LOGIN_USER_ATTENDANCE_SUCCESS:
    case ALL_USER_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        attendance: action.payload,
      };
    case LOGIN_USER_ATTENDANCE_FAIL:
    case ALL_USER_ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
