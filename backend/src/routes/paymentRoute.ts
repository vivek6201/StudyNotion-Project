import express from "express";
import paymentController, { paymentWebhook } from "../controllers/otherControllers/paymentControllers";
import { isAuth, isStudent } from "../middlewares/auth";

const router = express.Router();

router.post("/create-checkout-session", isAuth, isStudent, paymentController);
router.post("/webhook", express.raw({type: 'application/json'}), paymentWebhook);

export default router;
