
import { formatarHorasMinutos } from "../utils/time";

interface ResumoJornadaProps {
  minutosTrabalhados: number;
  horarioFinal: string | null;
  tempoDesejadoMinutos: number;
}

export function ResumoJornada({
  minutosTrabalhados,
  horarioFinal,
  tempoDesejadoMinutos,
}: ResumoJornadaProps) {
  const nenhumHorario = minutosTrabalhados === 0 && !horarioFinal;
  const jornadaCompleta = !nenhumHorario && !horarioFinal;

  return (
    <div
      className={
        jornadaCompleta
          ? "bg-green-200 dark:bg-green-700 rounded p-4 text-center transition-colors"
          : "bg-gray-100 dark:bg-gray-800 rounded p-4 text-center transition-colors"
      }
    >
      <p>
        Total trabalhado até agora:{" "}
        <strong>{formatarHorasMinutos(minutosTrabalhados)}</strong>
      </p>
      {nenhumHorario ? (
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Insira seu horário de entrada
        </p>
      ) : horarioFinal ? (
        <p className="mt-2 text-red-700 dark:text-red-400 font-semibold">
          Precisa trabalhar até às <span>{horarioFinal}</span> para fechar{" "}
          {formatarHorasMinutos(tempoDesejadoMinutos)}
        </p>
      ) : (
        <p className="mt-2 text-green-900 dark:text-green-100 font-semibold">
          Já trabalhou o suficiente para fechar o tempo desejado.
        </p>
      )}
    </div>
  );
}
