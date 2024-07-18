import Attempt, {IAttempt} from "../model/attempt.model"
import Quiz from "../model/quiz.model";
import { AppError, NotFoundError, ValidationError, UnauthorizedError } from '../utils/error';
import { Schema} from "mongoose";
import mongoose from 'mongoose';

export class ResultService{

    public async getUserAttempts(userId:string){

        let attempts : any=await Attempt.find({user:userId})
        if(!attempts){
            throw new NotFoundError('No attempts found for user')
        }
        attempts =attempts.map((item:any)=> {
           const {_id , user, quiz,avgScore} = item;
           return {_id , user, quiz,avgScore}
        })
        return attempts
    }
    public async getAttemptDetails(quizId:string){
        const userIdInObjectId=new mongoose.Types.ObjectId(quizId)

        let pipeline:any[]=[
            {$match: {
              quiz:userIdInObjectId
            }},
            {
              $unwind: {
                path: "$questions",
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: "questions",
                localField:"questions.question",
                foreignField: "_id",
                as: "questionDetails"
              }
            },
            {
              $unwind: {
                path: "$questionDetails",
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $project: {
               
                "questionText":"$questionDetails.text",
                "correctAnswer":"$questionDetails.correctAnswer",
                "userAnswer":"$questions.userAnswer",
                     "point":"$questions.points",
                "explaination":"$questionDetails.explanation",
                "difficulty":"$questionDetails.difficulty"
              }
            }
            
          ]

          const details=await Attempt.aggregate(pipeline)
          if(!details){
            throw new NotFoundError("details not found")
          }
          return details
    }

}