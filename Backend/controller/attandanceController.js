import { attenDance } from "../models";
import { ErrorHandler } from "../utils";
const attandanceController = {
  async createAttendance(req, res, next) {
    try {
      // console.log(req.body);
      const { inTime, outTime, timer, user } = req.body;

      const attendance = await attenDance.create({
        inTime: inTime,
        outTime: outTime,
        timer,
        user,
      });
      // console.log(attendance);
      res.status(200).json({ success: true });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  async loginUserAttendance(req, res, next) {
    try {
      // console.log(req.user._id);
      const attendance = await attenDance.find({ user: req.user._id });
      res.json(attendance);
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  async specificAttendance(req, res, next) {
    try {
      // console.log(req.user._id);
      const attendance = await attenDance
        .find({ user: req.params.id })
        .populate({ path: "user", select: "name email" });
      res.json(attendance);
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  async allUserAttendance(req, res, next) {
    try {
      // console.log(req.user._id);
      const attendance = await attenDance
        .find()
        .populate({ path: "user", select: "name email" });
      res.json(attendance);
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
};
export default attandanceController;
