"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
// Types importés uniquement si nécessaires dans l'avenir

type Variante = "primary" | "ghost" | "soleil" | "pomme" | "ciel" | "aubergine";

interface ButtonProps {
  children: ReactNode;
  variante?: Variante;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const VARIANTE_CLASSES: Record<Variante, string> = {
  primary:    "bg-tomate-500 text-creme-pale border-encre",
  ghost:      "bg-transparent text-encre border-encre",
  soleil:     "bg-soleil-400 text-soleil-ink border-encre",
  pomme:      "bg-pomme-500 text-creme-pale border-encre",
  ciel:       "bg-ciel-500 text-creme-pale border-encre",
  aubergine:  "bg-aubergine-500 text-creme-pale border-encre",
};

export default function Button({
  children,
  variante = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { x: -2, y: -2, rotate: -1 }}
      whileTap={disabled ? {} : { x: 2, y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-body font-bold text-lg
        px-7 py-4 rounded-pill
        border-[3px] cursor-pointer
        shadow-encre
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTE_CLASSES[variante]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
