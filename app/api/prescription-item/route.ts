import { NextResponse } from 'next/server';
import { PrescriptionItemModel } from '@/lib/models/PrescriptionItem';
import { connectDB } from '@/mongoose';

export async function GET(request: Request) {
  await connectDB();
  const prescriptionItems = await PrescriptionItemModel.find({});
  return NextResponse.json(prescriptionItems);
}

export async function POST(request: Request) {
  await connectDB();
  const { prescriptionId, drugId, medicineName, quantity, doe, itc, hospitalId } = await request.json();
  const newPrescriptionItem = await PrescriptionItemModel.create({ prescriptionId, drugId, medicineName, quantity, doe, itc, hospitalId });
  return NextResponse.json(newPrescriptionItem, { status: 201 });
}

export async function PUT(request: Request) {
  await connectDB();
  const { id, prescriptionId, drugId, medicineName, quantity, doe, itc, hospitalId } = await request.json();
  const updatedPrescriptionItem = await PrescriptionItemModel.findByIdAndUpdate(id, { prescriptionId, drugId, medicineName, quantity, doe, itc, hospitalId }, { new: true });
  return NextResponse.json(updatedPrescriptionItem);
}

export async function DELETE(request: Request) {
  await connectDB();
  const { id } = await request.json();
  await PrescriptionItemModel.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Prescription item deleted' });
}
