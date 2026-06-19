"use client";

import { useState } from "react";

/* ─── Data ─────────────────────────────────────────────── */

const services = [
  {
    badge: "Colour match",
    title: "Paintwork & Resprays",
    bullets: [
      "Factory-accurate colour matching per panel",
      "Spot correction, edge blending, gloss coat",
      "Single-panel touchup or full-body respray",
      "UV-resistant clear coat, guaranteed finish",
    ],
  },
  {
    badge: "Dent repair",
    title: "Dent Removal",
    bullets: [
      "Paintless dent repair (PDR) for minor dings",
      "Filler-based repair for deeper damage",
      "No panel replacement unless truly necessary",
      "Invisible result on every job, guaranteed",
    ],
  },
  {
    badge: "Scratch fix",
    title: "Car Scratch Repair",
    bullets: [
      "Surface and deep-scratch damage assessment",
      "Polish and touch-up for superficial marks",
      "Full repaint for through-primer scratches",
      "Seamless blending into surrounding panels",
    ],
  },
  {
    badge: "Panel work",
    title: "Bumper, Panel & Door Repairs",
    bullets: [
      "Bumper reshaping, refilling, and repainting",
      "Door and quarter-panel restoration",
      "Perfect gap and alignment every time",
      "OEM or premium aftermarket fit guaranteed",
    ],
  },
  {
    badge: "Alloy care",
    title: "Alloy Wheel Restoration",
    bullets: [
      "Scuff and kerb-rash removal",
      "Full powder coat or diamond-cut finish",
      "Colour-matched to OEM wheel specification",
      "Tyres rebalanced after every refurb",
    ],
  },
];

const reviews = [
  {
    quote:
      "They matched my paint perfectly and the dent repair looks factory new. Fast, transparent, and the finish is stunning.",
    name: "Mia Rodriguez",
    title: "BMW 3 Series owner",
    initials: "MR",
  },
  {
    quote:
      "From bumper repair to full respray, every detail was handled with care. My car looks better than before the accident.",
    name: "Ethan Brooks",
    title: "Land Rover Defender driver",
    initials: "EB",
  },
  {
    quote:
      "The alloy wheel refurb and scratch removal were spotless. Honest pricing, premium results — exactly what I needed.",
    name: "Avery Chen",
    title: "Porsche 911 owner",
    initials: "AC",
  },
];

const supportReviews = [
  {
    quote:
      "The support from the BodyCraft team is like having a mechanic friend you can always call — they explained every step clearly and kept me updated throughout.",
    name: "Andrew Bass",
    title: "Customer — Volkswagen Golf GTI",
    initials: "AB",
  },
  {
    quote:
      "In all my time dealing with body shops, I've never experienced such consistent, professional care. The team kept me informed at every stage of the repair.",
    name: "Rob Hope",
    title: "Customer — Range Rover Sport",
    initials: "RH",
  },
  {
    quote:
      "Just wanted to say the BodyCraft team are the friendliest, most knowledgeable technicians I've worked with. Would recommend to anyone.",
    name: "Matt Evans",
    title: "Customer — Ford Mustang GT",
    initials: "ME",
  },
];

const darkTabData = [
  {
    label: "Minor repairs",
    rows: [
      { name: "Stone chip fill", time: "30 min", color: "text-green-400" },
      { name: "Door scuff buff", time: "1–2 hrs", color: "text-green-400" },
      { name: "Plastic trim clip", time: "45 min", color: "text-yellow-400" },
    ],
  },
  {
    label: "Major bodywork",
    rows: [
      { name: "Panel replacement", time: "1–2 days", color: "text-yellow-400" },
      { name: "Structural repair", time: "2–3 days", color: "text-orange-400" },
      { name: "Multi-panel repaint", time: "2–4 days", color: "text-yellow-400" },
    ],
  },
  {
    label: "Full resprays",
    rows: [
      { name: "Single panel", time: "1 day", color: "text-green-400" },
      { name: "Half-body", time: "2–3 days", color: "text-yellow-400" },
      { name: "Full respray", time: "3–5 days", color: "text-orange-400" },
    ],
  },
  {
    label: "Alloy wheels",
    rows: [
      { name: "Powder coat refurb", time: "1–2 days", color: "text-green-400" },
      { name: "Diamond cut", time: "1–2 days", color: "text-yellow-400" },
      { name: "Full set of four", time: "2–3 days", color: "text-orange-400" },
    ],
  },
  {
    label: "Crash recovery",
    rows: [
      { name: "Damage assessment", time: "Same day", color: "text-green-400" },
      { name: "Insurance liaison", time: "Included", color: "text-[#2563eb]" },
      { name: "Full rebuild", time: "3–7 days", color: "text-orange-400" },
    ],
  },
];

/* ─── Check icon ────────────────────────────────────────── */

function Check() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.12" />
      <path
        d="M5 8l2.5 2.5L11 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Modal ─────────────────────────────────────────────── */

function QuoteModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-full items-center justify-center px-4 py-8">
      <div className="modal-panel relative w-full max-w-md rounded-[1.375rem] border border-slate-900/10 bg-white p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.11),0_8px_16px_rgba(15,23,42,0.06),0_24px_64px_rgba(15,23,42,0.18)] sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-[0.5rem] bg-slate-100 text-xl leading-none text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
        >
          ×
        </button>

        <p
          className="text-xs uppercase tracking-[0.1em] text-slate-500"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          Request a quote
        </p>
        <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950">
          Tell us about your car.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Fill in your details and we&apos;ll respond with an accurate estimate
          within 24 hours.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="mt-6 space-y-4"
        >
          <label className="block">
            <span className="block text-sm font-medium text-slate-800">
              Name
            </span>
            <input
              type="text"
              required
              placeholder="Your full name"
              className="mt-1.5 w-full rounded-[0.5rem] border border-slate-900/15 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-800">
              Email address
            </span>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="mt-1.5 w-full rounded-[0.5rem] border border-slate-900/15 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-800">
              Location
            </span>
            <input
              type="text"
              required
              placeholder="City or postcode"
              className="mt-1.5 w-full rounded-[0.5rem] border border-slate-900/15 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-800">
              Service required
            </span>
            <textarea
              required
              rows={4}
              placeholder="Briefly describe the damage or service you need..."
              className="mt-1.5 w-full resize-none rounded-[0.5rem] border border-slate-900/15 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </label>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-[0.5rem] bg-[#2563eb] px-6 text-sm font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.05),inset_0_10px_24px_-10px_rgba(255,255,255,0.4)] transition hover:bg-[#1d4ed8]"
          >
            Submit request
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [processTab, setProcessTab] = useState(0);
  const [darkTab, setDarkTab] = useState(0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-[88%] max-w-[84rem] items-center justify-between py-3">
          {/* Logo mark — name TBD */}
          <a href="#" aria-label="Home" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <rect width="32" height="32" rx="8" fill="#2563eb"/>
              <path d="M7 20.5c0-1.1.9-2 2-2h3.5l2-5h7l2 5H25a2 2 0 0 1 2 2v.5H7v-.5Z" fill="white"/>
              <circle cx="11" cy="22.5" r="2" fill="white"/>
              <circle cx="21" cy="22.5" r="2" fill="white"/>
              <path d="M14 13.5h4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {["Services", "Process", "Reviews", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="hidden h-10 items-center justify-center rounded-[0.5rem] bg-[#2563eb] px-4 text-sm font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.05),inset_0_10px_24px_-10px_rgba(255,255,255,0.4)] transition hover:bg-[#1d4ed8] sm:inline-flex"
            >
              Request a quote
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-slate-900/10 text-slate-600 md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-900/10 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {["Services", "Process", "Reviews", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-700"
                >
                  {link}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openModal();
                }}
                className="h-11 rounded-[0.5rem] bg-[#2563eb] text-sm font-medium text-white"
              >
                Request a quote
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white pb-0 pt-20 sm:pt-28">
        {/* Gradient blobs matching reference (blue replaces pink) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -right-32 -top-32 h-[640px] w-[640px] rounded-full opacity-70"
            style={{ background: "var(--gradient-hero-blue)" }}
          />
          <div
            className="absolute -bottom-16 -left-32 h-[560px] w-[560px] rounded-full opacity-70"
            style={{ background: "var(--gradient-hero-yellow)" }}
          />
        </div>

        <div className="relative mx-auto w-[88%] max-w-[84rem] text-center">
          {/* Eyebrow */}
          <p
            className="text-xs uppercase tracking-[0.1em] text-slate-500"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            Certified car body repair
          </p>

          {/* H1 */}
          <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-black leading-[1.1] tracking-[-0.02em] text-slate-950 sm:text-6xl lg:text-[4rem]">
            You drop it off.
            <br />
            We restore it. Flawlessly.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-[1.5] text-slate-600">
            Paintwork, dent removal, bumper repairs, alloy restoration, and full
            crash recovery — done right, every time.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={openModal}
              className="flex h-14 w-full items-center justify-center rounded-[0.5rem] bg-[#2563eb] px-7 text-base font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.05),inset_0_10px_24px_-10px_rgba(255,255,255,0.4)] transition hover:bg-[#1d4ed8] sm:w-auto"
            >
              Request a quote
            </button>
            <button
              onClick={openModal}
              className="flex h-14 w-full items-center justify-center rounded-[0.5rem] border border-slate-900/15 bg-white px-7 text-base font-medium text-slate-950 shadow-[0_0_0_1px_rgba(15,23,42,0.08)] transition hover:bg-slate-50 sm:w-auto"
            >
              Schedule inspection
            </button>
          </div>

        </div>

        {/* Three mini feature-preview cards */}
        <div className="relative mx-auto mt-16 w-[88%] max-w-[84rem]">
          <div className="grid gap-5 sm:grid-cols-3">
            {/* Card 1 — Paint */}
            <div className="rounded-t-[1.375rem] border border-b-0 border-slate-900/10 bg-white p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]">
              <p
                className="text-[0.6875rem] uppercase tracking-[0.1em] text-slate-400"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                Paint & finish
              </p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                Paintwork &amp; Resprays
              </p>
              <div className="mt-4 space-y-2">
                {["Colour match", "Edge blend", "Clear coat"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check /> {s}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                {["#2563eb", "#f9f906", "#0f172a", "#94a3b8", "#ef4444"].map(
                  (c) => (
                    <div
                      key={c}
                      className="h-5 flex-1 rounded-full"
                      style={{ background: c }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Card 2 — Dent */}
            <div className="rounded-t-[1.375rem] border border-b-0 border-slate-900/10 bg-white p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]">
              <p
                className="text-[0.6875rem] uppercase tracking-[0.1em] text-slate-400"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                Dent &amp; scratch
              </p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                Dent &amp; Scratch Repair
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-[0.5rem] bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  PDR complete
                </div>
                <div className="flex items-center gap-2 rounded-[0.5rem] bg-[#eff6ff] px-3 py-2 text-xs font-medium text-[#2563eb]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#2563eb]" />
                  Paint matched
                </div>
                <div className="flex items-center gap-2 rounded-[0.5rem] bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  Ready for collection
                </div>
              </div>
            </div>

            {/* Card 3 — Collision */}
            <div className="rounded-t-[1.375rem] border border-b-0 border-slate-900/10 bg-white p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]">
              <p
                className="text-[0.6875rem] uppercase tracking-[0.1em] text-slate-400"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                Collision repair
              </p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                Accident Recovery
              </p>
              <div className="mt-4 space-y-2">
                {[
                  "Panel alignment",
                  "Structural repair",
                  "Full respray",
                  
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check /> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════ */}
      <section
        id="services"
        className="border-t border-slate-900/10 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto w-[88%] max-w-[84rem]">
          {/* Section header */}
          <div className="mx-auto max-w-xl text-center">
            <p
              className="text-xs uppercase tracking-[0.1em] text-slate-500"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              Car body services
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-[-0.02em] text-slate-950 sm:text-5xl">
              All forms of car body repair, under one roof.
            </h2>
            <p className="mt-4 text-base font-medium leading-[1.6] text-slate-600">
              Every repair completed to showroom standard — transparent quotes,
              quality materials, and a guaranteed finish.
            </p>
          </div>

          {/* Service cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-[1.375rem] border border-slate-900/10 bg-white p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)] transition hover:shadow-[0_0_0_1px_rgba(37,99,235,0.28),0_8px_24px_rgba(37,99,235,0.08)]"
              >
                <div className="inline-flex rounded-full border border-slate-900/10 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate-500">
                  {s.badge}
                </div>
                <h3 className="mt-4 text-xl font-black tracking-[-0.02em] text-slate-950">
                  {s.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm leading-[1.6] text-slate-600"
                    >
                      <Check /> {b}
                    </li>
                  ))}
                </ul>
                {/* Mini visual */}
                <div className="mt-6 overflow-hidden rounded-[0.875rem] border border-slate-900/5 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-16 rounded-full bg-slate-200" />
                  </div>
                  <div className="h-10 rounded-[0.5rem] bg-gradient-to-br from-[#2563eb]/10 to-[#f9f906]/20" />
                </div>
              </div>
            ))}

            {/* 6th card — full crash repair */}
            <div className="group rounded-[1.375rem] border border-slate-900/10 bg-white p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)] transition hover:shadow-[0_0_0_1px_rgba(37,99,235,0.28),0_8px_24px_rgba(37,99,235,0.08)]">
              <div className="inline-flex rounded-full border border-slate-900/10 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate-500">
                Full rebuild
              </div>
              <h3 className="mt-4 text-xl font-black tracking-[-0.02em] text-slate-950">
                Crash &amp; Accident Repairs
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Full post-collision assessment",
                  "Structural panel and chassis work",
                  "Direct insurance claim handling",
                  "Complete respray and quality check",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm leading-[1.6] text-slate-600"
                  >
                    <Check /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 overflow-hidden rounded-[0.875rem] border border-slate-900/5 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                  <div className="h-1.5 w-20 rounded-full bg-slate-200" />
                </div>
                <div className="h-10 rounded-[0.5rem] bg-gradient-to-br from-slate-200 to-[#2563eb]/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CUSTOMER SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section
        id="reviews"
        className="border-t border-slate-900/10 bg-slate-50 py-24 sm:py-32"
      >
        <div className="mx-auto w-[88%] max-w-[84rem]">
          <div className="mx-auto max-w-xl text-center">
            <p
              className="text-xs uppercase tracking-[0.1em] text-slate-500"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              Made with BodyCraft
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-[-0.02em] text-slate-950 sm:text-5xl">
              Real drivers shipping real results.
            </h2>
            <p className="mt-4 text-base font-medium leading-[1.6] text-slate-600">
              Everyday cars and premium vehicles. What will you restore?
            </p>
          </div>

          {/* Showcase cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "BMW 3 Series",
                sub: "Full respray + PDR dent removal",
                bg: "#2563eb",
              },
              {
                title: "Land Rover Defender",
                sub: "Bumper & quarter-panel rebuild",
                bg: "#0f172a",
              },
              {
                title: "Porsche 911",
                sub: "Alloy refurb + deep scratch repair",
                bg: "#1d4ed8",
              },
            ].map((car) => (
              <div
                key={car.title}
                className="overflow-hidden rounded-[1.375rem] border border-slate-900/10 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]"
              >
                {/* Car silhouette placeholder */}
                <div
                  className="flex h-40 items-center justify-center"
                  style={{ background: car.bg }}
                >
                  <svg
                    viewBox="0 0 140 56"
                    className="w-36 opacity-25"
                    fill="white"
                  >
                    <path d="M12 40 Q18 22 40 20 L52 13 Q70 8 88 13 L100 20 Q122 22 128 40 Q131 46 128 48 L12 48 Q9 46 12 40Z" />
                    <circle cx="34" cy="49" r="7" />
                    <circle cx="106" cy="49" r="7" />
                    <rect x="52" y="14" width="36" height="12" rx="3" opacity="0.4" />
                  </svg>
                </div>
                <div className="p-5">
                  <p className="font-semibold text-slate-950">{car.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{car.sub}</p>
                  <div className="mt-3">
                    <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="rounded-[1.375rem] border border-slate-900/10 bg-white p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]"
              >
                <p className="text-sm leading-[1.75] text-slate-600">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-xs font-black text-white">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {r.name}
                    </p>
                    <p className="text-xs text-slate-500">{r.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════ */}
      <section
        id="process"
        className="border-t border-slate-900/10 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto w-[88%] max-w-[84rem]">
          <div className="mx-auto max-w-xl text-center">
            <p
              className="text-xs uppercase tracking-[0.1em] text-slate-500"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              Start your repair
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-[-0.02em] text-slate-950 sm:text-5xl">
              Book your repair in minutes.
            </h2>
            <p className="mt-4 text-base font-medium leading-[1.6] text-slate-600">
              One booking covers inspection, repair, and return — no chasing,
              no surprises, no hassle.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="mt-10 flex justify-center gap-2">
            {["Request online", "Call or visit"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setProcessTab(i)}
                className={`rounded-[0.5rem] px-4 py-2 text-sm font-medium transition ${
                  processTab === i
                    ? "bg-slate-950 text-white"
                    : "border border-slate-900/10 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main card */}
          <div className="mt-6 overflow-hidden rounded-[1.375rem] border border-slate-900/10 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 border-b border-slate-900/10 bg-slate-50 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span
                className="ml-3 text-xs text-slate-400"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                {processTab === 0
                  ? "bodycraft.com/request-quote"
                  : "bodycraft.com/contact"}
              </span>
            </div>
            <div className="tab-content p-8 sm:p-10">
              {processTab === 0 ? (
                <div className="space-y-6">
                  {[
                    {
                      num: "01",
                      title: "Describe your damage",
                      body: "Fill in a short form with your car details and damage type. Takes under 2 minutes.",
                      accent: "#2563eb",
                      textAccent: "text-white",
                    },
                    {
                      num: "02",
                      title: "Receive your estimate",
                      body: "We'll send a detailed quote within 24 hours with a clear price breakdown and timeline.",
                      accent: "#2563eb",
                      textAccent: "text-white",
                    },
                    {
                      num: "03",
                      title: "Drop off & collect",
                      body: "Bring your car in, we'll do the work, then contact you when it's ready for collection.",
                      accent: "#f9f906",
                      textAccent: "text-slate-950",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.5rem] font-mono text-xs font-black ${step.textAccent}`}
                        style={{ background: step.accent }}
                      >
                        {step.num}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-[1.6] text-slate-500">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {[
                    {
                      icon: "☎",
                      bg: "#2563eb",
                      textColor: "text-white",
                      title: "Call us: (555) 842-3071",
                      body: "Mon–Sat, 8am–6pm. Speak directly to a technician for complex or urgent repairs.",
                    },
                    {
                      icon: "📍",
                      bg: "#f9f906",
                      textColor: "text-slate-950",
                      title: "Visit our workshop",
                      body: "Walk-ins welcome any weekday. We'll inspect your car on the spot and give an instant quote.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.5rem] text-base ${item.textColor}`}
                        style={{ background: item.bg }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-[1.6] text-slate-500">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Two benefit rows */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: "⚡",
                title: "Same-week appointments",
                sub: "Most minor repairs can be booked and started within 2–3 working days of your request.",
              },
              {
                icon: "✓",
                title: "Let your insurer handle billing",
                sub: "We work directly with all major insurance providers on accident and collision claims.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-[1.375rem] border border-slate-900/10 bg-white p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.06)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.5rem] bg-slate-100 text-lg">
                  {item.icon}
                </span>
                <div>
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm leading-[1.6] text-slate-500">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DARK SERVICE SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0f172a] py-24 sm:py-32">
        <div className="mx-auto w-[88%] max-w-[84rem]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#1e293b] p-8 sm:p-12">
            {/* Dot pattern overlay */}
            <div
              className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.15]"
              aria-hidden
            />

            <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left */}
              <div>
                <p
                  className="text-xs uppercase tracking-[0.1em] text-[#2563eb]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Your car, our craft
                </p>
                <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                  Drop in for a repair or book your full restoration.
                </h2>
                <p className="mt-4 text-base font-medium leading-[1.6] text-slate-400">
                  From a small door scuff to a full post-accident rebuild —
                  every job, every standard.
                </p>

                {/* Tab buttons */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {darkTabData.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setDarkTab(i)}
                      className={`rounded-[0.5rem] px-3.5 py-2 text-sm font-medium transition ${
                        darkTab === i
                          ? "bg-[#2563eb] text-white"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — data panel */}
              <div className="rounded-[1.375rem] border border-white/10 bg-[#0f172a] p-6">
                <p
                  className="mb-4 text-[0.6875rem] uppercase tracking-[0.1em] text-slate-500"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {darkTabData[darkTab].label}
                </p>
                <div className="tab-content">
                  {darkTabData[darkTab].rows.map((row) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between border-b border-white/10 py-3.5 last:border-0"
                    >
                      <span className="text-sm text-slate-300">{row.name}</span>
                      <span
                        className={`font-mono text-xs font-medium ${row.color}`}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SUPPORT / TEAM
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="border-t border-slate-900/10 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto w-[88%] max-w-[84rem]">
          <div className="mx-auto max-w-xl text-center">
            <p
              className="text-xs uppercase tracking-[0.1em] text-slate-500"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              We&rsquo;re here to help
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-[-0.02em] text-slate-950 sm:text-5xl">
              Expert care — from the people who do the work.
            </h2>
            <p className="mt-4 text-base font-medium leading-[1.6] text-slate-600">
              Our technicians are on hand to walk you through any repair, big
              or small, from first quote to final collection.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {supportReviews.map((r) => (
              <div
                key={r.name}
                className="rounded-[1.375rem] border border-slate-900/10 bg-white p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.05)]"
              >
                <p className="text-sm leading-[1.75] text-slate-600">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {r.name}
                    </p>
                    <p className="text-xs text-slate-500">{r.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0f172a] py-24 sm:py-32">
        <div className="mx-auto w-[88%] max-w-[84rem]">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left */}
            <div>
              <h2 className="text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                Get your car looking perfect today.
              </h2>
              <p className="mt-5 max-w-md text-base font-medium leading-[1.6] text-slate-400">
                Request a free inspection or quote — we&apos;ll restore your
                car to its very best with a premium finish you&apos;ll love.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={openModal}
                  className="flex h-14 items-center justify-center rounded-[0.5rem] bg-[#f9f906] px-7 text-base font-medium text-slate-950 shadow-[0_1px_2px_rgba(0,0,0,0.12),inset_0_10px_24px_-10px_rgba(255,255,255,0.5)] transition hover:bg-[color-mix(in_oklch,#f9f906_95%,black)]"
                >
                  Start your free repair quote
                </button>
              </div>
            </div>

            {/* Right — stylised repair status card */}
            <div className="rounded-[1.375rem] border border-white/10 bg-[#1e293b] p-6">
              <div className="mb-4 flex items-center justify-between">
                <p
                  className="text-xs text-slate-400"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Repair status
                </p>
                <span
                  className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-400"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Live
                </span>
              </div>
              {[
                {
                  car: "Toyota GR86 — Dent removal",
                  status: "Complete",
                  col: "text-green-400",
                },
                {
                  car: "Audi A4 — Full respray",
                  status: "In progress",
                  col: "text-yellow-400",
                },
                {
                  car: "BMW M3 — Panel repair",
                  status: "Scheduled",
                  col: "text-[#2563eb]",
                },
              ].map((row) => (
                <div
                  key={row.car}
                  className="flex items-center justify-between border-b border-white/5 py-3 last:border-0"
                >
                  <span className="text-sm text-slate-300">{row.car}</span>
                  <span
                    className={`font-mono text-xs ${row.col}`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { value: "50", label: "Cars repaired" },
                  { value: "17", label: "This month" },
                  { value: "10", label: "5★ reviews" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[0.5rem] bg-[#0f172a] p-3 text-center"
                  >
                    <p className="text-2xl font-black text-white">
                      {stat.value}
                    </p>
                    <p
                      className="mt-1 text-[0.6rem] uppercase tracking-wide text-slate-500"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 bg-[#0c1222] py-16">
        <div className="mx-auto w-[88%] max-w-[84rem]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <a href="#" aria-label="Home">
                <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden>
                  <rect width="32" height="32" rx="8" fill="#2563eb"/>
                  <path d="M7 20.5c0-1.1.9-2 2-2h3.5l2-5h7l2 5H25a2 2 0 0 1 2 2v.5H7v-.5Z" fill="white"/>
                  <circle cx="11" cy="22.5" r="2" fill="white"/>
                  <circle cx="21" cy="22.5" r="2" fill="white"/>
                  <path d="M14 13.5h4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </a>
              <p className="mt-4 max-w-[240px] text-sm leading-[1.7] text-slate-400">
                Premium car body repair and restoration. Trusted by hundreds of
                drivers.
              </p>
            </div>

            {/* Nav columns */}
            {[
              {
                heading: "Services",
                links: [
                  "Paintwork & Resprays",
                  "Dent Removal",
                  "Scratch Repair",
                  "Bumper & Panels",
                  "Alloy Wheels",
                  "Accident Recovery",
                ],
              },
              {
                heading: "Company",
                links: ["About us", "Our process", "Customer reviews", "Blog"],
              },
              {
                heading: "Contact",
                links: [
                  "Request a quote",
                  "Schedule inspection",
                  "(555) 842-3071",
                  "hello@bodycraft.com",
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p
                  className="text-[0.6875rem] uppercase tracking-[0.1em] text-slate-500"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 transition hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-500">
              © 2024 Premium Car Body Repair. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Twitter", "Instagram", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm text-slate-500 transition hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════
          MODAL
      ══════════════════════════════════════════════════════ */}
      {modalOpen && <QuoteModal onClose={closeModal} />}
    </>
  );
}
