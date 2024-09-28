import { NextResponse } from 'next/server';
import { getPhysicians, createPhysician, updatePhysician, deletePhysician } from '@/lib/services/physicianService';

export async function GET(request: Request) {
  try {
    const physicians = await getPhysicians();
    return NextResponse.json(physicians);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch physicians' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const physicianData = await request.json();
    const newPhysician = await createPhysician(physicianData);
    return NextResponse.json(newPhysician, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create physician' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const physicianData = await request.json();
    const updatedPhysician = await updatePhysician(physicianData);
    return NextResponse.json(updatedPhysician);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update physician' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await deletePhysician(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete physician' }, { status: 500 });
  }
}
