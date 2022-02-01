import React from "react";
import "./userOption.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import BadgeIcon from "@material-ui/icons/Assessment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import ListAltIcon from "@material-ui/icons/ListAlt";

import { useAlert } from "react-alert";
import { logout } from "../../../Actions/userAction.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
const UserOption = ({ user }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    {
      icon: <VisibilityIcon />,
      name: "View Records",
      func: dashboard,
    },
    { icon: <PersonIcon />, name: "Profile", func: account },

    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift(
      {
        icon: <SupervisedUserCircleIcon />,
        name: "All Users",
        func: AllUser,
      },
      {
        icon: <BadgeIcon />,
        name: "All Users Records",
        func: AllUserRecord,
      }
    );
  }

  function dashboard() {
    history.push("/attendancelist");
  }
  function AllUser() {
    history.push("/admin/users");
  }
  function AllUserRecord() {
    history.push("/admin/alluser");
  }
  function account() {
    history.push("/profile");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("logout Successfully");
    history.push("/");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: 11 }}
        className="speedDial"
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={
              user.avatar.url
                ? user.avatar.url
                : "http://localhost:3000/Profile.png"
            }
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOption;
