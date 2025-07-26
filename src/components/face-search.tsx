'use client';

import { useState, useRef } from 'react';
import { CameraIcon, PhotoIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface FaceSearchResult {
  id: string;
  name: string;
  confidence: number;
  profession: string;
  company: string;
  location: string;
  imageUrl: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface FaceSearchProps {
  onResults?: (results: FaceSearchResult[]) => void;
  onError?: (error: string) => void;
}

export default function FaceSearch({ onResults, onError }: FaceSearchProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [results, setResults] = useState<FaceSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    location: '',
    profession: '',
    company: '',
  });
  const [credits, setCredits] = useState(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    if (credits < 3) {
      setError('Insufficient credits. Face search requires 3 credits.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/face-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          filters: Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value.trim() !== '')
          ),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      setResults(data.matches);
      setCredits(data.credits.remaining);
      onResults?.(data.matches);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setUploadedImage(null);
    setResults([]);
    setError(null);
    setFilters({ location: '', profession: '', company: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Face Search
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Upload a photo to find matching profiles using AI analysis
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
            AI Analysis (3 credits)
          </span>
          <span className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
            High Accuracy
          </span>
          <span className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
            Secure Processing
          </span>
        </div>
      </div>

      {/* Credits Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Available Credits</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Face search costs 3 credits per analysis
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {credits}
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Buy More Credits
            </button>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            {!uploadedImage ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Upload a photo with a clear face
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Supported formats: JPG, PNG, WebP (max 10MB)
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="btn-primary flex items-center"
                  >
                    <PhotoIcon className="w-5 h-5 mr-2" />
                    {isUploading ? 'Uploading...' : 'Choose File'}
                  </button>
                  <button className="btn-secondary flex items-center">
                    <CameraIcon className="w-5 h-5 mr-2" />
                    Take Photo
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleClear}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  ✓ Image uploaded successfully
                </p>
              </div>
            )}
          </div>

          {/* Filters */}
          {uploadedImage && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  value={filters.profession}
                  onChange={(e) => handleFilterChange('profession', e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  placeholder="e.g., Tech Corp"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {uploadedImage && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || credits < 3}
                className="btn-primary flex items-center"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Photo'}
              </button>
              <button
                onClick={handleClear}
                className="btn-secondary"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Search Results ({results.length} matches)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                      {result.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {result.profession} at {result.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {result.location}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        {Math.round(result.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {result.bio}
                </p>
                <div className="mt-3 flex space-x-2">
                  {result.socialLinks.linkedin && (
                    <a
                      href={result.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      LinkedIn
                    </a>
                  )}
                  {result.socialLinks.twitter && (
                    <a
                      href={result.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 