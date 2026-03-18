import HeroSection from '@/components/HeroSection'
import Section2 from '@/components/Section2'
import SectionHowToShop from '@/components/SectionHowToShop'
import Section3 from '@/components/Section3'
import MemoriesSection from '@/components/MemoriesSection'
import EditorialBreak from '@/components/EditorialBreak'
import FooterCountdown from '@/components/FooterCountdown'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Section2 />
      <SectionHowToShop />
      <Section3 />
      <MemoriesSection />
      <EditorialBreak />
      <FooterCountdown />
    </main>
  )
}
