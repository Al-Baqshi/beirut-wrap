/**
 * Beirut Wrap Menu — Home Page
 * Design: Lebanese Parchment — warm cream, charcoal headers, burnt orange accents
 * Fonts: Oswald (headings) + Inter (body)
 * Layout: Sticky nav → Hero → Category sections → Combo banner → Footer
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Image URLs ──────────────────────────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663595001455/7fJKtgQkNBE7DJ45nEBWRR/hero_shawarma-9JoVuxKC5EWCL6mg7yrUwr.webp";
const RICE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663595001455/7fJKtgQkNBE7DJ45nEBWRR/rice_plate-YHVqBJi8WHeMcWFSoocyb7.webp";
const FRIES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663595001455/7fJKtgQkNBE7DJ45nEBWRR/loaded_fries-6mHTtqqBpJ5FUn4ifKxFEc.webp";
const FALAFEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663595001455/7fJKtgQkNBE7DJ45nEBWRR/falafel_wrap-ZQwAWJunZJDywKwKotJByT.webp";
/** Dark-background variant — hero overlay + footer stage (`client/public/`). */
const LOGO_URL = "/beirut-wrap-fordark-logo.png";

// ── Types ───────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  price: number;
  desc: string;
  addon?: string;
  bestSeller?: boolean;
  vegetarian?: boolean;
  image?: string;
}

interface MenuSection {
  id: string;
  label: string;
  icon: string;
  hours?: string;
  items: MenuItem[];
}

// ── Menu Data ────────────────────────────────────────────────────────────────
const MENU: MenuSection[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    icon: "🌅",
    hours: "7:00 – 11:00 AM",
    items: [
      {
        name: "Egg & Cheese Wrap",
        price: 10,
        desc: "Scrambled eggs, cheese, hash brown, garlic or tomato sauce",
        addon: "+ Add chicken $3  |  + Add lamb $4",
      },
      {
        name: "Halloumi Breakfast Wrap",
        price: 12,
        desc: "Grilled halloumi, tomato, fresh mint, light honey drizzle",
        vegetarian: true,
      },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    icon: "🌯",
    items: [
      {
        name: "Chicken Shawarma Wrap",
        price: 14,
        desc: "Chicken, lettuce, tomato, pickles, fries, garlic sauce",
        bestSeller: true,
        image: HERO_IMG,
      },
      {
        name: "Lamb Shawarma Wrap",
        price: 15,
        desc: "Lamb, lettuce, tomato, pickles, fries, garlic sauce",
      },
      {
        name: "Mixed Shawarma Wrap",
        price: 17,
        desc: "Chicken & lamb, fries, garlic and chili sauce",
      },
      {
        name: "Beirut Chicken Grill Wrap",
        price: 15,
        desc: "Grilled chicken breast, sautéed peppers, lettuce, garlic sauce",
      },
      {
        name: "Falafel Wrap",
        price: 13,
        desc: "Falafel, lettuce, tomato, pickles, tahini sauce",
        vegetarian: true,
        image: FALAFEL_IMG,
      },
      {
        name: "Halloumi Wrap",
        price: 14,
        desc: "Grilled halloumi, carrot, mint, tomato, light sauce",
        vegetarian: true,
      },
    ],
  },
  {
    id: "plates",
    label: "Rice Plates",
    icon: "🍚",
    items: [
      {
        name: "Chicken Shawarma Plate",
        price: 16,
        desc: "Rice, chicken, salad, garlic sauce",
        bestSeller: true,
        image: RICE_IMG,
      },
      {
        name: "Lamb Shawarma Plate",
        price: 17,
        desc: "Rice, lamb, salad, garlic sauce",
      },
      {
        name: "Mixed Shawarma Plate",
        price: 19,
        desc: "Chicken & lamb, rice, salad, garlic and chili sauce",
      },
      {
        name: "Falafel Plate",
        price: 15,
        desc: "Falafel, rice, salad, tahini sauce",
        vegetarian: true,
      },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    icon: "🍟",
    items: [
      {
        name: "Loaded Shawarma Fries",
        price: 13,
        desc: "Fries topped with chicken or lamb, garlic and chili sauce",
        bestSeller: true,
        image: FRIES_IMG,
      },
      {
        name: "Falafel Snack (4 pcs)",
        price: 7,
        desc: "Served with tahini",
      },
      {
        name: "Fries",
        price: 6,
        desc: "Golden crispy fries",
        addon: "+ Seasoned $1",
      },
      {
        name: "Hummus & Bread",
        price: 7,
        desc: "Smooth hummus served with warm flatbread",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "🥤",
    items: [
      { name: "Soft Drink", price: 4, desc: "Coke, Sprite, Fanta" },
      { name: "Water", price: 3, desc: "Still or sparkling" },
      { name: "Ayran", price: 5, desc: "Traditional yogurt drink, lightly salted" },
    ],
  },
];

const NAV_ITEMS = MENU.map((s) => ({ id: s.id, label: s.label, icon: s.icon }));

// ── Sub-components ───────────────────────────────────────────────────────────

function VBadge() {
  return (
    <span className="inline-flex items-center justify-center text-[10px] font-bold leading-none px-1.5 py-0.5 rounded bg-[#2D5A27] text-white ml-1.5 align-middle">
      V
    </span>
  );
}

function BestSellerBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#C8511B] ml-1.5 align-middle">
      ★ Best Seller
    </span>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`group relative bg-[#FDFAF4] rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        item.bestSeller
          ? "border-l-4 border-l-[#C8511B] border-t border-r border-b border-[#e8dfc8]"
          : "border border-[#e8dfc8]"
      }`}
    >
      {item.image && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {item.bestSeller && (
            <div className="absolute top-3 left-3 bg-[#C8511B] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              ★ Best Seller
            </div>
          )}
          {item.vegetarian && (
            <div className="absolute top-3 right-3 bg-[#2D5A27] text-white text-[10px] font-bold px-2 py-1 rounded-full">
              V
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[15px] text-[#1A1A1A] leading-snug">
              {item.name}
              {!item.image && item.vegetarian && <VBadge />}
              {!item.image && item.bestSeller && <BestSellerBadge />}
            </h3>
            <p className="text-[13px] text-[#7a6a55] mt-1 leading-relaxed font-light">
              {item.desc}
            </p>
            {item.addon && (
              <p className="text-[12px] text-[#A07820] mt-1.5 italic font-light">
                {item.addon}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <span className="font-['Oswald'] font-bold text-[22px] text-[#C8511B] leading-none">
              ${item.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionBlock({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} className="scroll-mt-24 py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2.5 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-md">
          <span className="text-lg">{section.icon}</span>
          <h2 className="font-['Oswald'] text-[15px] font-semibold tracking-[2.5px] uppercase">
            {section.label}
          </h2>
          {section.hours && (
            <span className="text-[11px] text-white/50 font-light ml-1">
              {section.hours}
            </span>
          )}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#C8511B]/30 to-transparent" />
      </div>

      {/* Items grid */}
      <div
        className={`grid gap-4 ${
          section.items.length <= 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {section.items.map((item, i) => (
          <MenuCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("breakfast");
  const [navStuck, setNavStuck] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Sticky nav detection
  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        setNavStuck(window.scrollY > navRef.current.offsetTop - 10);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    MENU.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">

      {/* ── HERO ── */}
      <div className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Beirut Wrap hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Logo — top-left stage */}
        <motion.div
          className="absolute left-3 top-3 z-20 sm:left-5 sm:top-5 max-w-[calc(100%-1.5rem)]"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="rounded-xl border border-white/15 bg-black/30 p-2 shadow-lg shadow-black/40 backdrop-blur-md ring-1 ring-white/5 sm:p-3">
            <img
              src={LOGO_URL}
              alt="Beirut Wrap"
              className="h-[4.5rem] w-auto max-w-[9.5rem] object-contain object-left drop-shadow-lg sm:h-28 sm:max-w-[11rem] md:h-32 md:max-w-[13rem]"
            />
          </div>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="font-['Oswald'] text-5xl md:text-7xl font-bold text-white tracking-[6px] uppercase leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            BEIRUT <span className="text-[#C8511B]">WRAP</span>
          </motion.h1>
          <motion.p
            className="text-white/75 text-sm md:text-base tracking-[4px] uppercase font-light mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Lebanese Shawarma &amp; Grill
          </motion.p>

          {/* Pillars */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {["🌿 Fresh Daily", "🔥 Authentic Lebanese", "🌯 Made to Order", "⚡ Fast Service"].map((p) => (
              <span
                key={p}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F0E8] to-transparent" />
      </div>

      {/* ── STICKY NAV ── */}
      <div
        ref={navRef}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          navStuck
            ? "bg-[#F5F0E8]/95 backdrop-blur-md shadow-md border-b border-[#e8dfc8]"
            : "bg-[#F5F0E8]"
        }`}
      >
        <div className="container">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide no-scrollbar">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-[#C8511B] text-white shadow-sm"
                    : "text-[#5a4a35] hover:bg-[#e8dfc8]"
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-['Oswald'] tracking-wide uppercase text-[12px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Decorative orange rule */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C8511B]/40 to-transparent" />
      </div>

      {/* ── MENU SECTIONS ── */}
      <div className="container pb-8">
        {MENU.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>

      {/* ── COMBO DEALS BANNER ── */}
      <section id="combos" className="bg-[#1A1A1A] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-[#C8511B] font-['Oswald'] text-sm tracking-[4px] uppercase mb-2">
              🔥 Save More
            </p>
            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-white tracking-wide uppercase">
              Combo Deals
            </h2>
            <p className="text-white/50 text-sm mt-2 font-light">
              The best value — pick your favourite and add a drink
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                name: "Wrap Combo",
                price: 19,
                desc: "Any Wrap + Fries + Drink",
                detail: "Choose any wrap from our menu, add golden fries and a cold drink.",
                icon: "🌯",
              },
              {
                name: "Plate Combo",
                price: 22,
                desc: "Any Rice Plate + Drink",
                detail: "Choose any rice plate from our menu and add a refreshing drink.",
                icon: "🍚",
              },
            ].map((combo, i) => (
              <motion.div
                key={combo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/5 border border-[#C8511B]/30 rounded-xl p-7 text-center hover:border-[#C8511B]/70 hover:bg-white/8 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3">{combo.icon}</div>
                <h3 className="font-['Oswald'] text-xl font-semibold text-white tracking-widest uppercase mb-1">
                  {combo.name}
                </h3>
                <div className="font-['Oswald'] text-6xl font-bold text-[#C8511B] leading-none my-3">
                  ${combo.price}
                </div>
                <p className="text-white/70 text-sm font-medium mb-2">{combo.desc}</p>
                <p className="text-white/40 text-[12px] font-light leading-relaxed">{combo.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] text-white/60 py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <img
            src={LOGO_URL}
            alt="Beirut Wrap"
            className="h-20 w-auto max-w-[120px] object-contain mx-auto mb-4 opacity-90"
          />
          <p className="font-['Oswald'] text-white text-lg tracking-widest uppercase mb-1">
            Beirut Wrap
          </p>
          <p className="text-[12px] tracking-widest uppercase text-white/40 mb-4">
            Lebanese Shawarma &amp; Grill
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] uppercase tracking-widest text-white/40 mb-4">
            <span>★ Best Seller items marked</span>
            <span>·</span>
            <span className="text-[#2D5A27] font-semibold">V</span>
            <span>Vegetarian options available</span>
          </div>
          <p className="text-[11px] text-white/30">
            Prices include GST &nbsp;·&nbsp; Please advise staff of any allergies
          </p>
        </div>
      </footer>
    </div>
  );
}
