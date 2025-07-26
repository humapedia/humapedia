import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schemas
const GetSearchHistorySchema = z.object({
  userId: z.string().optional(),
  limit: z.number().min(1).max(100).optional().default(20),
  offset: z.number().min(0).optional().default(0),
});

const SaveSearchSchema = z.object({
  userId: z.string(),
  query: z.string().min(1),
  type: z.enum(['face_search', 'text_search']),
  results: z.number().min(0),
  filters: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
});

// Mock search history data
const mockSearchHistory = {
  'user-1': [
    {
      id: 'search-1',
      userId: 'user-1',
      query: 'John Smith',
      type: 'text_search',
      results: 3,
      filters: {
        location: 'San Francisco, CA',
        profession: 'Software Engineer',
      },
      timestamp: '2024-01-16T10:30:00Z',
      success: true,
    },
    {
      id: 'search-2',
      userId: 'user-1',
      query: 'face_search_upload',
      type: 'face_search',
      results: 2,
      filters: {
        location: 'New York, NY',
      },
      timestamp: '2024-01-15T16:45:00Z',
      success: true,
      imageUrl: '/api/images/uploaded_face.jpg',
    },
    {
      id: 'search-3',
      userId: 'user-1',
      query: 'Sarah Johnson',
      type: 'text_search',
      results: 1,
      filters: {},
      timestamp: '2024-01-14T14:20:00Z',
      success: true,
    },
    {
      id: 'search-4',
      userId: 'user-1',
      query: 'Michael Chen',
      type: 'text_search',
      results: 0,
      filters: {
        company: 'Tech Corp',
      },
      timestamp: '2024-01-13T11:15:00Z',
      success: false,
      error: 'No results found',
    },
  ],
  'user-2': [
    {
      id: 'search-5',
      userId: 'user-2',
      query: 'Emily Davis',
      type: 'text_search',
      results: 1,
      filters: {
        profession: 'UX Designer',
      },
      timestamp: '2024-01-16T09:00:00Z',
      success: true,
    },
    {
      id: 'search-6',
      userId: 'user-2',
      query: 'face_search_upload',
      type: 'face_search',
      results: 3,
      filters: {},
      timestamp: '2024-01-15T13:30:00Z',
      success: true,
      imageUrl: '/api/images/uploaded_face_2.jpg',
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const queryData = {
      userId: searchParams.get('userId') || 'user-1',
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };
    
    const validatedData = GetSearchHistorySchema.parse(queryData);
    
    // Get search history for user
    const userHistory = mockSearchHistory[validatedData.userId as keyof typeof mockSearchHistory] || [];
    
    // Apply pagination
    const paginatedHistory = userHistory
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(validatedData.offset, validatedData.offset + validatedData.limit);
    
    // Calculate statistics
    const totalSearches = userHistory.length;
    const successfulSearches = userHistory.filter(search => search.success).length;
    const faceSearches = userHistory.filter(search => search.type === 'face_search').length;
    const textSearches = userHistory.filter(search => search.type === 'text_search').length;
    
    // Get recent queries for suggestions
    const recentQueries = userHistory
      .filter(search => search.type === 'text_search' && search.success)
      .map(search => search.query)
      .slice(0, 5);
    
    return NextResponse.json({
      success: true,
      history: paginatedHistory,
      pagination: {
        total: totalSearches,
        limit: validatedData.limit,
        offset: validatedData.offset,
        hasMore: validatedData.offset + validatedData.limit < totalSearches,
      },
      statistics: {
        totalSearches,
        successfulSearches,
        successRate: totalSearches > 0 ? (successfulSearches / totalSearches) * 100 : 0,
        faceSearches,
        textSearches,
        averageResults: totalSearches > 0 
          ? userHistory.reduce((sum, search) => sum + search.results, 0) / totalSearches 
          : 0,
      },
      suggestions: recentQueries,
      metadata: {
        lastUpdated: new Date().toISOString(),
        dataSource: 'mock_database',
      },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Get search history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = SaveSearchSchema.parse(body);
    
    const userId = validatedData.userId;
    const searchEntry = {
      id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: validatedData.userId,
      query: validatedData.query,
      type: validatedData.type,
      results: validatedData.results,
      filters: validatedData.filters || {},
      timestamp: validatedData.timestamp || new Date().toISOString(),
      success: validatedData.results > 0,
    };
    
    // Add to search history (mock implementation)
    if (!mockSearchHistory[userId as keyof typeof mockSearchHistory]) {
      mockSearchHistory[userId as keyof typeof mockSearchHistory] = [];
    }
    
    mockSearchHistory[userId as keyof typeof mockSearchHistory].unshift(searchEntry);
    
    // Keep only last 100 searches per user
    if (mockSearchHistory[userId as keyof typeof mockSearchHistory].length > 100) {
      mockSearchHistory[userId as keyof typeof mockSearchHistory] = 
        mockSearchHistory[userId as keyof typeof mockSearchHistory].slice(0, 100);
    }
    
    return NextResponse.json({
      success: true,
      searchEntry,
      message: 'Search saved to history',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Save search history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const searchId = searchParams.get('searchId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    if (searchId) {
      // Delete specific search entry
      const userHistory = mockSearchHistory[userId as keyof typeof mockSearchHistory];
      if (userHistory) {
        const index = userHistory.findIndex(search => search.id === searchId);
        if (index !== -1) {
          userHistory.splice(index, 1);
          return NextResponse.json({
            success: true,
            message: 'Search entry deleted successfully',
          });
        }
      }
      return NextResponse.json(
        { error: 'Search entry not found' },
        { status: 404 }
      );
    } else {
      // Clear all search history for user
      if (mockSearchHistory[userId as keyof typeof mockSearchHistory]) {
        mockSearchHistory[userId as keyof typeof mockSearchHistory] = [];
      }
      
      return NextResponse.json({
        success: true,
        message: 'Search history cleared successfully',
      });
    }

  } catch (error) {
    console.error('Delete search history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 