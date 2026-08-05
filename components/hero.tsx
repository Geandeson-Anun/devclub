"use client"

import type React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, type Transition } from "framer-motion"
import { Star } from "lucide-react"
import { useVideoInView } from "@/hooks/use-video-in-view"

// ---- código digitado, token a token (cor por tipo) ----
type Token = { text: string; className?: string }
const codeLines: Token[][] = [
  [
    { text: "const" }, { text: " dev = " }, { text: '"você"', className: "text-brand" }, { text: ";" },
  ],
  [
    { text: "function" }, { text: " construir(ideia) {" },
  ],
  [
    { text: "  return" }, { text: " codigo + café;" },
  ],
  [{ text: "}" }],
  [{ text: "// entregar antes do prazo", className: "text-muted-foreground" }],
  [{ text: "deploy" }, { text: "(dev);" }],
]

// ---- teclado: números, letras e símbolos reais, 3 fileiras ----
const keyRows = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "\\"],
]

// ---- logo do DevClub em grid de blocos 7x7 ----
const LOGO_SIZE = 7
const logoFilled = new Set([
  "1-1", "1-2", "1-3", "1-6", "1-7",
  "2-1", "2-3", "2-5", "2-7",
  "3-1", "3-2", "3-3", "3-5", "3-6", "3-7",
  "4-4",
  "5-1", "5-2", "5-3", "5-5", "5-6", "5-7",
  "6-1", "6-3", "6-5", "6-7",
  "7-1", "7-2", "7-3", "7-6", "7-7",
])
const logoCells = Array.from({ length: LOGO_SIZE * LOGO_SIZE }, (_, i) => {
  const r = Math.floor(i / LOGO_SIZE) + 1
  const c = (i % LOGO_SIZE) + 1
  return logoFilled.has(`${r}-${c}`)
})

function useTypewriter(active: boolean) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [lineDone, setLineDone] = useState(false)

  useEffect(() => {
    if (!active) return
    let mounted = true
    async function run() {
      while (mounted) {
        for (let li = 0; li < codeLines.length; li++) {
          const flat = codeLines[li].map((t) => t.text).join("")
          for (let cc = 0; cc <= flat.length; cc++) {
            if (!mounted) return
            setLineIndex(li)
            setCharCount(cc)
            setLineDone(false)
            await new Promise((r) => setTimeout(r, 14))
          }
          setLineDone(true)
          await new Promise((r) => setTimeout(r, 160))
        }
        await new Promise((r) => setTimeout(r, 900))
        if (!mounted) return
        setLineIndex(0)
        setCharCount(0)
        setLineDone(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [active])

  return { lineIndex, charCount, lineDone }
}

// Revela um texto progressivamente, caractere por caractere, uma única vez
// (não é um loop) — usado para o efeito de "sendo escrito" da headline,
// subtítulo e descrição do Hero.
function useTypedReveal(text: string, active: boolean, speed = 32) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || !text) return
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => clearInterval(id)
  }, [active, text, speed])

  return { displayed: text.slice(0, count), done: count >= text.length }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    // Deve acompanhar o breakpoint em que o grid do Hero vira 2 colunas
    // (xl, 1280px) — abaixo disso o layout é empilhado/centralizado
    // (inclui tablets como iPad, que não têm espaço para 2 colunas).
    const mq = window.matchMedia("(max-width: 1279px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isMobile
}

type Phase = "closed" | "opening" | "open" | "shrinking" | "positioned" | "orbiting"

type Offset = { x: number; y: number }

function NotebookMockup({
  entryOffset = { x: 0, y: 0 },
  onSettled,
}: {
  entryOffset?: Offset
  onSettled?: () => void
}) {
  const [phase, setPhase] = useState<Phase>("closed")
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const typingActive = phase !== "closed" && phase !== "opening"
  const { lineIndex, charCount, lineDone } = useTypewriter(typingActive)

  const py = useMotionValue(0)
  const rotateXHover = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() {
    setHovered(false)
    py.set(0)
  }

  useEffect(() => {
    const t = setTimeout(() => setPhase("opening"), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== "open") return
    const t = setTimeout(() => setPhase("shrinking"), 2200)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== "positioned") return
    const t = setTimeout(() => setPhase("orbiting"), 400)
    return () => clearTimeout(t)
  }, [phase])

  // Fases em que o notebook deve aparecer grande, centralizado na tela,
  // cobrindo o título/headline/CTA — igual ao protótipo original.
  const isCovering = phase === "closed" || phase === "opening" || phase === "open"

  const entranceScale = isCovering ? (isMobile ? 1.9 : 2.6) : 1

  // Desloca o notebook do seu lugar final (coluna da grid) até o centro da
  // seção enquanto está "cobrindo", equivalente ao translate(220px,10px) do
  // @keyframes sway original — só que calculado dinamicamente (responsivo)
  // em vez de um valor fixo, já que aqui o layout é lado a lado com o texto.
  const entranceX = isCovering ? entryOffset.x : 0
  const entranceY = isCovering ? entryOffset.y : 0

  // Replica exatamente o @keyframes sway original: 0% / 25% / 75% / 100%
  // (sem stop artificial em 50%, que quebrava a curva de easing do CSS).
  const swayAnimate =
    phase === "orbiting" && !hovered
      ? { rotateY: [0, 46, -46, 0] }
      : { rotateY: 0 }

  const swayTransition: Transition =
    phase === "orbiting" && !hovered
      ? { duration: 9, times: [0, 0.25, 0.75, 1], ease: "easeInOut", repeat: Infinity }
      : { duration: 0.6, ease: "easeOut" }

  return (
    <div
      className={`relative mx-auto w-full max-w-[420px] [perspective:1400px] ${
        isCovering ? "z-40" : "z-20"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.8, 0.55],
          x: entranceX,
          y: entranceY,
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: phase === "shrinking" ? 2.4 : 1, ease: [0.16, 1, 0.3, 1] },
          y: { duration: phase === "shrinking" ? 2.4 : 1, ease: [0.16, 1, 0.3, 1] },
        }}
        aria-hidden="true"
      >
        <div
          className="h-[90%] w-[90%] rounded-[3rem] blur-[90px]"
          style={{
            background:
              "radial-gradient(circle at 35% 40%, rgba(62,207,94,0.55), transparent 60%), radial-gradient(circle at 70% 65%, rgba(139,92,246,0.45), transparent 60%)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: entranceScale, x: entranceX, y: entranceY }}
        animate={{ opacity: 1, scale: entranceScale, x: entranceX, y: entranceY }}
        transition={{ duration: phase === "shrinking" ? 2.4 : 1, ease: [0.16, 1, 0.3, 1] }}
        // ESSENCIAL: sem preserve-3d aqui, a perspective() do container pai
        // não chega até o rotateY do sway abaixo, e a rotação "achata" em vez
        // de girar com profundidade — era a causa da distorção.
        style={{ transformStyle: "preserve-3d" }}
        onAnimationComplete={() => {
          if (phase === "shrinking") {
            setPhase("positioned")
            onSettled?.()
          }
        }}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
          animate={swayAnimate}
          transition={swayTransition}
        >
          <motion.div
            ref={cardRef}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: rotateXHover, transformStyle: "preserve-3d" }}
          >
            <div
              className="relative mx-auto"
              style={{ width: 360, height: 230, transformStyle: "preserve-3d", transform: "rotateX(-24deg)" }}
            >
              <div
                className="absolute rounded-b-2xl"
                style={{
                  width: 360,
                  height: 236,
                  top: 230,
                  left: 0,
                  transformOrigin: "top center",
                  transform: "rotateX(90deg)",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(155deg,#1c1e24,#0c0d10)",
                  boxShadow: "0 40px 80px rgba(0,0,0,.55)",
                  padding: "16px 22px 26px",
                }}
              >
                {keyRows.map((row, ri) => (
                  <div key={ri} className="mb-[5px] grid grid-cols-12 gap-[5px]">
                    {row.map((ch, ci) => (
                      <span
                        key={ci}
                        className="flex h-4 items-center justify-center rounded-[3px] border border-white/5 bg-white/[0.045] font-mono text-[8px] font-semibold text-brand"
                        style={{
                          textShadow: "0 0 3px rgba(62,207,94,.9), 0 0 8px rgba(62,207,94,.55)",
                          animation: `keyGlow 3.2s ease-in-out ${((ri * 12 + ci) * 0.09) % 2.4}s infinite`,
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="mx-[60px] mb-3.5 h-3.5 rounded-[3px] border border-white/5 bg-white/[0.045]" />
                <div className="mx-auto mt-1.5 h-16 w-[118px] rounded-lg border border-white/[0.06] bg-white/[0.035]" />
                <div
                  className="mx-auto mt-2 grid"
                  style={{
                    gridTemplateColumns: `repeat(${LOGO_SIZE}, 3px)`,
                    gridTemplateRows: `repeat(${LOGO_SIZE}, 3px)`,
                    gap: "1px",
                    filter: "drop-shadow(0 0 4px rgba(62,207,94,.7))",
                  }}
                >
                  {logoCells.map((on, i) => (
                    <span key={i} className={on ? "block rounded-[0.5px] bg-brand" : "block"} />
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute"
                style={{
                  width: 360,
                  height: 230,
                  top: 0,
                  left: 0,
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                }}
                initial={{ rotateX: 90 }}
                animate={{ rotateX: phase === "closed" ? 90 : 18 }}
                transition={{ duration: 3.6, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => {
                  if (phase === "opening") setPhase("open")
                }}
              >
                <div
                  className="absolute inset-0 rounded-t-2xl rounded-b-sm"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "#050608",
                    border: "10px solid #111318",
                    boxShadow: "0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(62,207,94,.08)",
                  }}
                >
                  <div className="absolute inset-[2px] overflow-hidden rounded-[4px] bg-[#050608] p-3.5 font-mono text-[12.5px] leading-[1.55] text-brand">
                    {codeLines.slice(0, lineIndex).map((line, li) => (
                      <div key={li}>
                        {line.map((tok, ti) => (
                          <span key={ti} className={tok.className}>
                            {tok.text}
                          </span>
                        ))}
                      </div>
                    ))}
                    <div>
                      {lineDone
                        ? codeLines[lineIndex]?.map((tok, ti) => (
                            <span key={ti} className={tok.className}>
                              {tok.text}
                            </span>
                          ))
                        : codeLines[lineIndex]?.map((t) => t.text).join("").slice(0, charCount)}
                      <span className="ml-0.5 inline-block h-[13px] w-[6px] translate-y-[2px] animate-pulse bg-brand align-middle" />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-t-2xl rounded-b-sm"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(155deg,#15171c,#0a0b0e)",
                    boxShadow: "0 20px 60px rgba(0,0,0,.5)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes keyGlow {
          0%, 100% { opacity: .72; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const HEADLINE = "A Escola das Profissões do Futuro"
const SUBTITLE_PLAIN = "Transforme sua carreira com [programação] do zero ao avançado"
const DESCRIPTION =
  "Aprenda as tecnologias mais demandadas do mercado com metodologia prática, direto ao ponto e de forma simples."

// Um "|" piscando ao final do texto ainda em digitação.
function TypingCaret({ className = "" }: { className?: string }) {
  return (
    <span
      className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-brand align-middle ${className}`}
      aria-hidden="true"
    />
  )
}

// Etapas da sequência de revelação: cada uma só começa depois que a
// anterior termina — notebook assentado -> headline -> subtítulo ->
// descrição -> CTA nascendo pequeno e crescendo -> avisa o Header.
type RevealStage = "idle" | "headline" | "subtitle" | "description" | "cta" | "done"

export function Hero({ onSequenceComplete }: { onSequenceComplete?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const [entryOffset, setEntryOffset] = useState<Offset>({ x: 0, y: 0 })
  const [stage, setStage] = useState<RevealStage>("idle")

  const videoRef = useRef<HTMLVideoElement>(null)
  useVideoInView(videoRef)

  // Mede, em tempo real, a distância entre o centro da seção (a "tela") e o
  // centro do lugar final do notebook (coluna da direita) para que ele possa
  // nascer grande e centralizado, cobrindo o título/CTA, e depois encolher
  // suavemente até seu lugar ao lado do texto — recriando o efeito do
  // protótipo original (que usava um translate fixo, aqui calculado).
  useLayoutEffect(() => {
    function measure() {
      const sectionEl = sectionRef.current
      const slotEl = slotRef.current
      if (!sectionEl || !slotEl) return
      const sectionRect = sectionEl.getBoundingClientRect()
      const slotRect = slotEl.getBoundingClientRect()
      const sectionCenterX = sectionRect.left + sectionRect.width / 2
      const sectionCenterY = sectionRect.top + sectionRect.height / 2
      const slotCenterX = slotRect.left + slotRect.width / 2
      const slotCenterY = slotRect.top + slotRect.height / 2
      setEntryOffset({ x: sectionCenterX - slotCenterX, y: sectionCenterY - slotCenterY })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // O notebook avisa (via onSettled) quando termina de encolher e assentar
  // no seu lugar — só então a headline começa a ser "escrita".
  const handleNotebookSettled = () => {
    setStage((s) => (s === "idle" ? "headline" : s))
  }

  const headlineActive = stage !== "idle"
  const subtitleActive = stage === "subtitle" || stage === "description" || stage === "cta" || stage === "done"
  const descriptionActive = stage === "description" || stage === "cta" || stage === "done"

  const headline = useTypedReveal(HEADLINE, headlineActive, 45)
  const subtitle = useTypedReveal(SUBTITLE_PLAIN, subtitleActive, 30)
  const description = useTypedReveal(DESCRIPTION, descriptionActive, 16)

  // Cada bloco de texto, ao terminar de ser digitado, dá uma pequena pausa
  // e libera o próximo — leve e sem pressa, como pedido.
  useEffect(() => {
    if (stage !== "headline" || !headline.done) return
    const t = setTimeout(() => setStage("subtitle"), 350)
    return () => clearTimeout(t)
  }, [stage, headline.done])

  useEffect(() => {
    if (stage !== "subtitle" || !subtitle.done) return
    const t = setTimeout(() => setStage("description"), 350)
    return () => clearTimeout(t)
  }, [stage, subtitle.done])

  useEffect(() => {
    if (stage !== "description" || !description.done) return
    const t = setTimeout(() => setStage("cta"), 350)
    return () => clearTimeout(t)
  }, [stage, description.done])

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-24 pb-16"
    >
    {/* Background video — loads immediately */}
      <video
  ref={videoRef}
  className="absolute inset-0 z-0 h-full w-full object-cover"
  style={{ filter: "brightness(0.6) saturate(0.9)" }}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  aria-hidden="true"
>
  <source src="/videos/v-two.mp4" type="video/mp4" />
</video>

      {/* Overlay for text legibility over the video */}
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" />

      <div
        className="pointer-events-none absolute -left-20 top-24 h-[440px] w-[560px] rounded-full opacity-40 blur-[130px] z-10"
        style={{ background: "radial-gradient(circle, rgba(62,207,94,0.30), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.40), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 xl:grid-cols-2 xl:gap-16">
        <div className="flex flex-col items-center gap-6 text-center xl:items-start xl:text-left">
          {headlineActive && (
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              {headline.displayed}
              {!headline.done && <TypingCaret />}
            </h1>
          )}

          {subtitleActive && (
            <p className="text-pretty text-xl font-medium text-muted-foreground sm:text-2xl">
              {subtitle.done ? (
                <>
                  Transforme sua carreira com{" "}
                  <span className="relative whitespace-nowrap font-semibold text-brand">
                    [programação
                    <span className="ml-0.5 inline-block h-5 w-[3px] translate-y-0.5 animate-pulse bg-brand align-middle sm:h-6" />
                    ]
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-brand"
                      aria-hidden="true"
                    />
                  </span>{" "}
                  do zero ao avançado
                </>
              ) : (
                <>
                  {subtitle.displayed}
                  <TypingCaret />
                </>
              )}
            </p>
          )}

          {descriptionActive && (
            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description.displayed}
              {!description.done && <TypingCaret />}
            </p>
          )}

          {(stage === "cta" || stage === "done") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (stage === "cta") {
                  setStage("done")
                  onSequenceComplete?.()
                }
              }}
              className="mt-2 flex origin-center flex-col items-center gap-3 sm:flex-row xl:origin-left xl:items-start"
            >
              <a
                href="#formacoes"
                className="rounded-lg bg-brand px-6 py-3 text-center text-sm font-semibold text-brand-foreground shadow-[0_0_24px_rgba(62,207,94,0.45)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(62,207,94,0.65)]"
              >
                Ver Formações
              </a>
              <a
                href="#sobre"
                className="rounded-lg border border-border px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-white/5"
              >
                Ver mais
              </a>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-4 flex items-center gap-3"
            >
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Reconhecimento 5 estrelas no mercado!
              </span>
            </motion.div>
          )}
        </div>

        <div ref={slotRef}>
          <NotebookMockup entryOffset={entryOffset} onSettled={handleNotebookSettled} />
        </div>
      </div>
    </section>
  )
}
