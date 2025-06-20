import { useState, useRef, useEffect } from "react";

const audioFoco =
  "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b6e.mp3";
const audioDescanso =
  "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b6e.mp3";

export function PomodoroCalculator() {
  const [focoMin, setFocoMin] = useState(25);
  const [descansoMin, setDescansoMin] = useState(5);
  const [modo, setModo] = useState<"foco" | "descanso">("foco");
  const [segundosRestantes, setSegundosRestantes] = useState(focoMin * 60);
  const [rodando, setRodando] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setSegundosRestantes(modo === "foco" ? focoMin * 60 : descansoMin * 60);
  }, [focoMin, descansoMin, modo]);

  useEffect(() => {
    if (rodando) {
      intervalRef.current = setInterval(() => {
        setSegundosRestantes((s) => {
          if (s <= 1) {
            tocarAudio(modo);
            setRodando(false);
            setTimeout(() => {
              setModo((m) => (m === "foco" ? "descanso" : "foco"));
              setSegundosRestantes(
                modo === "foco" ? descansoMin * 60 : focoMin * 60
              );
            }, 1000);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [rodando, modo]);

  function tocarAudio(tipo: "foco" | "descanso") {
    const audio = new Audio(tipo === "foco" ? audioFoco : audioDescanso);
    audio.play();
  }

  function formatarTempo(seg: number) {
    const m = Math.floor(seg / 60)
      .toString()
      .padStart(2, "0");
    const s = (seg % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleStartPause() {
    setRodando((r) => !r);
  }

  function handleReset() {
    setRodando(false);
    setSegundosRestantes(modo === "foco" ? focoMin * 60 : descansoMin * 60);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center
        bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
        transition-colors duration-300"
    >
    <div className="w-full max-w-xs p-4 rounded-lg shadow-md dark:shadow-lg border border-transparent dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">Pomodoro</h2>
      <div className="flex gap-2 mb-4">
        <div>
          <label className="text-sm">Foco:</label>
          <input
            type="number"
            min={1}
            max={120}
            value={focoMin}
            onChange={(e) => setFocoMin(Number(e.target.value))}
            className="w-16 ml-2 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={rodando}
          />
        </div>
        <div>
          <label className="text-sm">Descanso:</label>
          <input
            type="number"
            min={1}
            max={60}
            value={descansoMin}
            onChange={(e) => setDescansoMin(Number(e.target.value))}
            className="w-16 ml-2 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={rodando}
          />
        </div>
      </div>
      <div className="mb-2 text-3xl font-mono">
        {modo === "foco" ? "Foco" : "Descanso"}
      </div>
      <div className="mb-4 text-4xl font-mono">
        {formatarTempo(segundosRestantes)}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleStartPause}
          className={`px-4 py-2 rounded font-bold ${
            rodando
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-red-600 hover:bg-red-700"
          } text-white dark:text-white transition`}
        >
          {rodando ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded font-bold bg-gray-400 hover:bg-gray-500 text-white dark:text-gray-900 transition"
        >
          Reset
        </button>
      </div>
    </div>
    </div>
  );
}
