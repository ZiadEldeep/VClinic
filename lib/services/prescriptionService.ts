"use server"
import { PrescriptionModel } from '@/lib/models/Prescription';
import { connectDB } from '@/mongoose';

// Fetch all prescriptions
export const getPrescriptions = async () => {
  await connectDB();
  const prescriptions = await PrescriptionModel.find({}).lean();
  return prescriptions;
};

// Create a new prescription
export const createPrescription = async (data: { prescriptionId: string, customerId: string, physicianId: string, pid: string, pfd: string }) => {
  await connectDB();
  const newPrescription = await PrescriptionModel.create(data);
  return newPrescription;
};

// Update an existing prescription
export const updatePrescription = async (id: string, data: { prescriptionId: string, customerId: string, physicianId: string, pid: string, pfd: string }) => {
  await connectDB();
  const updatedPrescription = await PrescriptionModel.findByIdAndUpdate(id, data, { new: true });
  return updatedPrescription;
};

// Delete a prescription
export const deletePrescription = async (id: string) => {
  await connectDB();
  await PrescriptionModel.findByIdAndDelete(id);
  return { message: 'Prescription deleted' };
};
