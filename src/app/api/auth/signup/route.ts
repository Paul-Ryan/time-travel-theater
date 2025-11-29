import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await authService.signUp(email, password, fullName);

    return NextResponse.json({
      user: result.user,
      session: result.session,
      message: 'User created successfully'
    });

  } catch (error: any) {
    console.error('Sign up error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create user',
        code: error.code 
      },
      { status: 400 }
    );
  }
}