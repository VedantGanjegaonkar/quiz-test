import { QueService } from "../service/question.service";
import { Request, Response,NextFunction } from 'express';
import{errorHandler} from "../middleware/errorHandler.middleware"
import Question, { IQuestion } from '../model/question.model';

export class QuestionController{

    private queService:QueService;
    constructor(){
        this.queService=new QueService()
        this.createQuestion=this.createQuestion.bind(this)
    }

    public async createQuestion(req:Request,res:Response,next:NextFunction){

        try {

            const questionData=req.body;
            const newQuestion=await this.queService.createQuestion(questionData)
            res.status(201).json(newQuestion)

        } catch (error:any) {

            errorHandler(error,req,res,next)

        }


    }


}