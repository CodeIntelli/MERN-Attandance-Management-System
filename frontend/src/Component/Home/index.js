import React from "react";
import { CgMouse } from "react-icons/all";

import "./style.css";

import MetaData from "../Layout/MetaData";
// import { clearErrors, getProduct } from "../../Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  // const { loading, err } = useSelector((state) => state.products || {});

  React.useEffect(() => {
    // if (err) {
    //   alert.error(err);
    //   dispatch(clearErrors());
    // }
    // dispatch(getProduct());
    // }, [dispatch, err, alert]);
  }, []);
  return (
    <>
      <MetaData title="Home" />
      <div className="banner">
        <p>Welcome to Attendance Management System</p>
        <h1>Login to Attendance Management System</h1>
        <Link to="/account">
          <button>
            Login <CgMouse />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
