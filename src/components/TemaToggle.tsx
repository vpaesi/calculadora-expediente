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
          ? "bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300"
          : "bg-gray-800 text-white font-bold hover:bg-gray-700"}
      `}
      aria-label="Alternar tema claro/escuro"
      title="Alternar tema claro/escuro"
    >
      {tema === "dark" ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}
