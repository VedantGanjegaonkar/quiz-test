import mongoose from 'mongoose';
import { UserDocument,UserModel } from '../model/user.model';
import Attempt, { IAttempt, IAttemptQuestion } from '../model/attempt.model';
import Question from '../model/question.model'; // Assuming you have a Question model
import { AppError, NotFoundError, ValidationError, UnauthorizedError } from '../utils/error';

// export class AttemptService{

//     public async initializeAttempt(userId: mongoose.Types.ObjectId, quizId: mongoose.Types.ObjectId){
//         const attempt = new Attempt({
//           user: userId,
//           quiz: quizId,
//           questions: [],
//           avgScore: 0
//         });

//         await attempt.save();
//         return attempt;
//       };


//       public async updateAttemptWithAnswer(attemptId: mongoose.Types.ObjectId, questionId: mongoose.Types.ObjectId, userAnswer: string){
//         const attempt = await Attempt.findById(attemptId).populate('questions.question');

//         if (!attempt) {
//           throw new NotFoundError('Attempt not found');
//         }

//         // Assume that you have a way to determine if the user's answer is correct
//         const question = await Question.findById(questionId);
//         if (!question) {
//           throw new NotFoundError('Question not found');
//         }

//         const isCorrect = question.correctAnswer === userAnswer;
//         const points = isCorrect ? question.points : 0;

//         const newQuestionAttempt: IAttemptQuestion = {
//           question: questionId,
//           userAnswer,
//           isCorrect,
//           points
//         };

//         attempt.questions.push(newQuestionAttempt);

//         // Calculate the average score
//         const totalPoints = attempt.questions.reduce((acc, q) => acc + q.points, 0);
//         attempt.avgScore = totalPoints / attempt.questions.length;

//         await attempt.save();
//         return attempt;
//       };


// }

export const initializeAttempt = async (userId: mongoose.Types.ObjectId, quizId: mongoose.Types.ObjectId) => {
    const attempt = new Attempt({
      user: userId,
      quiz: quizId,
      questions: [],
      avgScore: 0
    });

    await attempt.save();

    const attemptId = attempt._id

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { attempts: attemptId } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      throw new Error('User not found');
    }


    return attempt;
  };


export const updateAttemptWithAnswer = async (attemptId: mongoose.Types.ObjectId, questionId: mongoose.Types.ObjectId, userAnswer: string,userId: mongoose.Types.ObjectId) => {
    const attempt = await Attempt.findById(attemptId)



    if (!attempt) {
      throw new Error('Attempt not found');
    }

    // Assume that you have a way to determine if the user's answer is correct
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    const isCorrect = question.correctAnswer === userAnswer; // Adjust this logic based on your schema
    const points = isCorrect ? question.points : 0;

    const newQuestionAttempt: IAttemptQuestion = {
      question: questionId,
      userAnswer,
      isCorrect,
      points
    };

    attempt.questions.push(newQuestionAttempt);

    // Calculate the average score
    const totalPoints = attempt.questions.reduce((acc, q) => acc + q.points, 0);
    attempt.avgScore = totalPoints / attempt.questions.length;

    await attempt.save();
    return attempt;

// update user collection

const user = await UserModel.findByIdAndUpdate(
  userId,
  { $push: { attempts: attemptId } },
  { new: true, useFindAndModify: false }
);

if (!user) {
  throw new Error('User not found');
}
return user;

  };