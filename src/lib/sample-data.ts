// Sample data for Humapedia - Human Knowledge Encyclopedia

export interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  category: string
  region: string
  impact?: string
}

export interface Culture {
  id: number
  name: string
  region: string
  period: string
  description: string
  achievements: string[]
  image?: string
}

export interface Achievement {
  id: number
  title: string
  category: string
  period: string
  description: string
  impact: string
  region: string
}

export interface SearchResult {
  id: number
  title: string
  category: string
  period: string
  description: string
  relevance: number
}

// Sample timeline events
export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '3000 BCE',
    title: 'Ancient Egypt Begins',
    description: 'The first dynasty of Egypt begins, marking the start of one of the world\'s most influential civilizations.',
    category: 'Civilization',
    region: 'Africa',
    impact: 'Foundation of one of the world\'s oldest civilizations',
  },
  {
    id: 2,
    year: '2500 BCE',
    title: 'Great Pyramid of Giza',
    description: 'Construction of the Great Pyramid of Giza, one of the Seven Wonders of the Ancient World.',
    category: 'Architecture',
    region: 'Africa',
    impact: 'Engineering marvel and cultural symbol',
  },
  {
    id: 3,
    year: '776 BCE',
    title: 'First Olympic Games',
    description: 'The ancient Olympic Games are held in Olympia, Greece, establishing a tradition that continues today.',
    category: 'Sports',
    region: 'Europe',
    impact: 'Foundation of international sports competition',
  },
  {
    id: 4,
    year: '551 BCE',
    title: 'Confucius Born',
    description: 'Birth of Confucius, whose teachings would shape Chinese philosophy and culture for millennia.',
    category: 'Philosophy',
    region: 'Asia',
    impact: 'Influence on Chinese and East Asian culture',
  },
  {
    id: 5,
    year: '44 BCE',
    title: 'Julius Caesar Assassinated',
    description: 'The assassination of Julius Caesar marks a turning point in Roman history and world politics.',
    category: 'Politics',
    region: 'Europe',
    impact: 'End of Roman Republic, beginning of Empire',
  },
  {
    id: 6,
    year: '30 BCE',
    title: 'Roman Empire Established',
    description: 'Augustus becomes the first Roman Emperor, beginning the Roman Empire.',
    category: 'Empire',
    region: 'Europe',
    impact: 'Unification of Mediterranean world',
  },
  {
    id: 7,
    year: '570 CE',
    title: 'Muhammad Born',
    description: 'Birth of Muhammad, the founder of Islam and one of history\'s most influential figures.',
    category: 'Religion',
    region: 'Asia',
    impact: 'Foundation of Islam and Islamic civilization',
  },
  {
    id: 8,
    year: '800 CE',
    title: 'Charlemagne Crowned',
    description: 'Charlemagne is crowned Holy Roman Emperor, uniting much of Western Europe.',
    category: 'Politics',
    region: 'Europe',
    impact: 'Unification of Western Europe',
  },
  {
    id: 9,
    year: '1066 CE',
    title: 'Norman Conquest',
    description: 'William the Conqueror invades England, changing the course of English history.',
    category: 'War',
    region: 'Europe',
    impact: 'Transformation of English society and language',
  },
  {
    id: 10,
    year: '1455 CE',
    title: 'Gutenberg Bible',
    description: 'Johannes Gutenberg prints the first book using movable type, revolutionizing information sharing.',
    category: 'Technology',
    region: 'Europe',
    impact: 'Revolution in information dissemination',
  },
]

// Sample cultures
export const cultures: Culture[] = [
  {
    id: 1,
    name: 'Ancient Egypt',
    region: 'Africa',
    period: '3000 BCE - 30 BCE',
    description: 'One of the world\'s oldest civilizations, known for pyramids, pharaohs, and the Nile River.',
    achievements: ['Pyramids', 'Hieroglyphics', 'Mummification', 'Solar Calendar'],
  },
  {
    id: 2,
    name: 'Ancient Greece',
    region: 'Europe',
    period: '800 BCE - 146 BCE',
    description: 'The birthplace of democracy, philosophy, and Western civilization.',
    achievements: ['Democracy', 'Philosophy', 'Olympic Games', 'Classical Art'],
  },
  {
    id: 3,
    name: 'Imperial China',
    region: 'Asia',
    period: '221 BCE - 1912 CE',
    description: 'One of the world\'s oldest continuous civilizations with rich cultural heritage.',
    achievements: ['Great Wall', 'Silk Road', 'Paper Making', 'Gunpowder'],
  },
  {
    id: 4,
    name: 'Roman Empire',
    region: 'Europe',
    period: '27 BCE - 476 CE',
    description: 'The ancient Roman state that dominated the Mediterranean world for centuries.',
    achievements: ['Roman Law', 'Aqueducts', 'Roads', 'Architecture'],
  },
  {
    id: 5,
    name: 'Maya Civilization',
    region: 'Americas',
    period: '2000 BCE - 900 CE',
    description: 'Advanced pre-Columbian civilization known for mathematics and astronomy.',
    achievements: ['Calendar System', 'Mathematics', 'Astronomy', 'Architecture'],
  },
  {
    id: 6,
    name: 'Islamic Golden Age',
    region: 'Asia',
    period: '750 CE - 1258 CE',
    description: 'Period of cultural, economic, and scientific flourishing in Islamic history.',
    achievements: ['Algebra', 'Medicine', 'Astronomy', 'Philosophy'],
  },
]

// Sample achievements
export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'The Great Wall of China',
    category: 'Architecture',
    period: '7th century BCE - 1644 CE',
    description: 'One of the most impressive architectural feats in human history, spanning over 13,000 miles.',
    impact: 'Defense, Trade, Cultural Symbol',
    region: 'Asia',
  },
  {
    id: 2,
    title: 'The Printing Press',
    category: 'Technology',
    period: '1440 CE',
    description: 'Johannes Gutenberg\'s invention revolutionized the spread of knowledge and information.',
    impact: 'Education, Communication, Information Sharing',
    region: 'Europe',
  },
  {
    id: 3,
    title: 'The Internet',
    category: 'Technology',
    period: '1960s - Present',
    description: 'The global network that transformed communication and information sharing worldwide.',
    impact: 'Communication, Information, Globalization',
    region: 'Global',
  },
  {
    id: 4,
    title: 'Space Exploration',
    category: 'Science',
    period: '1957 - Present',
    description: 'Humanity\'s journey beyond Earth, from Sputnik to Mars rovers and beyond.',
    impact: 'Scientific Discovery, Technology, Inspiration',
    region: 'Global',
  },
  {
    id: 5,
    title: 'Democracy',
    category: 'Politics',
    period: '5th century BCE - Present',
    description: 'A system of government where power comes from the people, first developed in ancient Athens.',
    impact: 'Governance, Human Rights, Freedom',
    region: 'Global',
  },
  {
    id: 6,
    title: 'The Scientific Method',
    category: 'Science',
    period: '17th century - Present',
    description: 'A systematic approach to research and discovery that revolutionized human understanding.',
    impact: 'Scientific Progress, Innovation, Knowledge',
    region: 'Global',
  },
  {
    id: 7,
    title: 'Electricity',
    category: 'Technology',
    period: '19th century - Present',
    description: 'The discovery and harnessing of electrical power transformed human civilization.',
    impact: 'Industry, Communication, Modern Life',
    region: 'Global',
  },
  {
    id: 8,
    title: 'The Wheel',
    category: 'Technology',
    period: '3500 BCE',
    description: 'One of the most fundamental inventions that enabled transportation and machinery.',
    impact: 'Transportation, Industry, Civilization',
    region: 'Global',
  },
]

// Sample search results
export const searchResults: SearchResult[] = [
  {
    id: 1,
    title: 'Ancient Egypt',
    category: 'Civilization',
    period: '3000 BCE - 30 BCE',
    description: 'One of the world\'s oldest civilizations, known for pyramids, pharaohs, and the Nile River.',
    relevance: 95,
  },
  {
    id: 2,
    title: 'Roman Empire',
    category: 'Empire',
    period: '27 BCE - 476 CE',
    description: 'The ancient Roman state that dominated the Mediterranean world for centuries.',
    relevance: 92,
  },
  {
    id: 3,
    title: 'Great Wall of China',
    category: 'Architecture',
    period: '7th century BCE - 1644 CE',
    description: 'A series of fortifications built along the northern borders of China.',
    relevance: 88,
  },
  {
    id: 4,
    title: 'Renaissance',
    category: 'Cultural Movement',
    period: '14th - 17th century',
    description: 'A period of European cultural, artistic, political and scientific rebirth.',
    relevance: 85,
  },
]

// Categories for filtering
export const categories = [
  'All',
  'Civilization',
  'Empire',
  'Architecture',
  'Technology',
  'Science',
  'Art',
  'Politics',
  'Religion',
  'War',
  'Philosophy',
  'Sports',
  'Medicine',
  'Transportation',
]

// Regions for filtering
export const regions = [
  'All',
  'Africa',
  'Asia',
  'Europe',
  'Americas',
  'Oceania',
  'Global',
]

// Time periods for filtering
export const periods = [
  'All Periods',
  'Ancient (Before 500 CE)',
  'Medieval (500-1500)',
  'Early Modern (1500-1800)',
  'Modern (1800-Present)',
  'Contemporary (1900-Present)',
] 