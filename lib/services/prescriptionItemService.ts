import { PrescriptionItemModel } from '@/lib/models/PrescriptionItem';
import { connectDB } from '@/mongoose';

// Fetch all prescription items
export const getPrescriptionItems = async () => {
  await connectDB();
  const prescriptionItems = await PrescriptionItemModel.find({}).lean();
  return prescriptionItems;
};

// Create a new prescription item
export const createPrescriptionItem = async (data: { prescriptionId: string, drugId: string, medicineName: string, quantity: number, doe: Date, itc: string, hospitalId: string }) => {
  await connectDB();
  const newPrescriptionItem = await PrescriptionItemModel.create(data);
  return newPrescriptionItem;
};

// Update an existing prescription item
export const updatePrescriptionItem = async (id: string, data: { prescriptionId: string, drugId: string, medicineName: string, quantity: number, doe: Date, itc: string, hospitalId: string }) => {
  await connectDB();
  const updatedPrescriptionItem = await PrescriptionItemModel.findByIdAndUpdate(id, data, { new: true });
  return updatedPrescriptionItem;
};

// Delete a prescription item
export const deletePrescriptionItem = async (id: string) => {
  await connectDB();
  await PrescriptionItemModel.findByIdAndDelete(id);
  return { message: 'Prescription item deleted' };
};
