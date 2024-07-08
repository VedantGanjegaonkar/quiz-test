import Quiz, { IQuiz } from "../model/quiz.model";
import mongoose from "mongoose";
import Question, { IQuestion } from "../model/question.model";
import Attempt, { IAttempt, IAttemptQuestion } from "../model/attempt.model";
import { AppError, NotFoundError } from "../utils/error";

export class QuizService {
  public async createQuiz(quizData: IQuiz): Promise<IQuiz> {       //basic first quiz create (same for all users)

    const newQuiz = new Quiz({quizData

    });

    // Save the quiz to the database
    await newQuiz.save();

    return newQuiz;

    try {
      const newQuiz = new Quiz({
        ...quizData,
      });

      const savedQuiz = await newQuiz.save();
      return savedQuiz;
    } catch (err) {
      console.error("Error creating quiz:", err);
      throw err;
    }
  }



  public async getLatestAvgScore(userId: mongoose.Types.ObjectId) {
    //function to  find the avgScore from latest attempt

    const latestAttempt = await Attempt.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .exec();



    if (!latestAttempt) {
      throw new Error("No attempts found for this user hereee");
    }

    // Return the avgScore of the latest attempt
    return latestAttempt.avgScore;
  }

  public async calculateAvgDifficulty(attemptId: any) {
                                                                                  // function to cal average difficulty from attemptID

    const attempt = await Attempt.findById(attemptId).populate(
      "questions.question"
    );

    if (!attempt) {
      throw new NotFoundError("Attempt not found");
    }


    const questions: IQuestion[] = attempt.questions.map((q) => {
      if (q.question instanceof mongoose.Types.ObjectId) {
        throw new AppError("Question was not populated", 401);
      }
      return q.question as IQuestion;
    });
    // Calculate the average difficulty
    const totalDifficulty = questions.reduce(
      (sum, question) => sum + question.difficulty,
      0
    );
    const avgDifficulty =
      questions.length > 0 ? totalDifficulty / questions.length : 0;

    return avgDifficulty;
  }




  public async getQuestionsByDifficulty(difficultyThreshold: number) {
    //function to give array of questionIds whose difficulty greater then given no(avgDifficulty)
    const questions = await Question.find(
      { difficulty: { $gt: difficultyThreshold } },
      "_id"
    ).exec();

    if (!questions || questions.length === 0) {
      return [];
    }

    // Return the array question IDs
    return questions.map((question) => question._id);
  }

  public async getQuestionsByLessDifficulty(difficultyThreshold: number) {
    //function to give array of questionIds whose difficulty less then given no(avgDifficulty)
    const questions = await Question.find(
      { difficulty: { $lt: difficultyThreshold } },
      "_id"
    ).exec();

    if (!questions || questions.length === 0) {
      return [];
    }

    // Return the array question IDs
    return questions.map((question) => question._id);
  }



                                                                                           //main function logic
  public async makeArrayofQue(avgDifficulty: number, avgScore: number) {
    const TougherQuestionsNo = Math.round(avgScore*10);


    const EasyQuestionNo = 10 - TougherQuestionsNo;                                       //assume total 5 questions

    const newQuestionsArry: any[] = [];

    const HardQ = await this.getQuestionsByDifficulty(avgDifficulty);
    const EasyQ = await this.getQuestionsByLessDifficulty(avgDifficulty);

    for (let i = 0; i < TougherQuestionsNo; i++) {
      newQuestionsArry.push(HardQ[i]);
    }

    for (let i = 0; i < EasyQuestionNo; i++) {
      newQuestionsArry.push(EasyQ[i]);
    }

    return newQuestionsArry;
  }



//dynamic gen function
  public async createQuizDynamically(
    title: string,
    description: string,
    userId: mongoose.Types.ObjectId
  ) {
    try {

      
let avgScore = await this.getLatestAvgScore(userId) 
if(avgScore === 0){
  avgScore = 1;
}
console.log("ang score"+avgScore);



const latestAttempt = await Attempt.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .exec();

    if (!latestAttempt) {
      throw new Error("No attempts found for this user ");
    }

const AttemptId =latestAttempt._id

const avgDifficulty = await this.calculateAvgDifficulty(AttemptId)


const NewQuestionsArr =await this.makeArrayofQue(avgDifficulty,avgScore)


const newQuiz = new Quiz({
  title:title,
  description:description,
  questions: NewQuestionsArr
});


await newQuiz.save();

return newQuiz;


    } catch (err) {
      console.error("Error creating quiz:", err);
      throw err;
    }
  }

public async getQuizById (quizId:any){
  const quiz = await Quiz.findById(quizId).populate('questions');

if(!quiz){
  throw new NotFoundError("qUIZ not found");
}
return quiz
}



}
