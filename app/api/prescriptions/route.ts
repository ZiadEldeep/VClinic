import { NextResponse } from 'next/server';
import { PrescriptionModel } from '@/lib/models/Prescription';
import { connectDB } from '@/mongoose';

export async function GET(request: Request) {
  await connectDB();
  const prescriptions = await PrescriptionModel.find({});
  return NextResponse.json(prescriptions);
}

export async function POST(request: Request) {
  await connectDB();
  const { prescriptionId, customerId, physicianId, pid, pfd } = await request.json();
  const newPrescription = await PrescriptionModel.create({ prescriptionId, customerId, physicianId, pid, pfd });
  return NextResponse.json(newPrescription, { status: 201 });
}

export async function PUT(request: Request) {
  await connectDB();
  const { id, prescriptionId, customerId, physicianId, pid, pfd } = await request.json();
  const updatedPrescription = await PrescriptionModel.findByIdAndUpdate(id, { prescriptionId, customerId, physicianId, pid, pfd }, { new: true });
  return NextResponse.json(updatedPrescription);
}

export async function DELETE(request: Request) {
  await connectDB();
  const { id } = await request.json();
  await PrescriptionModel.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Prescription deleted' });
}
