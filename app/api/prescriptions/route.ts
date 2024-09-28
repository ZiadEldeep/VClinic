import { NextResponse } from 'next/server';
import { getPrescriptions, createPrescription, updatePrescription, deletePrescription } from '@/lib/services/prescriptionService';

export async function GET(request: Request) {
  try {
    const prescriptions = await getPrescriptions();
    return NextResponse.json(prescriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prescriptions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const prescriptionData = await request.json();
    const newPrescription = await createPrescription(prescriptionData);
    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create prescription' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...prescriptionData } = await request.json();
    const updatedPrescription = await updatePrescription(id, prescriptionData);
    return NextResponse.json(updatedPrescription);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update prescription' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await deletePrescription(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete prescription' }, { status: 500 });
  }
}
