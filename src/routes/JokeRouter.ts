import { Router } from "express";
import { JokeController } from "../controllers/JokeController.js";
import { catchErrors } from "../utils/catchErrors.js";

const router = Router();

router.get('/', catchErrors(JokeController.getJoke))

export default router