import React from "react";
import { getUserAttendance, clearErrors } from "../../Actions/attandanceAction";
import "./attendanceList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import {} from "../../Constants/productConstant";
const AttendanceList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, attendance, loading } = useSelector(
    (state) => state.getAttendance
  );
  // console.log(attendance);
  const { user } = useSelector((state) => state.user);
  const columns = [
    {
      field: "id",
      headerName: "Attendance ID",
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

    dispatch(getUserAttendance());
  }, [dispatch, alert, error, history]);

  return (
    <>
      <MetaData title={`Admin | All Records`} />
      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">All {`${user.name}`} Records</h1>
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

export default AttendanceList;
