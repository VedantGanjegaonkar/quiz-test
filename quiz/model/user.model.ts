import { Document, Schema, model } from 'mongoose';

// Define the user interface
interface UserDocument extends Document {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    acceptTerms: boolean;

    attempts?:  Schema.Types.ObjectId[];
    avgScore?:number


}

// Define the user schema
const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  acceptTerms: { type: Boolean, required: true },
    attempts: [{ type: Schema.Types.ObjectId, ref: 'Attempt' }],
    avgScore: { type: Number, required: false },



});

// Create the user model
const UserModel = model<UserDocument>('User', userSchema);

export {UserDocument, UserModel} ;