import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController.js";
import { catchErrors } from "../utils/catchErrors.js";

const router = Router()

router.get('/', catchErrors(ProfileController.getProfile))

export default router