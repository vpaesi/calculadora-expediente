interface ResumoJornadaProps {
  minutosTrabalhados: number;
  horarioFinal: string | null;
  tempoDesejadoMinutos: number;
}

function formatarHorasMinutos(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h > 0 && m > 0) return `${h}h e ${m}min`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
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
