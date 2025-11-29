import { NextRequest, NextResponse } from 'next/server';
import { bookingService, authService } from '@/lib/supabase';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify user is authenticated
    const user = await authService.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const bookingId = parseInt(params.id);
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      );
    }

    const { booking_status } = await request.json();

    // Validate booking status
    const validStatuses = ['confirmed', 'cancelled', 'pending'];
    if (!booking_status || !validStatuses.includes(booking_status)) {
      return NextResponse.json(
        { error: 'Valid booking status is required (confirmed, cancelled, pending)' },
        { status: 400 }
      );
    }

    // For now, we'll implement a simple update using Supabase client
    // In a real app, you'd want to verify the user owns this booking
    const { supabase } = await import('@/lib/supabase');
    
    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ booking_status })
      .eq('id', bookingId)
      .eq('user_id', user.id) // Ensure user can only update their own bookings
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      booking,
      message: 'Booking updated successfully'
    });

  } catch (error: any) {
    console.error('Booking update error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to update booking',
        code: error.code 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify user is authenticated
    const user = await authService.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const bookingId = parseInt(params.id);
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      );
    }

    const { supabase } = await import('@/lib/supabase');
    
    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        showtimes (
          *,
          movies (title, poster_url)
        )
      `)
      .eq('id', bookingId)
      .eq('user_id', user.id) // Ensure user can only access their own bookings
      .single();

    if (error) {
      throw error;
    }

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });

  } catch (error: any) {
    console.error('Get booking error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get booking',
        code: error.code 
      },
      { status: 500 }
    );
  }
}