import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { TimelinePreview } from '@/components/timeline-preview'
import { CulturesSection } from '@/components/cultures-section'
import { AchievementsSection } from '@/components/achievements-section'
import { CTASection } from '@/components/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TimelinePreview />
      <CulturesSection />
      <AchievementsSection />
      <CTASection />
    </div>
  )
} 