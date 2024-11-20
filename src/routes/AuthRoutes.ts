import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

import { validateRegisterAuthMidleware, validateLoginAuthMidleware } from "../midlewares/AuthMidlewares";
import { isAuthenticated } from "../midlewares/IsAuthenticated";
import { isGod } from "../midlewares/IsGod";
import { verifyUUID } from "../midlewares/ProfileMidlewares";

import { catchErrors } from "../utils/catchErrors";

const router = Router();

router.post('/register', [validateRegisterAuthMidleware], catchErrors(AuthController.register))
router.post('/login', [validateLoginAuthMidleware], catchErrors(AuthController.login))

router.put('/change-role/:uuid', [isAuthenticated, verifyUUID, isGod], catchErrors(AuthController.switchRole))

export default router;