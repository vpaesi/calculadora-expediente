interface Props {
  tempoDesejadoHoras: string;
  tempoDesejadoMinutos: string;
  setTempoDesejadoHoras: (valor: string) => void;
  setTempoDesejadoMinutos: (valor: string) => void;
  usarPomodoro: boolean;
  setUsarPomodoro: (valor: boolean) => void;
}

export function CampoTempoDesejado({
  tempoDesejadoHoras,
  tempoDesejadoMinutos,
  setTempoDesejadoHoras,
  setTempoDesejadoMinutos,
  usarPomodoro,
  setUsarPomodoro,
}: Props) {
  return (
    <div className="mb-6">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <label className="font-medium text-nowrap mr-3">Expediente de </label>
        <input
          type="number"
          min="0"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1
            focus:outline-none focus:ring-2
            focus:ring-red-600 dark:focus:ring-red-400
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            transition-colors"
          value={tempoDesejadoHoras}
          onChange={(e) => setTempoDesejadoHoras(e.target.value)}
          style={{ width: "4rem", textAlign: "center" }}
        />
        <label className="font-medium ml-1 mr-1">h</label>
        <input
          type="number"
          min="0"
          max="59"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1
            focus:outline-none focus:ring-2
            focus:ring-red-600 dark:focus:ring-red-400
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            transition-colors"
          value={tempoDesejadoMinutos}
          onChange={(e) => setTempoDesejadoMinutos(e.target.value)}
          style={{ width: "4rem", textAlign: "center" }}
        />
        <label className="font-medium ml-1">min</label>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <label className="flex items-center cursor-pointer">
          <input
            id="pomodoro-toggle"
            type="checkbox"
            checked={usarPomodoro}
            onChange={(e) => setUsarPomodoro(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 relative transition-colors">
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:left-5"></div>
          </div>
        </label>
        <label htmlFor="pomodoro-toggle" className="ml-2 text-sm font-medium select-none text-gray-900 dark:text-gray-100">
          Desejo utilizar o método Pomodoro durante o expediente
        </label>
      </div>
    </div>
  );
}
