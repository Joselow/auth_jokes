import { Router } from "express";
import { validateRegisterAuthMidleware, validateLoginAuthMidleware } from "../midlewares/AuthMidlewares";
import { AuthController } from "../controllers/AuthController";
import { catchErrors } from "../utils/catchErrors";

const router = Router();

router.post('/register', [validateRegisterAuthMidleware], catchErrors(AuthController.register))
router.post('/login', [validateLoginAuthMidleware], catchErrors(AuthController.login))

export default router;