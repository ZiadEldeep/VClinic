// CustomerModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the customer interface
interface ICustomer extends Document {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: Date;
  gender: string;
  medicalHistory?: string;
  allergies?: string;
  chronicDiseases?: string;
  emergencyContact?: string;
}

// Create the schema
const CustomerSchema: Schema<ICustomer> = new Schema({
  customerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  medicalHistory: { type: String },
  allergies: { type: String },
  chronicDiseases: { type: String },
  emergencyContact: { type: String },
}, { timestamps: true });

// Export the model
export const CustomerModel = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
