import { Router } from "express";
import { validate } from "../middlewares/zodValidate.middleware";
import { addressSchema, updateAddressSchema } from "../schemas/address.schema";
import { authenticated } from "../middlewares/auth.middleware";
import { authorized } from "../middlewares/auth.middleware";
import { addressController } from "@/controllers/address.controller";

const router = Router();

router.post(
  "/create-address",
  authenticated,
  authorized(["CUSTOMER"]),
  validate(addressSchema),
  addressController.createAddress,
);
router.get(
  "/get-user-addresses",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  addressController.getUserAddresses,
);
router.get(
  "/get-address/:id",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  addressController.getAddress,
);
router.put(
  "/update-address/:id",
  authenticated,
  authorized(["CUSTOMER"]),
  validate(updateAddressSchema),
  addressController.updateAddress,
);
router.put(
  "/set-default-address/:id",
  authenticated,
  authorized(["CUSTOMER"]),
  addressController.setDefaultAddress,
);
router.delete(
  "/delete-address/:id",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  addressController.deleteAddress,
);

export default router;
