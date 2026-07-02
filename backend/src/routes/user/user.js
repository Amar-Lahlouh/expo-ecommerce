import Router from "express";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../../controllers/user/address.js";
import { protectRoute } from "../../middleware/auth.js";
import {
  addToWishList,
  getWishlist,
  removeFromWishList,
} from "../../controllers/user/wishlist.js";
const router = Router();
router.use(protectRoute);
// Addresses PART
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses/:idaddress", updateAddress);
router.delete("/addresses/:id", deleteAddress);

//wishlist route
router.post("/wishlist", addToWishList);
router.delete("/wishlist/:productId", removeFromWishList);
router.get("/wishlist", getWishlist);

export default router;
