import express from 'express';
import { getBuses } from '../controller/bus.js';
import { login, register, addBus, updateBus, deleteBus, userLogout } from "../controller/user.js";
import { isAdmin, isUser } from '../middleware/auth.js';

const router = express.Router();


router.post("/login", login)
router.post("/register", register)
router.get("/logout",isUser, userLogout)
router.post("/admin/bus/add", isAdmin, addBus)
router.put("/admin/bus/update/:id", isAdmin, updateBus)
router.delete("/admin/bus/delete/:id", isAdmin, deleteBus)


router.get("/user/buses", isUser, getBuses);

export default router;