interface Props {
  tempoDesejado: string;
  setTempoDesejado: (valor: string) => void;
}

export function CampoTempoDesejado({ tempoDesejado, setTempoDesejado }: Props) {
  return (
    <div
      className="mb-6"
      style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}
    >
      <label className="font-medium text-nowrap mr-3">Expediente de </label>
      <input
        type="number"
        step="0.25"
        min="0"
        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-1
          focus:outline-none focus:ring-2
          focus:ring-red-600 dark:focus:ring-red-400
          bg-gray-50 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          transition-colors"
        value={tempoDesejado}
        onChange={(e) => setTempoDesejado(e.target.value)}
        style={{ width: "3rem", textAlign: "center" }}
      />
      <label className="font-medium ml-3"> (horas)</label>
    </div>
  );
}
