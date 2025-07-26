import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Humapedia - The Ultimate Human Knowledge Encyclopedia',
  description: 'Explore human history, culture, achievements, and knowledge across all civilizations and time periods. A comprehensive platform for discovering the vast wealth of human knowledge.',
  keywords: 'encyclopedia, knowledge, human history, culture, achievements, civilization, education, timeline',
  authors: [{ name: 'Humapedia Team' }],
  creator: 'Humapedia Team',
  publisher: 'Humapedia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://humapedia.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Humapedia - The Ultimate Human Knowledge Encyclopedia',
    description: 'Explore human history, culture, achievements, and knowledge across all civilizations and time periods.',
    url: 'https://humapedia.org',
    siteName: 'Humapedia',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Humapedia - Human Knowledge Encyclopedia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humapedia - The Ultimate Human Knowledge Encyclopedia',
    description: 'Explore human history, culture, achievements, and knowledge across all civilizations and time periods.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 