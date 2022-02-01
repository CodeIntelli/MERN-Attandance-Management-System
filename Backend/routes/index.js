import express from "express";
let routes = express.Router();
import { userController, attandanceController } from "../controller";
import { isAuthenticatedUser, authorizationRoles } from "../middleware/auth";

// User Routes
routes.post("/Register", userController.registerUser);
routes.post("/Login", userController.login);
routes.post("/password/forgotpassword", userController.forgotPassword);
routes.put("/password/reset/:token", userController.resetPassword);
routes.get("/Logout", userController.logout);

// After Login this url is used for user
routes.get("/profile", isAuthenticatedUser, userController.getUserDetails);
routes.get(
  "/details",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.getAllUserDetails
);
routes.put(
  "/changePassword",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.updatePassword
);
routes.put(
  "/edit_profile",
  isAuthenticatedUser,
  userController.updateUserDetails
);
routes.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.getSingleUser
);
routes.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.updateUserRole
);
routes.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.deleteUser
);
routes.post(
  "/attendances/new",
  isAuthenticatedUser,
  attandanceController.createAttendance
);
routes.get(
  "/attendances",
  isAuthenticatedUser,
  attandanceController.loginUserAttendance
);
routes.get(
  "/attendances/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  attandanceController.specificAttendance
);

routes.get(
  "/records",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  attandanceController.allUserAttendance
);

// routes.post(
//   "/attendees/out",
//   isAuthenticatedUser,
//   attenDanceController.outAttendance
// );
// routes.post(
//   "/attendees/get",
//   isAuthenticatedUser,
//   attenDanceController.getAttendance
// );
// routes.post(
//   "/attendees/list",
//   isAuthenticatedUser,
//   attenDanceController.attendanceList
// );
export default routes;
