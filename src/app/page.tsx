import Contact from '@/components/home/Contact'
import HeroSection from '@/components/home/HeroSection'
import ServicePage from '@/components/home/ServicePage'
import WhyChoosePage from '@/components/home/WhyChoose'
import React from 'react'

const HomePage = () => {
  return (
    <section>
      <HeroSection />
      <ServicePage />
      <WhyChoosePage />
      <Contact />
    </section>
  )
}

export default HomePage