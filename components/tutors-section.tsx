"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Headset, Briefcase, Code2, HeartPulse, TrendingUp, Bot } from "lucide-react"

type Accent = "brand" | "violet"

type Tutor = {
  name: string
  initials: string
  image: string
  role: string
  description: string
  icon: typeof Headset
  accent: Accent
  gradient: string
}

const TUTORS: Tutor[] = [
  {
    name: "Andrey",
    initials: "AN",
    image: "/images/andrey.png",
    role: "Acompanhamento e Suporte",
    description: "Garante que você nunca fique travado: suporte contínuo em cada dúvida da sua jornada.",
    icon: Headset,
    accent: "brand",
    gradient: "linear-gradient(135deg, rgba(62,207,94,0.45), rgba(74,222,128,0.35))",
  },
  {
    name: "Fernanda",
    initials: "FE",
    image: "/images/fernanda.png",
    role: "Recrutamento & LinkedIn",
    description:
      "Especialista em recrutamento, ensina a criar o currículo e o LinkedIn que chamam atenção das empresas.",
    icon: Briefcase,
    accent: "violet",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.45), rgba(167,139,250,0.35))",
  },
  {
    name: "Ronald",
    initials: "RO",
    image: "/images/ronald.png",
    role: "Desenvolvimento de SaaS",
    description: "Ensina como sair do projeto de portfólio para construir produtos SaaS reais.",
    icon: Code2,
    accent: "brand",
    gradient: "linear-gradient(135deg, rgba(62,207,94,0.4), rgba(139,92,246,0.35))",
  },
  {
    name: "Márcio",
    initials: "MA",
    image: "/images/marcio.png",
    role: "Mentalidade & Terapia",
    description: "Trabalha a mentalidade do aluno, ajudando a vencer bloqueios e manter a consistência nos estudos.",
    icon: HeartPulse,
    accent: "violet",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.45), rgba(62,207,94,0.3))",
  },
  {
    name: "Adriano",
    initials: "AD",
    image: "/images/adriano.png",
    role: "Vendas de Sites & Freelas",
    description: "Ensina técnicas de vendas para quem quer faturar com sites, serviços e projetos freelance.",
    icon: TrendingUp,
    accent: "brand",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.45), rgba(62,207,94,0.35))",
  },
  {
    name: "Gabriel",
    initials: "GA",
    image: "/images/gabriel.png",
    role: "Agentes de IA",
    description:
      "Especialista em desenvolvimento de agentes de IA, preparando você para a próxima fronteira da programação.",
    icon: Bot,
    accent: "violet",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(167,139,250,0.35))",
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function TutorsSection() {
  return (
    <section id="tutores" className="relative bg-[#0D0F14] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-sm text-brand">nossos mentores_</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Conheça quem vai te acompanhar de perto
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Além de aprender a programar, você tem suporte completo em cada etapa da sua jornada — do código à carreira.
          </p>
        </motion.div>

        {/* Tutors grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TUTORS.map((tutor) => {
            const Icon = tutor.icon
            const isViolet = tutor.accent === "violet"
            return (
              <motion.article
                key={tutor.name}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative flex flex-col items-center rounded-2xl border border-white/[0.06] bg-surface/60 p-8 text-center backdrop-blur-md transition-shadow duration-300 ${
                  isViolet
                    ? "hover:border-accent-violet/50 hover:shadow-[0_12px_40px_-12px_rgba(139,92,246,0.5)]"
                    : "hover:border-brand/50 hover:shadow-[0_12px_40px_-12px_rgba(62,207,94,0.5)]"
                }`}
              >
                {/* Avatar photo + icon badge */}
                <div className="relative">
                  <div
                    className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/10 transition-[filter,transform] duration-300 group-hover:brightness-125"
                    style={{ background: tutor.gradient }}
                  >
                    <Image
                      src={tutor.image}
                      alt={tutor.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0D0F14] ${
                      isViolet ? "bg-accent-violet/20 text-accent-violet" : "bg-brand/20 text-brand"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-foreground">{tutor.name}</h3>
                <p className={`mt-1 text-sm font-medium ${isViolet ? "text-accent-violet" : "text-brand"}`}>
                  {tutor.role}
                </p>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{tutor.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
