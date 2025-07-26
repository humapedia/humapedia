import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Mock profile database
const mockProfiles = {
  '1': {
    id: '1',
    name: 'John Smith',
    profession: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    imageUrl: '/api/images/profile1.jpg',
    bio: 'Experienced software engineer with 10+ years in web development. Passionate about creating scalable and maintainable code. Specialized in React, Node.js, and cloud technologies.',
    email: 'john.smith@techcorp.com',
    phone: '+1-555-0123',
    rating: 4.8,
    views: 1247,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith',
      github: 'https://github.com/johnsmith',
      website: 'https://johnsmith.dev',
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'MongoDB'],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        duration: '2020 - Present',
        description: 'Leading development of microservices architecture and mentoring junior developers.',
      },
      {
        title: 'Software Engineer',
        company: 'Startup Inc',
        duration: '2018 - 2020',
        description: 'Built and maintained full-stack web applications using modern technologies.',
      },
      {
        title: 'Junior Developer',
        company: 'Digital Solutions',
        duration: '2016 - 2018',
        description: 'Developed frontend components and assisted with backend API development.',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Stanford University',
        year: '2016',
        gpa: '3.8',
      },
      {
        degree: 'Master of Science in Software Engineering',
        institution: 'UC Berkeley',
        year: '2018',
        gpa: '3.9',
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        year: '2021',
      },
      {
        name: 'Google Cloud Professional Developer',
        issuer: 'Google',
        year: '2020',
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built a scalable e-commerce platform using React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://github.com/johnsmith/ecommerce',
      },
      {
        name: 'Task Management App',
        description: 'Real-time task management application with collaborative features',
        technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        url: 'https://github.com/johnsmith/taskapp',
      },
    ],
    achievements: [
      'Led team of 5 developers to deliver project 2 weeks ahead of schedule',
      'Reduced application load time by 40% through optimization',
      'Mentored 3 junior developers who were promoted within 1 year',
    ],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    interests: ['Open Source', 'Machine Learning', 'Blockchain', 'Hiking'],
    availability: 'Open to new opportunities',
    salary: '$120,000 - $150,000',
    remote: true,
    relocation: false,
  },
  '2': {
    id: '2',
    name: 'Sarah Johnson',
    profession: 'Data Scientist',
    company: 'AI Solutions',
    location: 'New York, NY',
    imageUrl: '/api/images/profile2.jpg',
    bio: 'Data scientist with expertise in machine learning and statistical analysis. Passionate about turning data into actionable insights and building predictive models.',
    email: 'sarah.johnson@aisolutions.com',
    phone: '+1-555-0124',
    rating: 4.9,
    views: 2156,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      website: 'https://sarahjohnson.ai',
    },
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R', 'Tableau', 'Spark', 'Deep Learning'],
    experience: [
      {
        title: 'Senior Data Scientist',
        company: 'AI Solutions',
        duration: '2021 - Present',
        description: 'Leading machine learning projects and developing predictive models for enterprise clients.',
      },
      {
        title: 'Data Analyst',
        company: 'Analytics Corp',
        duration: '2019 - 2021',
        description: 'Performed data analysis and created dashboards for business stakeholders.',
      },
    ],
    education: [
      {
        degree: 'Master of Science in Data Science',
        institution: 'MIT',
        year: '2019',
        gpa: '3.9',
      },
      {
        degree: 'Bachelor of Science in Statistics',
        institution: 'Harvard University',
        year: '2017',
        gpa: '3.8',
      },
    ],
    certifications: [
      {
        name: 'Google Cloud Professional Data Engineer',
        issuer: 'Google',
        year: '2022',
      },
      {
        name: 'AWS Machine Learning Specialty',
        issuer: 'Amazon Web Services',
        year: '2021',
      },
    ],
    projects: [
      {
        name: 'Customer Churn Prediction',
        description: 'Developed ML model to predict customer churn with 85% accuracy',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
        url: 'https://github.com/sarahjohnson/churn-prediction',
      },
      {
        name: 'Sentiment Analysis API',
        description: 'Built REST API for real-time sentiment analysis of social media posts',
        technologies: ['Python', 'Flask', 'NLTK', 'Docker'],
        url: 'https://github.com/sarahjohnson/sentiment-api',
      },
    ],
    achievements: [
      'Improved model accuracy by 15% through feature engineering',
      'Reduced data processing time by 60% using parallel computing',
      'Published 3 research papers in top-tier conferences',
    ],
    languages: ['English (Native)', 'Mandarin (Fluent)', 'German (Basic)'],
    interests: ['Research', 'AI Ethics', 'Data Visualization', 'Yoga'],
    availability: 'Actively seeking new opportunities',
    salary: '$130,000 - $160,000',
    remote: true,
    relocation: true,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate profile ID
    if (!id || !mockProfiles[id as keyof typeof mockProfiles]) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const profile = mockProfiles[id as keyof typeof mockProfiles];
    
    // Increment view count (mock implementation)
    profile.views += 1;

    return NextResponse.json({
      success: true,
      profile,
      metadata: {
        lastUpdated: new Date().toISOString(),
        dataSource: 'mock_database',
        version: '1.0.0',
      },
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validate profile ID
    if (!id || !mockProfiles[id as keyof typeof mockProfiles]) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Update profile (mock implementation)
    const updatedProfile = {
      ...mockProfiles[id as keyof typeof mockProfiles],
      ...body,
      id, // Ensure ID doesn't change
      lastUpdated: new Date().toISOString(),
    };

    // In a real implementation, you would save to database
    // mockProfiles[id] = updatedProfile;

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
      message: 'Profile updated successfully',
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate profile ID
    if (!id || !mockProfiles[id as keyof typeof mockProfiles]) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Delete profile (mock implementation)
    // In a real implementation, you would remove from database
    // delete mockProfiles[id];

    return NextResponse.json({
      success: true,
      message: 'Profile deleted successfully',
    });

  } catch (error) {
    console.error('Delete profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 