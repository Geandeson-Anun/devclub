"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CompanyMarquee } from "@/components/company-marquee"
import { AudienceSection } from "@/components/audience-section"
import { AboutSection } from "@/components/about-section"
import { CoursesSection } from "@/components/courses-section"
import { TutorsSection } from "@/components/tutors-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { SalaryMarketSection } from "@/components/salary-market-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SolutionSection } from "@/components/solution-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  // O Header só desce para seu lugar depois que toda a sequência de entrada
  // do Hero (notebook + headline + textos + CTA) termina.
  const [headerRevealed, setHeaderRevealed] = useState(false)
  const [heroVideoEnabled, setHeroVideoEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header revealed={headerRevealed} onRevealComplete={() => setHeroVideoEnabled(true)} />

      <main>
        <Hero
          onSequenceComplete={() => setHeaderRevealed(true)}
          videoEnabled={heroVideoEnabled}
        />

        <CompanyMarquee />

        <AudienceSection />

        <AboutSection />

        <CoursesSection />

        <TutorsSection />

        <EcosystemSection />

        <SalaryMarketSection />

        <TestimonialsSection />

        <SolutionSection />

        <FaqSection />
      </main>

      <Footer />
    </div>
  )
}
