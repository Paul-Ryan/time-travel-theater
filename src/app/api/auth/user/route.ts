import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/database';

export async function GET() {
  try {
    const user = await authService.getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'No user found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user,
      authenticated: true
    });

  } catch (error: any) {
    console.error('Get user error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get user',
        authenticated: false
      },
      { status: 500 }
    );
  }
}