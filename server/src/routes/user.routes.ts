import { Router } from "express";
import { userController } from "../config/container";
import { authenticated, authorized } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  userController.getAllUser,
);
router.get("/me", authenticated, userController.getCurrentUser);
router.get(
  "/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  userController.getUserById,
);
router.put("/", authenticated, userController.updateUserName);
router.put("/email", authenticated, userController.updateUserEmail);
router.put("/password", authenticated, userController.updateUserPassword);
router.delete(
  "/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  userController.deleteUser,
);

export default router;
