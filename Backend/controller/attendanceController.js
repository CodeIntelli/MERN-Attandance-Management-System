import { attenDance } from "../models";
import ErrorHandler from "../utils/errorHandler";

const attenDanceController = {
  async createAttenDance(req, res, next) {
    if (req.body.type === "create") {
      try {
        let createJson = {
          startDate: new Date(),
          user: req.user.id,
          endDate: null,
        };
        let resItem = await attenDance.create(createJson);
        return res.status(200).json({ success: true, resItem });
      } catch (err) {
        return next(new ErrorHandler(err, 500));
      }
    }
    if (req.body.type === "update") {
      let updateJson = {
        endDate: new Date(),
      };
      await attenDance
        .findByIdAndUpdate(req.body._id, {
          $set: updateJson,
        })
        .exec((err, item) => {
          if (err) {
            return next(new ErrorHandler(err, 500));
          }
          if (!item) {
            return next(new ErrorHandler("Invalid item", 500));
          } else {
            return res.status(200).json({ success: true });
          }
        });
    }
  },
  async getAttendance(req, res, next) {
    if (!req.body.currentDate && !req.body.tomorrowDate) {
      return next(new ErrorHandler("currentDate is required", 500));
    }
    await attenDance
      .findOne({
        startDate: {
          $gte: req.body.currentDate,
          $lt: req.body.tomorrowDate,
        },
      })
      .exec((err, item) => {
        if (err) {
          return next(new ErrorHandler(err, 500));
        }
        if (!item) {
          return next(new ErrorHandler("item is invalid", 500));
        }
        if (item) {
          item = item.toJSON();
          if (item.startDate) {
            item.in = true;
          }
          if (item.endDate) {
            item.out = true;
          }
          return res.status(200).json({ success: true, item: item });
        }
      });
  },
};

export default attenDanceController;
