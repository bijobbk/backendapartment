
import { Schema, Document, Model, model } from 'mongoose';
 
export interface LoginInfo extends Document {
  email: string;
  password: string;
}
 
const LoginSchema: Schema = new Schema<LoginInfo>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
 
const LoginModel: Model<LoginInfo> = model<LoginInfo>('Login', LoginSchema);
 
export default LoginModel;
 