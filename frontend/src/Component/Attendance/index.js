import React, { useState } from "react";
import "./style.css";
import { useStopwatch } from "react-timer-hook";
import { useSelector, useDispatch } from "react-redux";
import { createAttendance } from "../../Actions/attandanceAction";
const Index = () => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart: false,
  });
  const dispatch = useDispatch();
  const [inTime, setInTime] = useState("");
  const [outTime, setoutTime] = useState("");
  const [inEntry, outEntry] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const { user } = useSelector((state) => state.user);
  // console.log("user", user._id);
  let userData = {};
  const handelInTime = () => {
    let date = new Date().toLocaleString();

    setInTime(date);
    start();
    outEntry(false);
  };
  const handleOutTime = () => {
    let date = new Date().toLocaleString();
    setoutTime(date);
    pause();
    outEntry(true);
    let timer = hours + ":" + minutes + ":" + seconds;
    let outTime = date;
    userData = {
      inTime: inTime,
      outTime,
      timer,
      user: user._id,
    };
    dispatch(createAttendance(inTime, outTime, user._id, timer));
    // console.log("user", userData);
    if (true) {
      setShowButton(false);
    }
  };
  return (
    <>
      Attendance Page
      <div className="attandanceContainer">
        <div className="attandanceBox">
          <p>In Time:- </p>
          <h1>{inTime}</h1>
          <p>Out Time:-</p>
          <h1>{outTime}</h1>
          <p>Timer:-</p>
          <h3>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </h3>
          <p>{isRunning ? "Running" : "Not running"}</p>
          {showButton ? (
            inEntry ? (
              <>
                <button onClick={handelInTime} className="attandanceBtn">
                  IN
                </button>
              </>
            ) : (
              <>
                <button onClick={handleOutTime} className="attandanceBtn">
                  Out
                </button>
              </>
            )
          ) : (
            ""
          )}

          <p>
            {!showButton
              ? "you already submmited attendance "
              : "Plz submit attendance"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
