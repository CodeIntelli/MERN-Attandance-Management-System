import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUserReducer,
  userDetailsReducer,
} from "./Reducers/userReducer";
import {
  attendanceReducer,
  getAttendanceRecord,
  specificUserAttandanceReducer,
} from "./Reducers/attandanceReducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  attendance: attendanceReducer,
  getAttendance: getAttendanceRecord,
  allUser: allUserReducer,
  userDetail: userDetailsReducer,
  specificUserAttandance: specificUserAttandanceReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
