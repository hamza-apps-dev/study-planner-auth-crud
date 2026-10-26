import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(request) {
  try {
    const authPayload = await getUserFromRequest(request);

    if (!authPayload || !authPayload.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Please login first' },
        { status: 401 }
      );
    }

    const { name, password } = await request.json();

    await connectToDatabase();
    const user = await User.findById(authPayload.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (name && name.trim()) {
      user.name = name.trim();
    }

    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password.trim(), salt);
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully!',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
