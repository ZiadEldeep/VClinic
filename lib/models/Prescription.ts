import mongoose, { Document, Schema } from 'mongoose';

interface IPrescription extends Document {
  prescriptionId: string;
  customerId: string;
  physicianId: string;
  pid: string;
  pfd: string;
}

const PrescriptionSchema: Schema<IPrescription> = new Schema({
  prescriptionId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  physicianId: { type: String, required: true },
  pid: { type: String, required: true },
  pfd: { type: String, required: true },
}, { timestamps: true });

export const PrescriptionModel = mongoose.models.Prescription|| mongoose.model<IPrescription>('Prescription', PrescriptionSchema);
