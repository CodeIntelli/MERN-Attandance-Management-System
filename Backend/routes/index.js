import express from "express";
let routes = express.Router();
import { userController, attenDanceController } from "../controller";
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
  "/attendees/inOut",
  isAuthenticatedUser,
  attenDanceController.createAttenDance
);
routes.post(
  "/attendees/get",
  isAuthenticatedUser,
  attenDanceController.getAttendance
);
export default routes;
