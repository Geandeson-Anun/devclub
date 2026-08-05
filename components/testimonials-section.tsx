"use client"

import { useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useVideoInView } from "@/hooks/use-video-in-view"

type Testimonial = {
  quote: string
  name: string
  initials: string
  role: string
  company: string
  gradient: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "O DevClub mudou minha vida! Em menos de 6 meses consegui minha primeira vaga como desenvolvedora. A metodologia prática e o suporte dos mentores fazem toda a diferença.",
    name: "Ana Silva",
    initials: "AS",
    role: "Desenvolvedora Full Stack",
    company: "Tech Corp",
    gradient: "linear-gradient(135deg, #3ECF5E, #4ADE80)",
  },
  {
    quote:
      "As aulas ao vivo e os projetos práticos me prepararam para o mercado real. Hoje trabalho com React e Next.js graças ao conhecimento adquirido no DevClub.",
    name: "Carlos Oliveira",
    initials: "CO",
    role: "Front-end Developer",
    company: "StartupXYZ",
    gradient: "linear-gradient(135deg, #8B5CF6, #3ECF5E)",
  },
  {
    quote:
      "A comunidade do DevClub é incrível! Além do conhecimento técnico, fiz networking valioso que me ajudou a conseguir oportunidades incríveis na minha carreira.",
    name: "Marina Santos",
    initials: "MS",
    role: "Back-end Engineer",
    company: "Big Tech",
    gradient: "linear-gradient(135deg, #3ECF5E, #8B5CF6)",
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

function StarRating({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label="Avaliação 5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.12, duration: 0.3, ease: "backOut" }}
        >
          <Star className="h-4 w-4 fill-brand text-brand" />
        </motion.span>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useVideoInView(videoRef)

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-[#08090C] py-24 sm:py-32">
      {/* Background video — lazy-loaded (below the fold) */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.6) saturate(0.9)" }}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/videos/v-six.mp4" type="video/mp4" />
      </video>

      {/* Overlay for text legibility over the video */}
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" />

      {/* Ambient green glow (decorative) */}
      <div
        className="pointer-events-none absolute left-1/2 top-16 z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(62,207,94,0.4), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-sm text-brand">depoimentos_</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            O resultado comprova: Escola nº1 em Transição de Carreira no Brasil
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Alunos de todo o Brasil mudaram de vida com o DevClub.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const isAccent = i === 1
            return (
              <motion.article
                key={t.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative flex flex-col rounded-2xl border p-6 transition-colors duration-300 ${
                  isAccent
                    ? "border-accent-violet/25 bg-accent-violet/[0.04] hover:border-accent-violet/50"
                    : "border-white/10 bg-white/[0.02] hover:border-brand/40"
                }`}
              >
                {/* Soft border glow on hover */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    isAccent
                      ? "shadow-[0_0_30px_-6px_rgba(139,92,246,0.5)]"
                      : "shadow-[0_0_30px_-6px_rgba(62,207,94,0.45)]"
                  }`}
                />

                <Quote
                  className={`h-7 w-7 ${isAccent ? "text-accent-violet/70" : "text-brand/70"}`}
                  aria-hidden="true"
                />

                <div className="mt-4">
                  <StarRating delay={0.2 + i * 0.12} />
                </div>

                <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-foreground ring-1 ring-white/10"
                    style={{ background: t.gradient }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} <span className={isAccent ? "text-accent-violet" : "text-brand"}>@ {t.company}</span>
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
