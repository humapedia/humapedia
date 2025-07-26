'use client';
import { useState } from 'react';
import { 
  QuestionMarkCircleIcon, 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  BookOpenIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'search' | 'credits' | 'privacy' | 'technical';
  tags: string[];
}

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
}

interface HelpCenterProps {
  onContactSupport?: () => void;
}

export default function HelpCenter({ onContactSupport }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'faq' | 'articles' | 'contact'>('faq');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How does face search work?',
      answer: 'Face search uses advanced AI technology to analyze facial features in uploaded photos and find matching profiles in our database. Simply upload a clear photo with a visible face, and our system will search for similar profiles. Each face search costs 3 credits.',
      category: 'search',
      tags: ['face search', 'ai', 'credits']
    },
    {
      id: '2',
      question: 'How do I purchase credits?',
      answer: 'You can purchase credits by visiting the Credits page. We offer various packages starting from 10 credits. Payment can be made via credit card, PayPal, or other supported payment methods. Credits are added to your account immediately after successful payment.',
      category: 'credits',
      tags: ['purchase', 'payment', 'packages']
    },
    {
      id: '3',
      question: 'Is my search history private?',
      answer: 'Yes, your search history is private by default. You can control this in your privacy settings. You can choose to save or not save your search history, and you can delete individual searches or clear your entire history at any time.',
      category: 'privacy',
      tags: ['privacy', 'history', 'settings']
    },
    {
      id: '4',
      question: 'What file formats are supported for face search?',
      answer: 'We support common image formats including JPEG, PNG, and WebP. The maximum file size is 10MB. For best results, use clear, well-lit photos with the face clearly visible and unobstructed.',
      category: 'technical',
      tags: ['file formats', 'image quality', 'file size']
    },
    {
      id: '5',
      question: 'How accurate is the face search?',
      answer: 'Our face search technology has a high accuracy rate, but results may vary depending on image quality, lighting, and facial features. We provide confidence scores for each match to help you evaluate the results.',
      category: 'search',
      tags: ['accuracy', 'confidence', 'results']
    },
    {
      id: '6',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account at any time from your settings page. This will permanently remove all your data including search history, profile information, and remaining credits. This action cannot be undone.',
      category: 'privacy',
      tags: ['account deletion', 'data removal', 'permanent']
    },
    {
      id: '7',
      question: 'How do I report incorrect information?',
      answer: 'If you find incorrect information in a profile, you can report it by clicking the "Report" button on the profile page. Our team will review the report and take appropriate action to correct or remove inaccurate information.',
      category: 'general',
      tags: ['reporting', 'accuracy', 'moderation']
    },
    {
      id: '8',
      question: 'What happens if I run out of credits?',
      answer: 'When you run out of credits, you can still browse profiles but cannot perform new searches. You\'ll need to purchase more credits to continue using the search features. We\'ll notify you when your balance is low.',
      category: 'credits',
      tags: ['low balance', 'purchasing', 'notifications']
    }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'Getting Started with Humapedia',
      content: 'Learn how to create your account, set up your profile, and start searching for people using our powerful face and text search features.',
      category: 'Getting Started',
      tags: ['tutorial', 'setup', 'basics'],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Advanced Search Techniques',
      content: 'Discover advanced search techniques including filtering by location, profession, and company to find exactly who you\'re looking for.',
      category: 'Search',
      tags: ['advanced', 'filters', 'techniques'],
      lastUpdated: '2024-01-10'
    },
    {
      id: '3',
      title: 'Understanding Search Results',
      content: 'Learn how to interpret search results, understand confidence scores, and make the most of the information provided.',
      category: 'Search',
      tags: ['results', 'confidence', 'interpretation'],
      lastUpdated: '2024-01-08'
    },
    {
      id: '4',
      title: 'Privacy and Security Guide',
      content: 'Comprehensive guide to privacy settings, data protection, and security features to keep your information safe.',
      category: 'Privacy',
      tags: ['security', 'privacy', 'protection'],
      lastUpdated: '2024-01-12'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: BookOpenIcon },
    { id: 'general', label: 'General', icon: QuestionMarkCircleIcon },
    { id: 'search', label: 'Search', icon: MagnifyingGlassIcon },
    { id: 'credits', label: 'Credits', icon: AcademicCapIcon },
    { id: 'privacy', label: 'Privacy', icon: DocumentTextIcon },
    { id: 'technical', label: 'Technical', icon: AcademicCapIcon }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = helpArticles.filter(article => {
    return searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help Center</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find answers to common questions and learn how to use Humapedia effectively
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon },
            { id: 'articles', label: 'Help Articles', icon: BookOpenIcon },
            { id: 'contact', label: 'Contact Support', icon: ChatBubbleLeftRightIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeCategory === tab.id
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeCategory === 'faq' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQ.length === 0 ? (
                <div className="text-center py-12">
                  <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or browse all categories
                  </p>
                </div>
              ) : (
                filteredFAQ.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(item.id)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.question}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {item.category}
                          </span>
                          <svg
                            className={cn(
                              "h-5 w-5 text-gray-500 transition-transform",
                              expandedFAQ === item.id && "rotate-180"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    {expandedFAQ === item.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeCategory === 'articles' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredArticles.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {article.title}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {article.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        Updated {article.lastUpdated}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeCategory === 'contact' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Can't find what you're looking for? Our support team is here to help.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <EnvelopeIcon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Email Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Get a response within 24 hours
                </p>
                <a
                  href="mailto:support@humapedia.org"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Send Email
                </a>
              </div>

              <div className="text-center">
                <PhoneIcon className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Phone Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Available Mon-Fri, 9AM-6PM EST
                </p>
                <a
                  href="tel:+1-800-HUMAPEDIA"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Call Now
                </a>
              </div>

              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Live Chat</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Instant help from our team
                </p>
                <button
                  onClick={onContactSupport}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                  Start Chat
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Before contacting support:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Check our FAQ section for quick answers</li>
                <li>• Review our help articles for detailed guides</li>
                <li>• Have your account information ready</li>
                <li>• Include relevant screenshots if reporting an issue</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 