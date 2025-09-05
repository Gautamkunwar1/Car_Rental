import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { addCar, changeRoleToOwner } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();
adminRouter.post("/change-role",protect,changeRoleToOwner);
adminRouter.post("/add-car",upload.single("image"),protect,addCar);
export default adminRouter;