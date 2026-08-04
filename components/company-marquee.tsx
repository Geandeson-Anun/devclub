"use client"

import { motion } from "framer-motion"

const COMPANIES = ["Nubank", "iFood", "Mercado Livre", "TOTVS", "XP Inc", "Stone", "CVC", "Unimed"]

function MarqueeRow() {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" aria-hidden="true">
      {COMPANIES.map((name) => (
        <li key={name}>
          <span className="cursor-default whitespace-nowrap text-xl font-semibold tracking-tight text-muted-foreground/60 transition-all duration-300 hover:text-foreground hover:drop-shadow-[0_0_12px_rgba(62,207,94,0.35)] sm:text-2xl">
            {name}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function CompanyMarquee() {
  return (
    <section aria-label="Empresas que contrataram nossos alunos" className="bg-[#0D0F14] py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6"
      >
        <p className="mb-10 text-center text-sm text-muted-foreground">
          Nossos alunos foram contratados por empresas como:
        </p>

        {/* Marquee track with edge fades */}
        <div className="group relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0D0F14] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0D0F14] to-transparent sm:w-28" />

          {/* Duplicated rows for seamless infinite loop */}
          <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
