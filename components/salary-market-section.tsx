"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate, type Variants } from "framer-motion"
import { TrendingUp, Globe2, DollarSign } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const SALARY_TIERS = [
  {
    level: "Júnior",
    from: 4,
    to: 6,
    suffix: "k",
    prefix: "R$ ",
    featured: false,
  },
  {
    level: "Pleno",
    from: 8,
    to: 12,
    suffix: "k",
    prefix: "R$ ",
    featured: false,
  },
  {
    level: "Sênior",
    from: 12,
    to: null,
    suffix: "k",
    prefix: "+ R$ ",
    featured: true,
  },
] as const

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Mercado Aquecido",
    copy: "A área de Desenvolvimento oferece excelentes oportunidades de emprego e salários altos.",
    accent: "green",
  },
  {
    icon: Globe2,
    title: "Trabalhe onde quiser",
    copy: "Abra as portas da liberdade e trabalhe de onde quiser com o desenvolvimento.",
    accent: "violet",
  },
  {
    icon: DollarSign,
    title: "Ganhe em moeda estrangeira",
    copy: "Aproveite as oportunidades globais, conquiste projetos internacionais e aumente sua renda.",
    accent: "green",
  },
] as const

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export function SalaryMarketSection() {
  return (
    <section id="salario" className="relative overflow-hidden bg-[#0D0F14] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-sm text-brand">salário_</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Essa é a média salarial de um programador no Brasil
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            A área de Desenvolvimento oferece excelentes oportunidades de emprego e salários altos.
          </p>
        </motion.div>

        {/* Salary tiers */}
        <div className="mt-14 grid items-center gap-6 sm:grid-cols-3">
          {SALARY_TIERS.map((tier, i) => (
            <motion.div
              key={tier.level}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12 }}
              className="group relative"
            >
              {/* Pulsing glow behind featured card */}
              {tier.featured && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-3xl bg-brand/25 blur-2xl"
                  animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              )}

              <div
                className={`relative flex flex-col items-center rounded-2xl border bg-surface/60 px-6 text-center backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02] ${
                  tier.featured
                    ? "border-brand/50 py-12 shadow-[0_0_40px_-8px_rgba(62,207,94,0.5)] group-hover:border-brand group-hover:shadow-[0_0_56px_-6px_rgba(62,207,94,0.7)] sm:-my-2"
                    : "border-white/10 py-10 group-hover:border-brand/40"
                }`}
              >
                <span
                  className={`text-sm font-medium uppercase tracking-wider ${
                    tier.featured ? "text-brand" : "text-muted-foreground"
                  }`}
                >
                  {tier.level}
                </span>
                <div
                  className={`mt-4 font-semibold tracking-tight text-foreground ${
                    tier.featured ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  {tier.to === null ? (
                    <>
                      {tier.prefix}
                      <CountUp to={tier.from} suffix={tier.suffix} />
                      <span className="text-muted-foreground"> até </span>
                      <span className="text-brand">∞</span>
                    </>
                  ) : (
                    <>
                      {tier.prefix}
                      <CountUp to={tier.from} suffix={tier.suffix} />
                      <span className="text-muted-foreground"> – R$ </span>
                      <CountUp to={tier.to} suffix={tier.suffix} />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Source note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground/70"
        >
          Fonte: Glassdoor e LinkedIn. *Estes são valores aproximados que podem variar de empresa para empresa e também
          de acordo com o estado.
        </motion.p>

        {/* Benefits grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon
            const isViolet = benefit.accent === "violet"
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className={`group rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                  isViolet ? "hover:border-accent-violet/50" : "hover:border-brand/50"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isViolet ? "bg-accent-violet/15 text-accent-violet" : "bg-brand/15 text-brand"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.copy}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
