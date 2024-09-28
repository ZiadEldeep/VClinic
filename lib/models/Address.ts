import mongoose, { Document, Schema } from 'mongoose';

interface IAddress extends Document {
  hospitalName: string;
  hospitalId: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

const AddressSchema: Schema<IAddress> = new Schema({
  hospitalName: { type: String, required: true },
  hospitalId: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
}, { timestamps: true });

export const AddressModel =mongoose.models.Address|| mongoose.model<IAddress>('Address', AddressSchema);
