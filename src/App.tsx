import { useState, useEffect } from "react";
import { ResumoJornada } from "./components/ResumoJornada";
import { ListaDeTurnos } from "./components/ListaDeTurnos";
import { CampoTempoDesejado } from "./components/CampoTempoDesejado";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { SectionDivider } from "./components/SectionDivider";
import { Footer } from "./components/Footer";
import { PomodoroCalculator } from "./components/PomodoroCalculator"; // <-- novo import

interface Turno {
  entrada: string;
  saida: string;
}

function parseHorario(horario: string): number | null {
  const partes = horario.split(":");
  if (partes.length !== 2) return null;
  const h = Number(partes[0]);
  const m = Number(partes[1]);
  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

function formatHorario(minutos: number): string {
  minutos = Math.round(minutos);
  minutos = minutos % (24 * 60);
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export default function App() {
  const [tema, setTema] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "light" || temaSalvo === "dark") {
      setTema(temaSalvo);
      document.documentElement.classList.toggle("dark", temaSalvo === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTema() {
    const novoTema = tema === "dark" ? "light" : "dark";
    setTema(novoTema);
    document.documentElement.classList.toggle("dark", novoTema === "dark");
    localStorage.setItem("tema", novoTema);
  }

  const [turnos, setTurnos] = useState<Turno[]>([{ entrada: "", saida: "" }]);
  const [tempoDesejadoHoras, setTempoDesejadoHoras] = useState<string>("6");
  const [tempoDesejadoMinutos, setTempoDesejadoMinutos] = useState<string>("0");
  const [usarPomodoro, setUsarPomodoro] = useState(false);

  function atualizarTurno(
    idx: number,
    campo: "entrada" | "saida",
    valor: string
  ) {
    const novos = [...turnos];
    novos[idx][campo] = valor;
    setTurnos(novos);
  }

  function adicionarTurno() {
    setTurnos([...turnos, { entrada: "", saida: "" }]);
  }

  function removerTurno(idx: number) {
    if (turnos.length > 1) {
      setTurnos(turnos.filter((_, i) => i !== idx));
    }
  }

  function calculaMinutosTrabalhados(): number {
    let soma = 0;
    for (const t of turnos) {
      const ent = parseHorario(t.entrada);
      const sai = parseHorario(t.saida);
      if (ent !== null && sai !== null && sai >= ent) {
        soma += sai - ent;
      }
    }
    return soma;
  }

  function calculaMinutosDesejados(): number {
    const horas = Number(tempoDesejadoHoras) || 0;
    const minutos = Number(tempoDesejadoMinutos) || 0;
    return horas * 60 + minutos;
  }

  function calculaHorarioFinal(): string | null {
    const totalTrabalhado = calculaMinutosTrabalhados();
    const tempoDesejadoMinutosTotal = calculaMinutosDesejados();
    if (
      isNaN(tempoDesejadoMinutosTotal) ||
      tempoDesejadoMinutosTotal <= totalTrabalhado
    ) {
      return null;
    }
    const faltam = tempoDesejadoMinutosTotal - totalTrabalhado;

    for (let i = turnos.length - 1; i >= 0; i--) {
      const ent = parseHorario(turnos[i].entrada);
      const sai = parseHorario(turnos[i].saida);
      if (ent !== null && (!turnos[i].saida || sai === null)) {
        return formatHorario(ent + faltam);
      }
      if (ent !== null && sai !== null && sai >= ent) {
        return formatHorario(sai + faltam);
      }
    }
    return null;
  }

  const horarioFinal = calculaHorarioFinal();
  const minutosTrabalhados = calculaMinutosTrabalhados();
  const tempoDesejadoMinutosTotal = calculaMinutosDesejados();

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div className="flex flex-col md:flex-row items-start justify-center w-full" >
      <div style={{ marginLeft: "10rem", marginRight: 0, padding: 0, flex: 1.5 }}>
        <Container>
          <Header tema={tema} toggleTema={toggleTema} />
          <CampoTempoDesejado
            tempoDesejadoHoras={tempoDesejadoHoras}
            tempoDesejadoMinutos={tempoDesejadoMinutos}
            setTempoDesejadoHoras={setTempoDesejadoHoras}
            setTempoDesejadoMinutos={setTempoDesejadoMinutos}
            usarPomodoro={usarPomodoro}
            setUsarPomodoro={setUsarPomodoro}
          />
          <ListaDeTurnos
            turnos={turnos}
            atualizarTurno={atualizarTurno}
            adicionarTurno={adicionarTurno}
            removerTurno={removerTurno}
          />
          <SectionDivider />
          <ResumoJornada
            minutosTrabalhados={minutosTrabalhados}
            horarioFinal={horarioFinal}
            tempoDesejadoMinutos={tempoDesejadoMinutosTotal}
          />
          <SectionDivider />
          <Footer />
        </Container>
      </div>
      {usarPomodoro && (
      <div style={{ marginRight: 0, padding: 0, flex: 2, justifyContent: "center" }}>
          <PomodoroCalculator />
        </div>
      )}
    </div>
    </div>
  );
}
