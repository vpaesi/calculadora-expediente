import { useState } from "react";
import { PomodoroTimer } from "./PomodoroTimer";
import { PomodoroTaskList } from "./PomodoroTaskList";

export type PomodoroContext = "foco" | "descanso-curto" | "descanso-longo";

export default function PomodoroApp() {
  const [contexto, setContexto] = useState<PomodoroContext>("foco");
  const [musica, setMusica] = useState(false);

  return (
    <main className="w-full flex flex-col items-center">
      <section className="flex justify-center w-full">
        <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg p-6 mt-8 w-full max-w-lg">
          <PomodoroTimer
            contexto={contexto}
            setContexto={setContexto}
            musica={musica}
            setMusica={setMusica}
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <PomodoroTaskList />
      </section>
    </main>
  );
}
