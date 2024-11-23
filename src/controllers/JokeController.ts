import { Request, Response } from "express"
import { success } from "../utils/responses.js"
import { JokeService } from "../services/JokeService.js"

const getJoke = async (req: Request, res: Response) => {
    const joke = await JokeService.getJoke()
    success(res, 200, '', joke)
}

export const JokeController = {
  getJoke
}