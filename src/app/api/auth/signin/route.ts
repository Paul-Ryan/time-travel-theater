import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await authService.signIn(email, password);

    return NextResponse.json({
      user: result.user,
      session: result.session,
      message: 'Signed in successfully'
    });

  } catch (error: any) {
    console.error('Sign in error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to sign in',
        code: error.code 
      },
      { status: 401 }
    );
  }
}