import { Router } from "express";

import AuthRouter from "./AuthRoutes"
import ProfileRouter from "./ProfileRoutes"
import UserRouter from "./UserRouter"

import { isAuthenticated } from "../midlewares/IsAuthenticated";
import { isGod } from "../midlewares/IsGod";

const router = Router()

router.use('/', AuthRouter)

router.use('/profile', [isAuthenticated], ProfileRouter)
router.use('/users', [isAuthenticated, isGod], UserRouter)

export default router;
