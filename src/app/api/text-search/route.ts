import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for text search request
const TextSearchSchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  location: z.string().optional(),
  profession: z.string().optional(),
  company: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
});

// Mock database of people profiles
const mockProfiles = [
  {
    id: '1',
    name: 'John Smith',
    profession: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    imageUrl: '/api/images/profile1.jpg',
    bio: 'Experienced software engineer with 10+ years in web development.',
    email: 'john.smith@techcorp.com',
    phone: '+1-555-0123',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith',
      github: 'https://github.com/johnsmith',
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        duration: '2020 - Present',
      },
      {
        title: 'Software Engineer',
        company: 'Startup Inc',
        duration: '2018 - 2020',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Stanford University',
        year: '2018',
      },
    ],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    profession: 'Data Scientist',
    company: 'AI Solutions',
    location: 'New York, NY',
    imageUrl: '/api/images/profile2.jpg',
    bio: 'Data scientist specializing in machine learning and AI applications.',
    email: 'sarah.johnson@aisolutions.com',
    phone: '+1-555-0124',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
    },
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    experience: [
      {
        title: 'Senior Data Scientist',
        company: 'AI Solutions',
        duration: '2021 - Present',
      },
      {
        title: 'Data Analyst',
        company: 'Analytics Corp',
        duration: '2019 - 2021',
      },
    ],
    education: [
      {
        degree: 'Master of Science in Data Science',
        institution: 'MIT',
        year: '2019',
      },
    ],
  },
  {
    id: '3',
    name: 'Michael Chen',
    profession: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Seattle, WA',
    imageUrl: '/api/images/profile3.jpg',
    bio: 'Product manager with expertise in user experience and market strategy.',
    email: 'michael.chen@innovationlabs.com',
    phone: '+1-555-0125',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelchen',
    },
    skills: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
    experience: [
      {
        title: 'Senior Product Manager',
        company: 'Innovation Labs',
        duration: '2020 - Present',
      },
      {
        title: 'Product Manager',
        company: 'Tech Startup',
        duration: '2018 - 2020',
      },
    ],
    education: [
      {
        degree: 'MBA in Business Administration',
        institution: 'Harvard Business School',
        year: '2018',
      },
    ],
  },
  {
    id: '4',
    name: 'Emily Davis',
    profession: 'UX Designer',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    imageUrl: '/api/images/profile4.jpg',
    bio: 'Creative UX designer passionate about user-centered design and accessibility.',
    email: 'emily.davis@designstudio.com',
    phone: '+1-555-0126',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emilydavis',
      behance: 'https://behance.net/emilydavis',
      dribbble: 'https://dribbble.com/emilydavis',
    },
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research'],
    experience: [
      {
        title: 'Senior UX Designer',
        company: 'Design Studio',
        duration: '2021 - Present',
      },
      {
        title: 'UX Designer',
        company: 'Creative Agency',
        duration: '2019 - 2021',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Design in Interaction Design',
        institution: 'Parsons School of Design',
        year: '2019',
      },
    ],
  },
  {
    id: '5',
    name: 'David Wilson',
    profession: 'Marketing Director',
    company: 'Global Marketing',
    location: 'Chicago, IL',
    imageUrl: '/api/images/profile5.jpg',
    bio: 'Strategic marketing director with expertise in digital marketing and brand development.',
    email: 'david.wilson@globalmarketing.com',
    phone: '+1-555-0127',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidwilson',
      twitter: 'https://twitter.com/davidwilson',
    },
    skills: ['Digital Marketing', 'Brand Strategy', 'SEO', 'Social Media'],
    experience: [
      {
        title: 'Marketing Director',
        company: 'Global Marketing',
        duration: '2019 - Present',
      },
      {
        title: 'Marketing Manager',
        company: 'Brand Corp',
        duration: '2017 - 2019',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Business Administration in Marketing',
        institution: 'Northwestern University',
        year: '2017',
      },
    ],
  },
];

// Search function
function searchProfiles(query: string, filters: any, page: number, limit: number) {
  let results = mockProfiles.filter(profile => {
    const searchableText = [
      profile.name,
      profile.profession,
      profile.company,
      profile.location,
      profile.bio,
      ...profile.skills,
    ].join(' ').toLowerCase();
    
    const queryLower = query.toLowerCase();
    
    // Check if query matches any part of the profile
    if (!searchableText.includes(queryLower)) {
      return false;
    }
    
    // Apply filters
    if (filters.location && !profile.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.profession && !profile.profession.toLowerCase().includes(filters.profession.toLowerCase())) {
      return false;
    }
    if (filters.company && !profile.company.toLowerCase().includes(filters.company.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort by relevance (simple implementation)
  results.sort((a, b) => {
    const aScore = a.name.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
    const bScore = b.name.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
    return bScore - aScore;
  });
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = results.slice(startIndex, endIndex);
  
  return {
    results: paginatedResults,
    pagination: {
      page,
      limit,
      total: results.length,
      totalPages: Math.ceil(results.length / limit),
      hasNext: endIndex < results.length,
      hasPrev: page > 1,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const queryData = {
      q: searchParams.get('q') || '',
      location: searchParams.get('location') || undefined,
      profession: searchParams.get('profession') || undefined,
      company: searchParams.get('company') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    };
    
    const validatedData = TextSearchSchema.parse(queryData);
    
    // Perform search
    const searchResults = searchProfiles(
      validatedData.q,
      {
        location: validatedData.location,
        profession: validatedData.profession,
        company: validatedData.company,
      },
      validatedData.page,
      validatedData.limit
    );
    
    return NextResponse.json({
      success: true,
      query: validatedData.q,
      filters: {
        location: validatedData.location,
        profession: validatedData.profession,
        company: validatedData.company,
      },
      ...searchResults,
      metadata: {
        searchTime: '0.15s',
        totalResults: searchResults.pagination.total,
        querySuggestions: [
          `${validatedData.q} engineer`,
          `${validatedData.q} manager`,
          `${validatedData.q} designer`,
        ],
      },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Text search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 