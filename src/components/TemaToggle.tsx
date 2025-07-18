import React from "react";

interface TemaToggleProps {
  tema: "dark" | "light";
  toggleTema: () => void;
}

export function TemaToggle({ tema, toggleTema }: TemaToggleProps) {
  return (
    <button
      onClick={toggleTema}
      className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors border border-transparent 
        ${tema === "dark"
          ? "bg-gradient-to-b from-purple-400 to-blue-900 text-white hover:from-purple-500 hover:to-blue-800"
          : "bg-gradient-to-b from-purple-200 to-blue-400 text-blue-900 hover:from-purple-300 hover:to-blue-500"
        }`}
      aria-label="Alternar tema claro/escuro"
      title="Alternar tema claro/escuro"
    >
      {tema === "dark" ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}
