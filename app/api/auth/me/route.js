import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const authPayload = await getUserFromRequest(request);

    if (!authPayload || !authPayload.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: No active session' },
        { status: 401 }
      );
    }

    // Instantly return the user profile directly from the verified JWT payload
    // without blocking on database latency
    return NextResponse.json(
      {
        success: true,
        user: {
          id: authPayload.userId,
          name: authPayload.name || 'Muhammad Ali',
          email: authPayload.email || 'student@example.com',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch me error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to authenticate user' },
      { status: 500 }
    );
  }
}
