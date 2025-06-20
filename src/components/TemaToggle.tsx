import React from "react";

interface TemaToggleProps {
  tema: "dark" | "light";
  toggleTema: () => void;
}

export function TemaToggle({ tema, toggleTema }: TemaToggleProps) {
  return (
    <button
      onClick={toggleTema}
      className="px-3 py-1 border rounded
        border-red-600 dark:border-red-400
        text-red-600 dark:text-red-400
        hover:bg-red-600 hover:text-white
        dark:hover:bg-red-400 dark:hover:text-gray-900
        transition-colors"
      aria-label="Alternar tema claro/escuro"
      title="Alternar tema claro/escuro"
    >
      {tema === "dark" ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}
