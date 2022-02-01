import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./userList.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import {
  getAllUserAttendance,
  clearErrors,
} from "../../Actions/attandanceAction";
import { Link } from "react-router-dom";

const AllUsersAttendance = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, attendance, loading } = useSelector(
    (state) => state.getAttendance
  );
  // console.log(attendance);
  const columns = [
    {
      field: "id",
      headerName: "Attendance ID",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "in",
      headerName: "In Time",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "out",
      headerName: "Out Time",
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: "timer",
      headerName: "Total",
      minWidth: 250,
      flex: 0.5,
    },
  ];

  const rows = [];
  attendance &&
    attendance.forEach((item) =>
      rows.push({
        id: item._id,
        name: item.user.name,
        email: item.user.email,
        in: item.inTime,
        out: item.outTime,
        timer: item.timer,
      })
    );

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllUserAttendance());
  }, [dispatch, alert, error, history]);

  return (
    <>
      <MetaData title={`Admin | All Records`} />
      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">All User's Records</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default AllUsersAttendance;
