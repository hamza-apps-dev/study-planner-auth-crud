import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUserFromRequest } from '@/lib/auth';

/**
 * PUT /api/tasks/[id]
 * Updates an existing task ensuring strict user isolation
 */
export async function PUT(request, { params }) {
  try {
    const authUser = await getUserFromRequest(request);
    if (!authUser || !authUser.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Session missing or invalid' },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task identifier' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, priority, category, status, dueDate } = body;

    await connectToDatabase();

    // Verify task exists and belongs to user
    const existingTask = await Task.findOne({ _id: id, userId: authUser.userId });
    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found or access denied' },
        { status: 404 }
      );
    }

    // Apply allowed updates
    if (title !== undefined) existingTask.title = title.trim();
    if (description !== undefined) existingTask.description = description.trim();
    if (priority !== undefined) existingTask.priority = priority;
    if (category !== undefined) existingTask.category = category;
    if (status !== undefined) existingTask.status = status;
    if (dueDate !== undefined) existingTask.dueDate = dueDate ? new Date(dueDate) : null;

    const updatedTask = await existingTask.save();

    return NextResponse.json(
      { success: true, message: 'Task updated successfully', task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update task' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Deletes a task ensuring it belongs to the logged-in user
 */
export async function DELETE(request, { params }) {
  try {
    const authUser = await getUserFromRequest(request);
    if (!authUser || !authUser.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Session missing or invalid' },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task identifier' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId: authUser.userId,
    });

    if (!deletedTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found or unauthorized to delete' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Task deleted successfully', id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete task from database' },
      { status: 500 }
    );
  }
}
