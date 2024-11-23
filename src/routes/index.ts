import { Router } from "express";

import AuthRouter from "./AuthRoutes.js"
import ProfileRouter from "./ProfileRoutes.js"
import UserRouter from "./UserRouter.js"
import JokeRouter from "./JokeRouter.js"

import { isAuthenticated } from "../midlewares/IsAuthenticated.js";
import { isGod } from "../midlewares/IsGod.js";

const router = Router()

router.use('/', AuthRouter)

router.use('/profile', [isAuthenticated], ProfileRouter)
router.use('/users', [isAuthenticated, isGod], UserRouter)
router.use('/my-joke', [isAuthenticated], JokeRouter)

export default router;
