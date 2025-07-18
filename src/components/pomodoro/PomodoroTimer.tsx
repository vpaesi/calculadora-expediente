import { useState, useEffect, useRef } from "react";
import beepSound from "../../assets/sons/beep.mp3";
import playSound from "../../assets/sons/play.wav";
import pauseSound from "../../assets/sons/pause.mp3";
import type { PomodoroContext } from "./PomodoroApp";
import { formatarTempo } from "../../utils/time";

const DURACOES = {
  foco: 25 * 60,
  "descanso-curto": 5 * 60,
  "descanso-longo": 15 * 60,
};

interface PomodoroTimerProps {
  contexto: PomodoroContext;
  setContexto: (c: PomodoroContext) => void;
  musica: boolean;
  setMusica: (v: boolean) => void;
}

export function PomodoroTimer({ contexto, setContexto, musica, setMusica }: PomodoroTimerProps) {
  const [segundos, setSegundos] = useState(DURACOES[contexto]);
  const [rodando, setRodando] = useState(false);
  const intervaloRef = useRef<number | null>(null);
  const audioMusica = useRef<HTMLAudioElement | null>(null);
  const audioBeep = useRef<HTMLAudioElement | null>(null);
  const audioPlay = useRef<HTMLAudioElement | null>(null);
  const audioPause = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setSegundos(DURACOES[contexto]);
    setRodando(false);
  }, [contexto]);

  useEffect(() => {
    if (rodando) {
      intervaloRef.current = window.setInterval(() => {
        setSegundos((s) => {
          if (s <= 1) {
            setRodando(false);
            setTimeout(() => { audioBeep.current?.play(); }, 100);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [rodando]);

  useEffect(() => {
    if (musica) {
      audioMusica.current?.play();
    } else {
      audioMusica.current?.pause();
    }
  }, [musica]);



  function handleContexto(c: PomodoroContext) {
    setContexto(c);
  }

  function handleStartPause() {
    setRodando((r) => {
      if (!r) {
        if (audioPlay.current) {
          audioPlay.current.currentTime = 0;
          audioPlay.current.play();
        }
      } else {
        if (audioPause.current) {
          audioPause.current.currentTime = 0;
          audioPause.current.play();
        }
      }
      return !r;
    });
  }

  function handleReset() {
    setSegundos(DURACOES[contexto]);
    setRodando(false);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 sm:px-0">
      <ul className="flex flex-wrap items-center justify-center gap-2 mb-4 text-base md:text-lg lg:text-xl">
        <li>
          <button
            data-contexto="foco"
            className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors border border-transparent ${contexto === "foco" ? "bg-blue-900 text-white font-bold" : "bg-transparent text-white hover:bg-blue-800/40"}`}
            onClick={() => handleContexto("foco")}
          >
            Foco
          </button>
        </li>
        <li>
          <button
            data-contexto="short"
            className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors border border-transparent ${contexto === "descanso-curto" ? "bg-green-700 text-white font-bold" : "bg-transparent text-white hover:bg-green-700/40"}`}
            onClick={() => handleContexto("descanso-curto")}
          >
            Descanso curto
          </button>
        </li>
        <li>
          <button
            data-contexto="long"
            className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors border border-transparent ${contexto === "descanso-longo" ? "bg-indigo-700 text-white font-bold" : "bg-transparent text-white hover:bg-indigo-700/40"}`}
            onClick={() => handleContexto("descanso-longo")}
          >
            Descanso longo
          </button>
        </li>
      </ul>

      <div id="timer" className="text-gray-900 dark:text-gray-100 text-center font-mono text-5xl md:text-6xl font-extrabold my-6 break-words w-full">
        {formatarTempo(segundos)}
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-2 mb-4 text-base md:text-lg">
        <li>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="alternar-musica"
              checked={musica}
              onChange={(e) => setMusica(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 relative transition-colors">
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:left-5"></div>
            </div>
          </label>
        </li>
        <li>
          <label htmlFor="alternar-musica" className="text-base text-gray-900 dark:text-gray-100 select-none">Música</label>
        </li>
      </ul>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-base md:text-lg">
        <button
          id="start-pause"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-purple-400 to-blue-900 text-white font-semibold text-base shadow-md hover:from-purple-500 hover:to-blue-800 transition"
          onClick={handleStartPause}
        >
          <i className={`bi ${rodando ? "bi-pause-fill" : "bi-play-fill"} w-5 h-5 text-xl`}></i>
          <span>{rodando ? "Pausar" : "Começar"}</span>
        </button>
        <button
          id="restart"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-purple-200 to-blue-400 text-blue-900 font-semibold text-base shadow-md hover:from-purple-300 hover:to-blue-500 transition"
          onClick={handleReset}
        >
          <i className="bi bi-arrow-clockwise w-5 h-5 text-xl"></i>
          <span>Reiniciar</span>
        </button>
      </div>
      <audio ref={audioMusica} loop />
      <audio ref={audioBeep} src={beepSound} />
      <audio ref={audioPlay} src={playSound} />
      <audio ref={audioPause} src={pauseSound} />
    </div>
  );
}
