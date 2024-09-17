import mongoose, { Document, Schema } from 'mongoose';

interface ICustomer extends Document {
  customerId: string;
  name: string;
  dob: Date;
  gender: string;
}

const CustomerSchema: Schema<ICustomer> = new Schema({
  customerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

export const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema);
