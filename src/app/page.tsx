import HeroSection from '@/components/HeroSection'
import Section2 from '@/components/Section2'
import PhotoStrip from '@/components/PhotoStrip'
import SectionHowToShop from '@/components/SectionHowToShop'
import Section3 from '@/components/Section3'
import EditorialBreak from '@/components/EditorialBreak'
import FooterCountdown from '@/components/FooterCountdown'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Section2 />
      <PhotoStrip />
      <SectionHowToShop />
      <Section3 />
      <EditorialBreak />
      <FooterCountdown />
    </main>
  )
}
