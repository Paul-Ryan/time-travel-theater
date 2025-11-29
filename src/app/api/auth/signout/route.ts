import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/database';

export async function POST() {
  try {
    await authService.signOut();

    return NextResponse.json({
      message: 'Signed out successfully'
    });

  } catch (error: any) {
    console.error('Sign out error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to sign out',
        code: error.code 
      },
      { status: 500 }
    );
  }
}