"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate, type Variants } from "framer-motion"
import { Code2, Layout, Server, Smartphone, GraduationCap, Star, BrainCircuit  } from "lucide-react"

type Course = {
  icon: typeof Code2
  title: string
  description: string
  accent: "green" | "violet"
}

const COURSES: Course[] = [
  {
    icon: Code2,
    title: "Formação Fullstack JavaScript",
    description:
      "Domine o desenvolvimento web completo com JavaScript. Aprenda desde o front-end com React até o back-end com Node.js, incluindo bancos de dados e deploy.",
    accent: "green",
  },
  {
    icon: GraduationCap,
    title: "MBA e Pós-Graduação em Tecnologia",
    description: "Aprofunde seus conhecimentos com a pós-graduação em desenvolvimento FullStack.",
    accent: "violet",
  },
  {
    icon: Layout,
    title: "Formação Front-end",
    description:
      "Especialize-se em desenvolvimento front-end moderno com React. Crie interfaces incríveis e aplicações web performáticas.",
    accent: "green",
  },
  {
    icon: Server,
    title: "Formação Back-end",
    description:
      "Torne-se um especialista em desenvolvimento back-end com Node.js. Construa APIs robustas e escaláveis.",
    accent: "green",
  },
   {
    icon: BrainCircuit,
    title: "Formação em Inteligência Artificial",
    description:
      "Aprenda a construir e integrar soluções com IA generativa, LLMs e automações inteligentes aplicadas a produtos reais.",
    accent: "violet",
  },
  {
    icon: Smartphone,
    title: "Formação Mobile",
    description: "Desenvolva aplicativos móveis nativos para iOS e Android usando React Native.",
    accent: "green",
  },
   
  
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  )
}

function RatingStars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div ref={ref} className="flex items-center gap-1.5">
      <span className="text-3xl font-bold text-foreground sm:text-4xl">4.9</span>
      <div className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.3, ease: "backOut" }}
          >
            <Star className="h-4 w-4 fill-brand text-brand" />
          </motion.span>
        ))}
      </div>
    </div>
  )
}

const STATS = [
  {
    label: "aulas",
    value: <CountUp to={1000} prefix="+" />,
    copy: "Conteúdos objetivos e organizados, do nível iniciante ao avançado, com foco total na prática.",
  },
  {
    label: "de conteúdo",
    value: <CountUp to={1100} prefix="+" suffix="h" />,
    copy: "Uma jornada completa de aprendizado, cobrindo fundamentos, especializações e tecnologias atuais.",
  },
  {
    label: "projetos",
    value: <CountUp to={100} prefix="+" />,
    copy: "Projetos reais para aplicar o conhecimento, ganhar experiência e construir um portfólio profissional.",
  },
]

export function CoursesSection() {
  return (
    <section id="formacoes" className="relative overflow-hidden bg-background px-6 py-24">
      {/* Ambient glow behind the grid */}
      <div
        className="pointer-events-none absolute left-1/2 top-40 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(62,207,94,0.3), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-sm text-brand">Do zero ao avançado_</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Conheça nossas formações em programação
          </h2>
        </motion.div>

        {/* Courses grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => {
            const isViolet = course.accent === "violet"
            const Icon = course.icon
            return (
              <motion.div
                key={course.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative flex flex-col rounded-2xl border bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 ${
                  isViolet
                    ? "border-accent-violet/30 hover:border-accent-violet hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.5)]"
                    : "border-border hover:border-brand/60 hover:shadow-[0_0_30px_-8px_rgba(62,207,94,0.45)]"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                    isViolet
                      ? "bg-accent-violet/10 text-accent-violet ring-accent-violet/20"
                      : "bg-brand/10 text-brand ring-brand/20"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{course.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{course.description}</p>
                {isViolet && (
                  <span className="mt-4 inline-flex w-fit items-center rounded-full bg-accent-violet/15 px-3 py-1 text-xs font-medium text-accent-violet">
                    Próximo nível
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Stats band */}
        <div className="mt-16 grid gap-8 rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <RatingStars />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Nota 4.9 de 5.</span> Avaliação média baseada na experiência
              real de milhares de alunos que passaram pelas formações.
            </p>
          </motion.div>

          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <p className="text-3xl font-bold text-brand sm:text-4xl">{stat.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">{stat.label}.</span> {stat.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
