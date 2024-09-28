import { NextResponse } from 'next/server';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '@/lib/services/CustomerService';

// Type definitions for incoming requests
interface CustomerRequest {
  id: string; // Optional for POST, required for DELETE
  customerId: string; // Required for both POST and PUT
  name: string; // Required for both POST and PUT
  dob: string; // Required for both POST and PUT, can be Date if preferred
  gender: "Male" | "Female" | "Other"; // Required for both POST and PUT
  medicalHistory?: string; // Optional
  allergies?: string; // Optional
  chronicDiseases?: string; // Optional
  emergencyContact?: string; // Optional
}

export async function GET(request: Request) {
  try {
    const customers = await getCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const customerData: CustomerRequest = await request.json();
    const newCustomer = await createCustomer(customerData);
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const customerData: CustomerRequest = await request.json();
    if (!customerData.id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }
    const updatedCustomer = await updateCustomer(customerData);
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }
    const result = await deleteCustomer(id);
    if (!result) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Customer deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
