import { NextRequest, NextResponse } from 'next/server';
import { bookingService, authService } from '@/lib/database';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
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

    const resolvedParams = await params;
    const bookingId = parseInt(resolvedParams.id);
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

    // Use the booking service to update the booking
    const booking = await bookingService.updateBookingStatus(
      bookingId,
      user.id,
      booking_status
    );

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

    const resolvedParams = await params;
    const bookingId = parseInt(resolvedParams.id);
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      );
    }

    const booking = await bookingService.getBookingById(bookingId, user.id);

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