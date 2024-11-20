import { Router } from "express";
import AuthRouter from "./AuthRoutes"

const router = Router()


router.use('/', AuthRouter)

export default router;
