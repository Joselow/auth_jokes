import { Router } from "express";

import { AuthController } from "../controllers/AuthController.js";

import { validateRegisterAuthMidleware, validateLoginAuthMidleware } from "../midlewares/AuthMidlewares.js";
import { isAuthenticated } from "../midlewares/IsAuthenticated.js";
import { isGod } from "../midlewares/IsGod.js";
import { verifyUUID } from "../midlewares/ProfileMidlewares.js";

import { catchErrors } from "../utils/catchErrors.js";

const router = Router();

router.post('/register', [validateRegisterAuthMidleware], catchErrors(AuthController.register))
router.post('/login', [validateLoginAuthMidleware], catchErrors(AuthController.login))

router.put('/change-role/:uuid', [isAuthenticated, verifyUUID, isGod], catchErrors(AuthController.switchRole))

export default router;