

import express from "express"
import mongoose from "mongoose"

import { router as userRouter } from './routes/user.routes';
import QueRoutes from "./routes/question.routes"
import QuizRoutes from "./routes/quiz.routes"
import attemptRoutes from "./routes/attempts.routes"
import cors from 'cors';
import { adminOnly } from './middleware/auth.middleware';

const app = express()
const port = 3000

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// routes
app.use('/user',userRouter)
app.use('/que',QueRoutes,adminOnly)
app.use('/quiz',QuizRoutes)
app.use('/attempt',attemptRoutes)


app.get('/', (req, res) => {
  res.send('welcome to Quiz Game')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://vedantsg112233:MzUFmOl5GA6oCL77@cluster0.rfaqwkb.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('connected to DB');
  });