import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController.js";

const router = Router()

router.get('/', ProfileController.getProfile)

export default router