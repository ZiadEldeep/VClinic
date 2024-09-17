import mongoose, { Document, Schema } from 'mongoose';

interface IPrescriptionItem extends Document {
  prescriptionId: string;
  drugId: string;
  medicineName: string;
  quantity: number;
  doe: Date;
  itc: string;
  hospitalId: string;
}

const PrescriptionItemSchema: Schema<IPrescriptionItem> = new Schema({
  prescriptionId: { type: String, required: true },
  drugId: { type: String, required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  doe: { type: Date, required: true },
  itc: { type: String, required: true },
  hospitalId: { type: String, required: true },
}, { timestamps: true });

export const PrescriptionItemModel = mongoose.model<IPrescriptionItem>('PrescriptionItem', PrescriptionItemSchema);
