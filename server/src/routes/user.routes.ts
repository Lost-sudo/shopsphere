import { Router } from "express";
import { authenticated, authorized } from "../middlewares/auth.middleware";
import { userController } from "@/controllers/user.controller";
import { validate } from "../middlewares/zodValidate.middleware";
import {
  adminCreateUserSchema,
  updateUserRoleSchema,
  updateUserEmailSchema,
  updateUserNameSchema,
  updateUserPasswordSchema,
} from "../schemas/user.schema";
const router = Router();

router.get(
  "/",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  userController.getAllUser,
);
router.post(
  "/",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(adminCreateUserSchema),
  userController.adminCreateUser,
);
router.get("/me", authenticated, userController.getCurrentUser);
router.get(
  "/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  userController.getUserById,
);
router.put(
  "/",
  authenticated,
  validate(updateUserNameSchema),
  userController.updateUserName,
);
router.put(
  "/email",
  authenticated,
  validate(updateUserEmailSchema),
  userController.updateUserEmail,
);
router.put(
  "/password",
  authenticated,
  validate(updateUserPasswordSchema),
  userController.updateUserPassword,
);
router.put(
  "/:id/role",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(updateUserRoleSchema),
  userController.updateUserRole,
);
router.delete(
  "/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  userController.deleteUser,
);

export default router;
