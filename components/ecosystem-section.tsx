"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Video, BrainCircuit, Sparkles } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function EcosystemSection() {
  return (
    <section
      id="ecossistema"
      className="relative overflow-hidden bg-[#08090C] py-24 sm:py-32"
    >
      {/* Purple ambient glow */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/3 h-[460px] w-[560px] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-sm text-accent-violet">
            em constante evolução_
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            O ecossistema DevClub está crescendo
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Não paramos na formação. Estamos construindo uma plataforma completa
            para acompanhar você do primeiro código à liderança técnica.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2"
        >
          {/* Large highlight card */}
          <motion.article
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md lg:col-span-2 lg:row-span-2 sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-brand/40 transition-opacity duration-300 group-hover:opacity-100" />
            <div>
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Nova Plataforma de Estudos
              </h3>
              <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Uma experiência de aprendizado completamente redesenhada, mais
                rápida, intuitiva e conectada ao seu progresso real.
              </p>
            </div>

            {/* Abstract dashboard mockup (pure CSS) */}
            <DashboardMockup />
          </motion.article>

          {/* Medium card — Live mentoring */}
          <motion.article
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-brand/40 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Video className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Ambiente de Mentorias ao Vivo
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Um hub dedicado para sessões de mentoria em tempo real, tirando
              dúvidas direto com quem já vive o mercado.
            </p>
            <LiveIndicator />
          </motion.article>

          {/* Medium card — MBA in AI (violet accent) */}
          <motion.article
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-accent-violet/25 bg-surface/60 p-6 backdrop-blur-md"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-accent-violet/50 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Plataforma do MBA em IA
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Um ambiente exclusivo para quem busca se aprofundar em
              Inteligência Artificial, com trilha própria e certificação
              reconhecida pelo MEC.
            </p>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-violet/30 bg-accent-violet/10 px-3 py-1 text-xs font-medium text-accent-violet-soft">
              <Sparkles className="h-3 w-3" />
              Reconhecido pelo MEC
            </span>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

/* Abstract "study platform" interface built entirely from divs */
function DashboardMockup() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch((err) => console.log("autoplay bloqueado:", err))
  }, [])

  return (
    <div className="mt-8 flex flex-1 flex-col justify-between rounded-xl border border-white/[0.06] bg-[#0a0b0f] p-4">
      {/* Top bar */}
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          <div className="ml-2 h-2 w-24 rounded-full bg-white/10" />
        </div>

        {/* Vídeo real dentro da "tela" */}
        <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-lg border border-white/[0.06]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0.85) saturate(1.15)" }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/videos/v-ecosystem.mp4" type="video/mp4" />
          </video>

          {/* Selo "continuando de onde parou" sobre o vídeo */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="text-[10px] font-medium uppercase tracking-wide text-brand">continuando de onde parou</span>
            <p className="text-[11px] font-medium leading-tight text-white/90">
              Módulo 4 — Consumindo APIs REST com autenticação
            </p>
          </div>
        </div>
      </div>

      {/* Faixa de estatísticas — mantém igual */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
        className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4"
      >
        {[
          { label: "sequência", value: "12 dias" },
          { label: "xp total", value: "2.480" },
          { label: "ranking turma", value: "Top 8%" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5 text-center">
            <span className="text-sm font-semibold text-foreground">{stat.value}</span>
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* "Ao vivo" pulsing indicator for the mentoring card */
function LiveIndicator() {
  return (
    <div className="mt-auto flex items-center gap-2 pt-6">
      <span className="relative flex h-2.5 w-2.5">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-brand"
          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
      </span>
      <span className="font-mono text-xs text-muted-foreground">
        ao vivo agora
      </span>
    </div>
  );
}
