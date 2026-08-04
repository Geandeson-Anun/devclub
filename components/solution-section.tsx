"use client"

import { motion, type Variants } from "framer-motion"
import { Award, Briefcase, GraduationCap, Layers, BrainCircuit, Building2 } from "lucide-react"

const BADGES = [
  {
    icon: Award,
    title: "Certificações internacionais",
    tag: "Conectado ao mercado",
    copy: "Conteúdo alinhado às demandas reais de empresas que contratam profissionais de tech.",
  },
  {
    icon: Briefcase,
    title: "Cargos estratégicos",
    tag: null,
    copy: "Formação voltada para quem busca liderança e diferenciação profissional.",
  },
  {
    icon: GraduationCap,
    title: "Reconhecido pelo MEC",
    tag: null,
    copy: "Pós-graduação credenciada, com validade nacional e padrão acadêmico de excelência.",
  },
]

const CARDS = [
  {
    icon: Layers,
    accent: "green" as const,
    title: "Formação completa do básico ao avançado",
    copy: "Trilhas organizadas para quem está começando e para quem já atua na área, com formações em Front-end, Back-end e Full Stack, sempre alinhadas às tecnologias mais demandadas pelas empresas.",
    companies: null,
  },
  {
    icon: BrainCircuit,
    accent: "violet" as const,
    title: "MBA em Inteligência Artificial reconhecido pelo MEC",
    copy: "Aprofunde-se em IA com uma pós-graduação completa, certificações internacionais e foco em estratégia, inovação e aplicação prática no mercado de trabalho.",
    companies: null,
  },
  {
    icon: Building2,
    accent: "green" as const,
    title: "Conexão real com o mercado e contratações",
    copy: "O DevClub prepara você para vagas reais. São milhares de alunos empregados, empresas parceiras e um ensino focado no que o mercado realmente exige.",
    companies: ["Nubank", "Domestika", "CVC", "iFood", "Mercado Livre"],
  },
]

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function SolutionSection() {
  return (
    <section id="solucao" className="relative overflow-hidden bg-[#0D0F14] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-mono text-sm text-brand">solução completa_</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Uma jornada completa para sua carreira em tecnologia
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Tudo o que você precisa para evoluir, se especializar e se destacar no mercado, em um único lugar.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground/80">
            O DevClub foi criado para eliminar a necessidade de cursos isolados e caminhos desconectados. Aqui, você
            encontra uma jornada contínua de aprendizado, desde os primeiros fundamentos até a consolidação
            profissional.
          </p>
        </motion.div>

        {/* Badges strip */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.title}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-surface/60 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <badge.icon className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{badge.title}</span>
                  {badge.tag && <span className="text-xs font-medium text-brand">{badge.tag}</span>}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{badge.copy}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed cards grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const isViolet = card.accent === "violet"
            return (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative flex flex-col rounded-2xl border bg-surface/50 p-7 transition-colors duration-300 ${
                  isViolet
                    ? "border-accent-violet/25 hover:border-accent-violet/60"
                    : "border-white/[0.08] hover:border-brand/50"
                }`}
              >
                {/* Border glow on hover */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    isViolet
                      ? "shadow-[0_0_36px_-8px_rgba(139,92,246,0.55)]"
                      : "shadow-[0_0_36px_-8px_rgba(62,207,94,0.45)]"
                  }`}
                  aria-hidden="true"
                />

                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isViolet ? "bg-accent-violet/15 text-accent-violet" : "bg-brand/10 text-brand"
                  }`}
                >
                  <card.icon className="h-6 w-6" />
                </span>

                <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{card.copy}</p>

                {card.companies && (
                  <div className="mt-6 border-t border-white/[0.06] pt-5">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      Alunos contratados por
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {card.companies.map((company) => (
                        <span
                          key={company}
                          className="text-sm font-semibold text-muted-foreground/80 transition-colors duration-200 hover:text-foreground"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
