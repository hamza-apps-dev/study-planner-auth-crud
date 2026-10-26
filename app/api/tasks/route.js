import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/tasks
 * Reads only the authenticated user's tasks with optional status and query filtering
 */
export async function GET(request) {
  try {
    const authUser = await getUserFromRequest(request);
    if (!authUser || !authUser.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please login to view tasks.' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    // Build user-isolated query filter
    const query = { userId: authUser.userId };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { category: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error) {
    console.error('Fetch tasks error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks from database.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Creates a new task bound specifically to the authenticated user ID
 */
export async function POST(request) {
  try {
    const authUser = await getUserFromRequest(request);
    if (!authUser || !authUser.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please login to create tasks.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, priority, category, status, dueDate } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Task title is required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      category: category || 'Assignment',
      status: status || 'pending',
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: authUser.userId,
    });

    return NextResponse.json(
      { success: true, message: 'Task created successfully', task: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create task.' },
      { status: 500 }
    );
  }
}
