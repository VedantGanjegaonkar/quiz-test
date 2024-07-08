import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: mongoose.Types.ObjectId[];

}

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],

}, { timestamps: true });

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export default Quiz;