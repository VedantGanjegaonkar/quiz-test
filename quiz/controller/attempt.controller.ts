import { Request, Response,NextFunction } from 'express';
import{errorHandler} from "../middleware/errorHandler.middleware"
import {  initializeAttempt, updateAttemptWithAnswer } from "../service/attempt.service";


export class AttemtsController {

    public async startQuiz(req: Request, res: Response,next:NextFunction){
        const { userId, quizId } = req.body;

        try {
          const attempt = await initializeAttempt(userId, quizId);
          res.status(201).json(attempt);
        } catch (error:any) {
            errorHandler(error,req,res,next)
        }
      };


      public async answerQuestion(req: Request, res: Response,next:NextFunction){
        const { attemptId, questionId, userAnswer,userId } = req.body;

        try {
          const attempt = await updateAttemptWithAnswer(attemptId, questionId, userAnswer,userId);
          res.status(200).json(attempt);
        } catch (error:any) {
            errorHandler(error,req,res,next)
        }
      };



}




