import 'dotenv/config'

import express, { Request, Response } from "express";
import cors from 'cors'

import ApiRouter from './routes/index.js'
import { errorHandling } from "./midlewares/ErrorHandling.js";

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8000'],
  credentials: true 
}));

app.use(express.json())

app.use('/api/', ApiRouter)

app.get('/author/', (req: Request, res: Response) => {
  res.json({    
    author: 'joselow',
    project: 'https://github.com/Joselow/auth_jokes',
    social_networks: {
      'Github': 'https://github.com/Joselow',
    }
  })
})

app.use(errorHandling)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' })
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
  
})