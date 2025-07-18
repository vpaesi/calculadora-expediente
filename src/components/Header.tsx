import { TemaToggle } from "./TemaToggle";

interface HeaderProps {
  tema: "dark" | "light";
  toggleTema: () => void;
}

export function Header({ tema, toggleTema }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-center sm:text-left mb-2 sm:mb-0">
        Calculadora de Expediente
      </h1>
      <TemaToggle tema={tema} toggleTema={toggleTema} />
    </header>
  );
}
