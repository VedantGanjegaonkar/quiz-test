import { ResultService } from '../service/result.service';
import { Request, Response,NextFunction } from 'express';
import{errorHandler} from "../middleware/errorHandler.middleware"
import { UserService } from '../service/user.service';

export class ResultController{

    private resultService:ResultService;
    private userService:UserService;

    constructor(){
        this.resultService=new ResultService()
        this.userService = new UserService()
        this.getAttempts=this.getAttempts.bind(this)
        this.getAttemptDetails=this.getAttemptDetails.bind(this)
    }

    public async getAttempts(req:Request,res:Response,next:NextFunction){

        try {
            const authHeader = req.headers['authorization'];
            const userID= await this.userService.getUserId(authHeader)
            const attempts=await this.resultService.getUserAttempts(userID)
            res.status(200).json(attempts)

        } catch (error:any) {

            errorHandler(error,req,res,next)

        }
    }
    
    public async getAttemptDetails(req:Request,res:Response,next:NextFunction){

        try {
            const {id}=req.params
            const details=await this.resultService.getAttemptDetails(id)

            res.status(200).json(details)

        } catch (error:any) {

            errorHandler(error,req,res,next)

        }
    }


}