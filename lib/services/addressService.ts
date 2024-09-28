"use server"
import { AddressModel } from '@/lib/models/Address';
import { connectDB } from '@/mongoose';

// Fetch all addresses
export const getAddresses = async () => {
  await connectDB();
  const addresses = await AddressModel.find({}).lean();
  return addresses;
};

// Create a new address
export const createAddress = async (data: { hospitalName: string; hospitalId: string; city: string; country: string; state: string; zipCode: string }) => {
  await connectDB();
  const { hospitalName, hospitalId, city, country, state, zipCode } = data;
  const newAddress = await AddressModel.create({ hospitalName, hospitalId, city, country, state, zipCode });
  return newAddress;
};

// Update an existing address
export const updateAddress = async (data: { id: string; hospitalName: string; hospitalId: string; city: string; country: string; state: string; zipCode: string }) => {
  await connectDB();
  const { id, hospitalName, hospitalId, city, country, state, zipCode } = data;
  const updatedAddress = await AddressModel.findByIdAndUpdate(id, { hospitalName, hospitalId, city, country, state, zipCode }, { new: true });
  return updatedAddress;
};

// Delete an address
export const deleteAddress = async (id: string) => {
  await connectDB();
  await AddressModel.findByIdAndDelete(id);
  return { message: 'Address deleted' };
};
