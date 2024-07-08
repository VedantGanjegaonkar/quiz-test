import mongoose, { Schema, Document } from 'mongoose';

export interface IAttemptQuestion {
  question: mongoose.Types.ObjectId;
  userAnswer: string;
  isCorrect: boolean;
  points: number;
}

export interface IAttempt extends Document {
  user: mongoose.Types.ObjectId;
  quiz: mongoose.Types.ObjectId;
  questions: IAttemptQuestion[];
  avgScore: number;
}

const attemptQuestionSchema = new Schema<IAttemptQuestion>({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  points: { type: Number, required: true }
});

const attemptSchema = new Schema<IAttempt>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questions: [attemptQuestionSchema],
  avgScore: { type: Number, required: true }
}, { timestamps: true });

const Attempt = mongoose.model<IAttempt>('Attempt', attemptSchema);

export default Attempt;