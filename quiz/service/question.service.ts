import Question, { IQuestion } from '../model/question.model';
import { AppError, NotFoundError, ValidationError, UnauthorizedError } from '../utils/error';

export class QueService{

    public async createQuestion(questionData: IQuestion): Promise<IQuestion> {
        try {
          const newQuestion = new Question(questionData);
          const savedQuestion = await newQuestion.save();
          return savedQuestion;
        } catch (err) {
          console.error('Error creating question:', err);
          throw err;
        }
      }

      public async insertManyQuestions(questions: IQuestion[]): Promise<void> {
        try {
          await Question.insertMany(questions);

        } catch (err) {
          console.error('Error inserting questions:', err);
          throw err;
        }
      }

      public async deleteProduct(productID: string): Promise<void> {

        const product = await Question.findById(productID);

        if (!product) {
          throw new NotFoundError("quest not found to delete")
        }
        await Question.deleteOne({ _id: productID });
      }


}

