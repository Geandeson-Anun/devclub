"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Camera,
  Play,
  AtSign,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useVideoInView } from "@/hooks/use-video-in-view";
import Image from "next/image"

const COMMUNITY_AVATARS = ["JS", "AL", "RC", "MP"];

const NAV_LINKS = [
  { label: "Como funciona", href: "#sobre" },
  { label: "DevClub", href: "#quem-somos" },
  { label: "Vantagens", href: "#salario" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#faq" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Camera },
  { label: "YouTube", href: "#", Icon: Play },
  { label: "LinkedIn", href: "#", Icon: AtSign },
  { label: "Twitter", href: "#", Icon: MessageCircle },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoInView(videoRef);

  return (
    <footer className="relative">
      {/* Final CTA block */}
      <section
        id="matricula"
        className="relative overflow-hidden bg-[#0D0F14] px-6 py-24 sm:py-32"
      >
        {/* Background video — lazy-loaded (below the fold), CTA block only */}
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
          <source src="/videos/v-one.mp4" type="video/mp4" />
        </video>

        {/* Overlay for text legibility over the video */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(13,15,20,0.92) 0%, rgba(13,15,20,0.5) 55%, rgba(13,15,20,0.8) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Stronger green radial glow — most important conversion point */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(62,207,94,0.4), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Comece agora sua jornada em tecnologia
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Aprenda com uma metodologia prática e conectada às oportunidades
            reais do mercado.
          </p>

          <motion.a
            href="https://api.whatsapp.com/send/?phone=5516990482444&text=quero%20me%20matricular&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 24px rgba(62,207,94,0.45)",
                "0 0 44px rgba(62,207,94,0.75)",
                "0 0 24px rgba(62,207,94,0.45)",
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-brand-foreground"
          >
            Matricule-se agora
            <ArrowRight className="h-5 w-5" />
          </motion.a>

          {/* Community indicator */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {COMMUNITY_AVATARS.map((initials, i) => (
                <motion.div
                  key={initials}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    duration: 0.4,
                    ease: "backOut",
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0D0F14] text-xs font-medium text-foreground"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(62,207,94,0.4), rgba(139,92,246,0.4))",
                  }}
                >
                  {initials}
                </motion.div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                +10 mil alunos
              </span>{" "}
              <span style={{ textShadow: "0 1px 8px rgba(0,0,0,0.85)" }}>
                em todo o Brasil
              </span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer proper — darkest tone marks the end of the page */}
      <div className="bg-[#050506] px-6 pt-16 pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-3 lg:gap-16">
            {/* Column 1 — brand */}
            <div>
              <a href="#topo" className="inline-flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="DevClub"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-lg"
                />
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  DevClub
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Profissional de elite de programação.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2 — navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Navegação
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — newsletter */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Acompanhe
              </h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  aria-label="Seu melhor e-mail"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(62,207,94,0.5)]"
                >
                  Enviar
                </button>
              </form>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
                Ao se cadastrar você concorda com nossa Política de Privacidade.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 border-t border-white/[0.08] pt-6">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Dev Club &reg; 2026 &bull; Todos os direitos reservados
              </p>
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-brand"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
