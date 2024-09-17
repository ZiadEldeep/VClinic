import { NextResponse } from 'next/server';
import { PhysicianModel } from '@/lib/models/Physician';
import { connectDB } from '@/mongoose';

export async function GET(request: Request) {
  await connectDB();
  const physicians = await PhysicianModel.find({});
  return NextResponse.json(physicians);
}

export async function POST(request: Request) {
  await connectDB();
  const { physicianId, name, details, hospitalName } = await request.json();
  const newPhysician = await PhysicianModel.create({ physicianId, name, details, hospitalName });
  return NextResponse.json(newPhysician, { status: 201 });
}

export async function PUT(request: Request) {
  await connectDB();
  const { id, physicianId, name, details, hospitalName } = await request.json();
  const updatedPhysician = await PhysicianModel.findByIdAndUpdate(id, { physicianId, name, details, hospitalName }, { new: true });
  return NextResponse.json(updatedPhysician);
}

export async function DELETE(request: Request) {
  await connectDB();
  const { id } = await request.json();
  await PhysicianModel.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Physician deleted' });
}
