import { Router } from "express";

import { UserController } from "../controllers/UserController.js";
import { catchErrors } from "../utils/catchErrors.js";

const router = Router()

router.get('/', catchErrors(UserController.getUsers))

export default router