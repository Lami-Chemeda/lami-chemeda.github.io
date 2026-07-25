import { NextResponse } from 'next/server';
import { addVisitor } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { ip, country, city } = data;

    await addVisitor({
      ip: ip || 'Unknown',
      country: country || 'Unknown',
      city: city || 'Unknown'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json({ success: false, error: 'Failed to track visitor' }, { status: 500 });
  }
}
