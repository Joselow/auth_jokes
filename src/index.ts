import 'dotenv/config'

import express, { Request, Response } from "express";

import ApiRouter from './routes/index.js'
import { errorHandling } from "./midlewares/ErrorHandling.js";

const app = express()

app.use(express.json())

app.use('/api/', ApiRouter)
app.use(errorHandling)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' })
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
  
})