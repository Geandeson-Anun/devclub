"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const NAV_ITEMS = [
  { id: "sobre", label: "Sobre" },
  { id: "formacoes", label: "Formações" },
  { id: "tutores", label: "Tutores" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "faq", label: "FAQ" },
] as const

function Wordmark() {
  return (
    <a
        href="#topo"
      className="flex items-center gap-2 text-lg font-semibold tracking-tight"
      aria-label="DevClub — página inicial"
    >
      <Image
        src="/images/logo.png"
        alt="DevClub"
        width={32}
        height={32}
        className="h-8 w-8 rounded-lg"
        priority
      />
      <span className="text-foreground">
        Dev<span className="text-brand">Club</span>
      </span>
    </a>
  )
}

function NavLink({
  id,
  label,
  active,
  onClick,
}: {
  id: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className={`group relative py-1 text-sm font-medium transition-colors duration-300 ${
        active ? "text-brand" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-brand transition-all duration-300 ease-out ${
          active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
        aria-hidden="true"
      />
    </a>
  )
}

export function Header({
  revealed,
  onRevealComplete,
}: {
  revealed: boolean
  onRevealComplete?: () => void
}) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [flash, setFlash] = useState(false)

  // Interpolação gradual do estado "vidro fosco" conforme a posição do scroll.
  // 0px (topo) -> quase transparente | 120px -> glassmorphism completo.
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 120], [0.2, 0.6])
  const blur = useTransform(scrollY, [0, 120], [4, 12])
  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 0.35])
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.08])

  const backgroundColor = useMotionTemplate`rgba(8, 9, 12, ${bgOpacity})`
  const backdropFilter = useMotionTemplate`blur(${blur}px)`
  const boxShadow = useMotionTemplate`0 8px 30px rgba(0, 0, 0, ${shadowOpacity})`
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: "-100%" }}
      animate={{ y: revealed ? "0%" : "-100%" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        // Dispara o brilho só quando o header termina de descer (não ao sumir).
        if (revealed) setFlash(true)
      }}
    >
      <motion.div
        style={{
          backgroundColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow,
          borderColor,
        }}
        className="relative w-full overflow-hidden border-b"
      >
        {/* Piscada de luz: uma faixa de brilho que varre o header uma única vez */}
        <AnimatePresence>
          {flash && (
            <motion.div
              key="header-flash"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 skew-x-[-20deg]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 45%, rgba(62,207,94,0.35) 55%, transparent)",
              }}
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "260%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              onAnimationComplete={() => {
                setFlash(false)
                onRevealComplete?.()
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Wordmark />

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.id} id={item.id} label={item.label} active={activeSection === item.id} />
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#login"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/90 transition-colors duration-300 hover:border-brand/40 hover:bg-white/5 hover:text-foreground"
            >
              Login
            </a>
            <motion.a
              href="#matricula"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-[0_0_0_rgba(62,207,94,0)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(62,207,94,0.55)]"
            >
              Matricule-se
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-white/5 md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-3 top-[4.5rem] z-50 rounded-2xl border border-border bg-surface/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-brand/10 text-brand"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                <a
                  href="#login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-white/5"
                >
                  Login
                </a>
                <a
                  href="#matricula"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-brand-foreground transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(62,207,94,0.55)]"
                >
                  Matricule-se
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
