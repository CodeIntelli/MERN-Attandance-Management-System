import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import {
  Home,
  Header,
  LoginSignup,
  UserOption,
  Profile,
  ProtectedRoute,
  EditProfile,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  AttendanceList,
  Attendance,
  UsersList,
  UpdateUser,
  AllUsersAttendance,
  SpecificUserAttendance,
} from "./Component";
import { loadUser } from "./Actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Route exact path="/" component={Home} />
        <Route exact path="/account" component={LoginSignup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
        <ProtectedRoute
          exact
          path="/password/edit"
          component={ChangePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/attendance" component={Attendance} />
        <ProtectedRoute
          exact
          path="/attendancelist"
          component={AttendanceList}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
        <ProtectedRoute
          exact
          path="/admin/alluser"
          isAdmin={true}
          component={AllUsersAttendance}
        />
        <ProtectedRoute
          exact
          path="/admin/userattendance/:id"
          isAdmin={true}
          component={SpecificUserAttendance}
        />
      </Router>
    </>
  );
};

export default App;
