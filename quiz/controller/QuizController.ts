import { QuizService } from "../service/quiz.service";
import { Request, Response,NextFunction } from 'express';
import{errorHandler} from "../middleware/errorHandler.middleware"


export class QuizController{

    private queService:QuizService;
    constructor(){
        this.queService=new QuizService()
        this.createQuiz=this.createQuiz.bind(this)
        this.createQuizDynamically=this.createQuizDynamically.bind(this)
        this.getQuiz=this.getQuiz.bind(this)
        this.getnewQuiz=this.getnewQuiz.bind(this)
    }

    public async createQuiz(req:Request,res:Response,next:NextFunction){

        try {

            const questionData=req.body;
            const newQuestion=await this.queService.createQuiz(questionData)
            res.status(201).json(newQuestion)

        } catch (error:any) {

            errorHandler(error,req,res,next)

        }


    }
    public async createQuizDynamically(req:Request,res:Response,next:NextFunction){
        try {
            const title="new D Quiz"
            const description ="Desc"
            const userId  = req.body.userId;
            console.log(userId);
            
            // console.log("req.boddy"+req.body);
            
               const newQuiz =  await this.queService.createQuizDynamically(title,description,userId )
               res.status(201).json(newQuiz)

        } catch (error:any) {
            errorHandler(error,req,res,next)
        }
    }

    public async getQuiz(req:Request,res:Response,next:NextFunction){
        try {
            const quizId ="6659ae6c0ecdd40be1531b6a"
               const Quiz =  await this.queService.getQuizById(quizId)
               res.status(201).json(Quiz)

        } catch (error:any) {
            errorHandler(error,req,res,next)
        }
    }
    public async getnewQuiz(req:Request,res:Response,next:NextFunction){
        try {
            const { id } = req.params;
               const Quiz =  await this.queService.getQuizById(id)
               res.status(201).json(Quiz)

        } catch (error:any) {
            errorHandler(error,req,res,next)
        }
    }


}