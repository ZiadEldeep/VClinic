import { NextResponse } from 'next/server';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '@/lib/services/addressService';

export async function GET(request: Request) {
  try {
    const addresses = await getAddresses();
    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const addressData = await request.json();
    const newAddress = await createAddress(addressData);
    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create address' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const addressData = await request.json();
    const updatedAddress = await updateAddress(addressData);
    return NextResponse.json(updatedAddress);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update address' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await deleteAddress(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete address' }, { status: 500 });
  }
}
