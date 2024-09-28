import mongoose, { Document, Schema } from 'mongoose';

interface IPhysician extends Document {
  physicianId: string;
  name: string;
  details: string;
  hospitalName: string;
}

const PhysicianSchema: Schema<IPhysician> = new Schema({
  physicianId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  details: { type: String, required: true },
  hospitalName: { type: String, required: true },
}, { timestamps: true });

export const PhysicianModel =mongoose.models.Physician|| mongoose.model<IPhysician>('Physician', PhysicianSchema);
