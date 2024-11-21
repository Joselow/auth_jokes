import { Router } from "express";

import { UserController } from "../controllers/UserController.js";

const router = Router()

router.get('/', UserController.getUsers)

export default router