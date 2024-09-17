import { NextResponse } from 'next/server';
import { AddressModel } from '@/lib/models/Address';
import { connectDB } from '@/mongoose';

export async function GET(request: Request) {
  await connectDB();
  const addresses = await AddressModel.find({});
  return NextResponse.json(addresses);
}

export async function POST(request: Request) {
  await connectDB();
  const { hospitalName, hospitalId, city, country, state, zipCode } = await request.json();
  const newAddress = await AddressModel.create({ hospitalName, hospitalId, city, country, state, zipCode });
  return NextResponse.json(newAddress, { status: 201 });
}

export async function PUT(request: Request) {
  await connectDB();
  const { id, hospitalName, hospitalId, city, country, state, zipCode } = await request.json();
  const updatedAddress = await AddressModel.findByIdAndUpdate(id, { hospitalName, hospitalId, city, country, state, zipCode }, { new: true });
  return NextResponse.json(updatedAddress);
}

export async function DELETE(request: Request) {
  await connectDB();
  const { id } = await request.json();
  await AddressModel.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Address deleted' });
}
