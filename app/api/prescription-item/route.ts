import { NextResponse } from 'next/server';
import { getPrescriptionItems, createPrescriptionItem, updatePrescriptionItem, deletePrescriptionItem } from '@/lib/services/prescriptionItemService';

export async function GET(request: Request) {
  try {
    const prescriptionItems = await getPrescriptionItems();
    return NextResponse.json(prescriptionItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prescription items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const prescriptionItemData = await request.json();
    const newPrescriptionItem = await createPrescriptionItem(prescriptionItemData);
    return NextResponse.json(newPrescriptionItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create prescription item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...prescriptionItemData } = await request.json();
    const updatedPrescriptionItem = await updatePrescriptionItem(id, prescriptionItemData);
    return NextResponse.json(updatedPrescriptionItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update prescription item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await deletePrescriptionItem(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete prescription item' }, { status: 500 });
  }
}
