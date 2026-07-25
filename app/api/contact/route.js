import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message, projectType, budget } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    await addMessage({ name, email, message, projectType, budget });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 });
  }
}
