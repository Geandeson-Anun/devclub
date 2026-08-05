"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Code2, Briefcase, Rocket, User } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const PILLARS = [
  {
    icon: Code2,
    title: "Metodologia prática e aplicada",
    copy: "Aprenda fazendo. São centenas de projetos reais, desafios práticos e aplicações usadas no dia a dia de empresas de tecnologia.",
    accent: "brand" as const,
  },
  {
    icon: Briefcase,
    title: "Formações focadas no mercado",
    copy: "Trilhas completas em Front-end, Back-end, Full Stack e Mobile, construídas com base nas tecnologias mais exigidas pelas empresas.",
    accent: "violet" as const,
  },
  {
    icon: Rocket,
    title: "Acompanhamento que gera resultado",
    copy: "Suporte vitalício, mentorias ao vivo, comunidade ativa e certificado reconhecido para acelerar sua evolução profissional.",
    accent: "brand" as const,
  },
]

const COMMUNITY_AVATARS = ["AS", "CO", "MS"]

export function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch((err) => console.log("autoplay bloqueado:", err))
  }, [])

  return (
    <section id="quem-somos" className="relative overflow-hidden bg-[#0D0F14] px-6 py-24 sm:py-32">
      {/* Background video — mirrored horizontally, lazy-loaded (below the fold) */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full -scale-x-100 object-cover"
        style={{ filter: "brightness(0.6) saturate(0.9)" }}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/videos/v-four.mp4" type="video/mp4" />
      </video>

      {/* Overlay for text legibility over the video */}
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" />

      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Intro block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-3xl"
        >
          <span className="font-mono text-sm text-muted-foreground">apresentação_</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">DevClub</h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            O DevClub é uma escola de tecnologia focada em formar programadores prontos para o mercado — do zero ao
            nível profissional. Aqui, o aprendizado é direto ao ponto, com uma metodologia prática desenvolvida para
            garantir domínio técnico, experiência real em projetos e preparo para conquistar as melhores oportunidades
            em tecnologia.
          </p>
        </motion.div>

        {/* Founder highlight */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10 lg:gap-14"
        >
          {/* Big founder card with gradient border + diffuse glow */}
          <div className="mx-auto sm:mx-0">
            <div
              className="relative rounded-3xl p-[2px] shadow-[0_0_60px_-12px_rgba(62,207,94,0.45)]"
              style={{ background: "linear-gradient(135deg, #3ECF5E, #8B5CF6)" }}
            >
            <div className="relative aspect-[4/5] w-[180px] overflow-hidden rounded-[calc(1.5rem-2px)] sm:w-[210px]">
              <Image
                src="/images/rodolfo.jpg"
                alt="Rodolfo Mori, fundador do DevClub"
                fill
                sizes="(min-width: 640px) 210px, 180px"
                className="object-cover object-top"
              />
            </div>
            </div>
          </div>

          {/* Founder details + community indicator */}
          <div>
            <p className="text-2xl font-semibold text-foreground sm:text-3xl">Rodolfo Mori</p>
            <p className="mt-1 text-base text-brand">Fundador do DevClub</p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Desenvolvedor e educador, Rodolfo criou o DevClub com uma missão clara: tornar o ensino de programação
              acessível, prático e conectado ao que o mercado realmente exige. Hoje, lidera uma das maiores comunidades
              de tecnologia do Brasil.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {COMMUNITY_AVATARS.map((initials, i) => (
                  <motion.div
                    key={initials}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: "backOut" }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0D0F14] bg-secondary text-xs font-medium text-muted-foreground"
                  >
                    {initials}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + COMMUNITY_AVATARS.length * 0.15, duration: 0.4, ease: "backOut" }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0D0F14] bg-brand/20 text-brand"
                >
                  <User className="h-4 w-4" />
                </motion.div>
              </div>
              <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">+25 mil alunos e alunas</span> no Brasil e no mundo.
                Junte-se a eles.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            const isViolet = pillar.accent === "violet"
            return (
              <motion.article
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`group relative rounded-2xl border border-white/[0.06] bg-surface/60 p-6 backdrop-blur-md transition-colors ${
                  isViolet ? "hover:border-accent-violet/40" : "hover:border-brand/40"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isViolet ? "bg-accent-violet/15 text-accent-violet" : "bg-brand/15 text-brand"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
