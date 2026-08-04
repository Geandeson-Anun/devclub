"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Rocket, GraduationCap, BrainCircuit, Users, Briefcase, Star, Heart } from "lucide-react"

type Metric = {
  value: number
  suffix: string
  prefix: string
  decimals: number
  label: string
  icon: React.ElementType
}

const metrics: Metric[] = [
  { value: 10, suffix: "k+", prefix: "", decimals: 0, label: "Alunos formados", icon: Users },
  { value: 95, suffix: "%", prefix: "", decimals: 0, label: "Empregabilidade", icon: Briefcase },
  { value: 4.9, suffix: "/5", prefix: "", decimals: 1, label: "Avaliação", icon: Star },
  { value: 15, suffix: "k", prefix: "+", decimals: 0, label: "Vidas transformadas", icon: Heart },
]

const profiles = [
  {
    icon: Rocket,
    accent: "brand" as const,
    title: "Para quem quer começar do zero",
    description:
      "Aprenda programação do jeito certo, mesmo sem nenhuma experiência prévia. Você começa pelos fundamentos e evolui passo a passo até estar pronto para o mercado.",
  },
  {
    icon: GraduationCap,
    accent: "violet" as const,
    title: "Para quem quer se especializar",
    description:
      "Aprofunde seus conhecimentos com formações completas em Front-end, Back-end, Full Stack e Mobile, usando as tecnologias mais exigidas pelas empresas.",
  },
  {
    icon: BrainCircuit,
    accent: "brand" as const,
    title: "Para quem quer evoluir com IA",
    description:
      "Tenha acesso ao MBA em Inteligência Artificial, com certificações internacionais e reconhecimento pelo MEC, ideal para quem busca diferenciação e crescimento profissional.",
  },
]

function CountUp({ value, decimals }: { value: number; decimals: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-80px" })

  useEffect(() => {
    const node = nodeRef.current
    if (!node || !inView) return

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = latest.toLocaleString("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      },
    })

    return () => controls.stop()
  }, [inView, value, decimals])

  return <span ref={nodeRef}>{(0).toLocaleString("pt-BR", { minimumFractionDigits: decimals })}</span>
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const Icon = metric.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface/50 px-4 py-6 text-center backdrop-blur-sm sm:px-6"
    >
      <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
      <div className="flex items-baseline font-semibold tracking-tight text-foreground">
        <span className="text-3xl sm:text-4xl">{metric.prefix}</span>
        <span className="text-3xl sm:text-4xl">
          <CountUp value={metric.value} decimals={metric.decimals} />
        </span>
        <span className="text-3xl sm:text-4xl">{metric.suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground">{metric.label}</p>
      {/* Subtle progress indicator */}
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="h-full rounded-full bg-gradient-to-r from-brand to-chart-2"
        />
      </div>
    </motion.div>
  )
}

export function AudienceSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" })

  return (
    <section id="sobre" className="relative overflow-hidden bg-background px-6 py-24 sm:py-32">
      {/* Ambient radial glow behind the metrics */}
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[760px] -translate-x-1/2 rounded-full opacity-[0.13] blur-[120px]"
        style={{ background: "radial-gradient(circle, #3ECF5E, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full opacity-[0.1] blur-[120px]"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Para quem é o DevClub?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Independente do seu nível atual, o DevClub foi criado para quem quer entrar, crescer ou se
            consolidar no mercado de tecnologia
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Profile cards */}
        <div ref={gridRef} className="mt-8 grid gap-6 md:grid-cols-3">
          {profiles.map((profile, i) => {
            const Icon = profile.icon
            const isViolet = profile.accent === "violet"
            return (
              <motion.article
                key={profile.title}
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className={`group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm transition-colors duration-300 ${
                  isViolet ? "hover:border-accent-violet/50" : "hover:border-brand/50"
                }`}
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-shadow duration-300 ${
                    isViolet
                      ? "border-accent-violet/30 bg-accent-violet/10 text-accent-violet group-hover:shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                      : "border-brand/30 bg-brand/10 text-brand group-hover:shadow-[0_0_24px_rgba(62,207,94,0.35)]"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{profile.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {profile.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
