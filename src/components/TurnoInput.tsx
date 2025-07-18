interface Turno {
  entrada: string;
  saida: string;
}

interface TurnoInputProps {
  turno: Turno;
  idx: number;
  atualizarTurno: (
    idx: number,
    campo: "entrada" | "saida",
    valor: string
  ) => void;
  adicionarTurno: () => void;
  removerTurno: (idx: number) => void;
  totalTurnos: number;
}

export function TurnoInput({
  turno,
  idx,
  atualizarTurno,
  adicionarTurno,
  removerTurno,
  totalTurnos,
}: TurnoInputProps) {
  return (
    <div
      className="gap-4 mb-4 items-center"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.25fr 0.25fr" }}
    >
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium mb-1">Entrada:</label>
        <input
          type="time"
          className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1
            focus:outline-none focus:ring-2
            focus:ring-red-600 dark:focus:ring-red-400
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            transition-colors"
          value={turno.entrada}
          onChange={(e) => atualizarTurno(idx, "entrada", e.target.value)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium mb-1">Saída:</label>
        <input
          type="time"
          className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1
            focus:outline-none focus:ring-2
            focus:ring-red-600 dark:focus:ring-red-400
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            transition-colors"
          value={turno.saida}
          onChange={(e) => atualizarTurno(idx, "saida", e.target.value)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <button
          onClick={adicionarTurno}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-purple-400 to-blue-900 text-white font-semibold text-base shadow-md hover:from-purple-500 hover:to-blue-800 transition mt-6"
        >
          <span className="text-lg">+</span>
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <button
          onClick={() => removerTurno(idx)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 text-gray-800 font-semibold text-base shadow-md hover:from-gray-400 hover:to-gray-500 transition mt-6 disabled:opacity-50"
          disabled={totalTurnos <= 1}
          title={
            totalTurnos <= 1
              ? "Deve haver pelo menos um turno"
              : "Remover turno"
          }
        >
          <span className="text-lg">-</span>
        </button>
      </div>
    </div>
  );
}
