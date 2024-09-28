"use server"
import { PhysicianModel } from '@/lib/models/Physician';
import { connectDB } from '@/mongoose';

// Fetch all physicians
export const getPhysicians = async () => {
  await connectDB();
  const physicians = await PhysicianModel.find({}).lean();
  return physicians;
};

// Create a new physician
export const createPhysician = async (data: { physicianId: string; name: string; details: string; hospitalName: string }) => {
  await connectDB();
  const { physicianId, name, details, hospitalName } = data;
  const newPhysician = await PhysicianModel.create({ physicianId, name, details, hospitalName });
  return newPhysician;
};

// Update an existing physician
export const updatePhysician = async (data: { id: string; physicianId: string; name: string; details: string; hospitalName: string }) => {
  await connectDB();
  const { id, physicianId, name, details, hospitalName } = data;
  const updatedPhysician = await PhysicianModel.findByIdAndUpdate(id, { physicianId, name, details, hospitalName }, { new: true });
  return updatedPhysician;
};

// Delete a physician
export const deletePhysician = async (id: string) => {
  await connectDB();
  await PhysicianModel.findByIdAndDelete(id);
  return { message: 'Physician deleted' };
};
