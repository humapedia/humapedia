'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  BuildingOfficeIcon,
  GlobeAltIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { cn, formatDate, getInitials } from '@/lib/utils';

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface ProfileCardProps {
  id: string;
  name: string;
  profession: string;
  company: string;
  location: string;
  imageUrl: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: SocialLinks;
  skills: string[];
  experience: Experience[];
  education: Education[];
  rating?: number;
  views?: number;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onView?: (id: string) => void;
  onShare?: (id: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function ProfileCard({
  id,
  name,
  profession,
  company,
  location,
  imageUrl,
  bio,
  email,
  phone,
  socialLinks,
  skills,
  experience,
  education,
  rating = 0,
  views = 0,
  isFavorite = false,
  onFavorite,
  onView,
  onShare,
  className,
  variant = 'default'
}: ProfileCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState(isFavorite);

  const handleFavorite = () => {
    setIsLiked(!isLiked);
    onFavorite?.(id);
  };

  const handleView = () => {
    onView?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  const renderCompact = () => (
    <div className="flex items-center space-x-4 p-4">
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        {rating > 0 && (
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-1 rounded-full flex items-center">
            <StarIcon className="w-3 h-3 mr-0.5" />
            {rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {profession} at {company}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
          {location}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleFavorite}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          {isLiked ? (
            <HeartIconSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={handleView}
          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
        >
          <EyeIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderDefault = () => (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
          />
          {rating > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full flex items-center">
              <StarIcon className="w-3 h-3 mr-0.5" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {profession} at {company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {location}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {bio}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate"
          >
            {email}
          </a>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
          <a
            href={`tel:${phone}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {phone}
          </a>
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-gray-500">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="mt-4 flex space-x-3">
        {Object.entries(socialLinks).map(([platform, url]) => (
          url && (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <GlobeAltIcon className="w-5 h-5" />
            </a>
          )
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-1" />
            {views} views
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleFavorite}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDetailed = () => (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
          {rating > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full flex items-center">
              <StarIcon className="w-3 h-3 mr-0.5" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {profession} at {company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {location}
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {bio}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {email}
          </a>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
          <a
            href={`tel:${phone}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {phone}
          </a>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-gray-600 dark:text-gray-400">{location}</span>
        </div>
        <div className="flex items-center">
          <BuildingOfficeIcon className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-gray-600 dark:text-gray-400">{company}</span>
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Experience
          </h4>
          <div className="space-y-3">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {exp.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.company} • {exp.duration}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Education
          </h4>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {edu.degree}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {edu.institution} • {edu.year}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Social Links
        </h4>
        <div className="flex space-x-4">
          {Object.entries(socialLinks).map(([platform, url]) => (
            url && (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <GlobeAltIcon className="w-5 h-5" />
                <span className="capitalize">{platform}</span>
              </a>
            )
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-1" />
            {views} views
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleFavorite}
            className="btn-secondary flex items-center"
          >
            {isLiked ? (
              <HeartIconSolid className="w-4 h-4 mr-2 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 mr-2" />
            )}
            {isLiked ? 'Favorited' : 'Favorite'}
          </button>
          <button
            onClick={handleShare}
            className="btn-secondary flex items-center"
          >
            <ShareIcon className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'compact':
        return renderCompact();
      case 'detailed':
        return renderDetailed();
      default:
        return renderDefault();
    }
  };

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow',
      className
    )}>
      {renderContent()}
    </div>
  );
} 