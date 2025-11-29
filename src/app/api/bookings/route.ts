import { NextRequest, NextResponse } from 'next/server';
import { bookingService, authService } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const user = await authService.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { showtime_id, seats, total_price } = await request.json();

    // Validate required fields
    if (!showtime_id || !seats || !Array.isArray(seats) || seats.length === 0 || !total_price) {
      return NextResponse.json(
        { error: 'Showtime ID, seats array, and total price are required' },
        { status: 400 }
      );
    }

    // Validate seats are strings
    if (!seats.every(seat => typeof seat === 'string')) {
      return NextResponse.json(
        { error: 'All seats must be valid seat identifiers' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await bookingService.createBooking({
      user_id: user.id,
      showtime_id,
      seats,
      total_price,
      booking_status: 'confirmed'
    });

    return NextResponse.json({
      booking,
      message: 'Booking created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Booking creation error:', error);
    
    // Handle specific database errors
    if (error.message?.includes('available_seats')) {
      return NextResponse.json(
        { error: 'Not enough available seats' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create booking',
        code: error.code 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated
    const user = await authService.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const bookings = await bookingService.getUserBookings(user.id);

    return NextResponse.json({
      bookings,
      count: bookings.length
    });

  } catch (error: any) {
    console.error('Get bookings error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get bookings',
        code: error.code 
      },
      { status: 500 }
    );
  }
}