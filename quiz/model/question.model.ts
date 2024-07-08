import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  difficulty: number;
}

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, required: true },
  points: { type: Number, required: true },
  difficulty: { type: Number, min: 1, max: 10, required: true }
}, { timestamps: true });

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;