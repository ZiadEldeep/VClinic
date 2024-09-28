"use server";
import { CustomerModel } from '@/lib/models/Customer.model';
import { connectDB } from '@/mongoose';

// Define types for customer data
type CustomerData = {
  customerId: string;
  name: string;
  dob: string; // Can be adjusted to Date if necessary
  gender: string;
  medicalHistory?: string;
  allergies?: string;
  chronicDiseases?: string;
  emergencyContact?: string;
};

// Fetch all customers
export const getCustomers = async () => {
  await connectDB();
  const customers = await CustomerModel.find({}).lean();
  return customers;
};

// Create a new customer
export const createCustomer = async (data: CustomerData) => {
  await connectDB();
  const { customerId, name, dob, gender, medicalHistory, allergies, chronicDiseases, emergencyContact } = data;
  const newCustomer = await CustomerModel.create({ 
    customerId, 
    name, 
    dob, 
    gender,
    medicalHistory,
    allergies,
    chronicDiseases,
    emergencyContact 
  });
  return newCustomer;
};

// Update an existing customer
export const updateCustomer = async (data: { id: string } & CustomerData) => {
  await connectDB();
  const { id, customerId, name, dob, gender, medicalHistory, allergies, chronicDiseases, emergencyContact } = data;
  const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, { 
    customerId, 
    name, 
    dob, 
    gender, 
    medicalHistory, 
    allergies, 
    chronicDiseases, 
    emergencyContact 
  }, { new: true });
  return updatedCustomer;
};

// Delete a customer
export const deleteCustomer = async (id: string) => {
  await connectDB();
  await CustomerModel.findByIdAndDelete(id);
  return { message: 'Customer deleted' };
};
