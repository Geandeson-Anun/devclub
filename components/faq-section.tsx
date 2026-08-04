"use client"

import { useState } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ChevronDown, MessageCircle, Send } from "lucide-react"

const FAQS = [
  {
    q: "Qual é o tempo de acesso à plataforma?",
    a: "Você terá acesso por 12 meses completos a todo o conteúdo da Formação DevClub, incluindo as atualizações e novos módulos que forem sendo liberados durante esse período.",
  },
  {
    q: "Preciso ter algum conhecimento prévio sobre programação?",
    a: "Não. A Formação DevClub foi desenhada do zero ao avançado: começamos pela lógica de programação e pelos fundamentos, sem pressupor nenhum conhecimento técnico anterior. Se você já programa, pode avançar mais rápido pelos módulos iniciais e focar nos conteúdos intermediários e avançados.",
  },
  {
    q: "Qual o sistema de pagamento utilizado? É seguro?",
    a: "Todos os pagamentos são processados em ambiente 100% criptografado por gateways reconhecidos no mercado. Você pode pagar via cartão de crédito, com parcelamento em até 12x, ou à vista no PIX e boleto. Seus dados nunca ficam armazenados conosco.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Você conta com uma garantia incondicional de 7 dias. Se dentro desse prazo você sentir que a formação não é para você, basta solicitar o reembolso e devolvemos 100% do valor investido, sem burocracia e sem perguntas.",
  },
  {
    q: "Como eu assisto às aulas?",
    a: "As aulas ficam disponíveis na nossa plataforma própria, acessível pelo computador ou pelo celular, a qualquer hora. Você estuda no seu próprio ritmo, pausa e retoma de onde parou, quantas vezes quiser, dentro do período de acesso.",
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-[#08090C] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-sm text-brand">faq_</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={item.q}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`overflow-hidden rounded-xl border bg-surface/40 backdrop-blur-sm transition-colors ${
                  isOpen ? "border-brand/30" : "border-border hover:border-white/15"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-medium text-foreground">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`shrink-0 ${isOpen ? "text-brand" : "text-muted-foreground"}`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-5 pb-5 text-pretty leading-relaxed text-muted-foreground">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-2xl border border-border bg-surface/40 p-8 text-center backdrop-blur-sm sm:p-10"
        >
          <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
            Ainda tem dúvidas? Vamos conversar.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Se você tem alguma dúvida, sugestão ou até mesmo uma reclamação, entre em contato.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.a
              href="#faq"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-white/5"
            >
              <MessageCircle className="h-4 w-4" />
              Iniciar conversa
            </motion.a>
            <motion.a
              href="#matricula"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(62,207,94,0.55)]"
            >
              <Send className="h-4 w-4" />
              Mandar mensagem
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
