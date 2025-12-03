import { NextRequest, NextResponse } from 'next/server';
import { showtimeService } from '@/lib/database';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const movieId = parseInt(resolvedParams.id);
    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const showtimes = await showtimeService.getMovieShowtimes(movieId);

    return NextResponse.json({
      showtimes,
      count: showtimes.length
    });

  } catch (error: any) {
    console.error('Get showtimes error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get showtimes',
        code: error.code 
      },
      { status: 500 }
    );
  }
}