import { NextResponse } from 'next/server';
import { CustomerModel } from '@/lib/models/Customer';
import { connectDB } from '@/mongoose';

export async function GET(request: Request) {
  await connectDB();
  const customers = await CustomerModel.find({});
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  await connectDB();
  const { customerId, name, dob, gender } = await request.json();
  const newCustomer = await CustomerModel.create({ customerId, name, dob, gender });
  return NextResponse.json(newCustomer, { status: 201 });
}

export async function PUT(request: Request) {
  await connectDB();
  const { id, customerId, name, dob, gender } = await request.json();
  const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, { customerId, name, dob, gender }, { new: true });
  return NextResponse.json(updatedCustomer);
}

export async function DELETE(request: Request) {
  await connectDB();
  const { id } = await request.json();
  await CustomerModel.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Customer deleted' });
}
