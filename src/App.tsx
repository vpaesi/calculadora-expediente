import { useState, useEffect } from "react";
import { ResumoJornada } from "./components/ResumoJornada";
import { ListaDeTurnos } from "./components/ListaDeTurnos";
import { CampoTempoDesejado } from "./components/CampoTempoDesejado";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { SectionDivider } from "./components/SectionDivider";
import { Footer } from "./components/Footer";

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
  const [tempoDesejado, setTempoDesejado] = useState<string>("6");

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

  function calculaHorarioFinal(): string | null {
    const totalTrabalhado = calculaMinutosTrabalhados();
    const tempoDesejadoMinutos = Number(tempoDesejado) * 60;
    if (
      isNaN(tempoDesejadoMinutos) ||
      tempoDesejadoMinutos <= totalTrabalhado
    ) {
      return null;
    }
    const faltam = tempoDesejadoMinutos - totalTrabalhado;

    // Procura se há um turno em aberto (entrada preenchida e saída vazia)
    for (let i = turnos.length - 1; i >= 0; i--) {
      const ent = parseHorario(turnos[i].entrada);
      const sai = parseHorario(turnos[i].saida);
      if (ent !== null && (!turnos[i].saida || sai === null)) {
        // Usuário está no meio de um turno, sugira a saída
        return formatHorario(ent + faltam);
      }
      if (ent !== null && sai !== null && sai >= ent) {
        // Último turno completo, continue lógica padrão
        return formatHorario(sai + faltam);
      }
    }

    // Se não encontrou nenhum horário válido, retorna null
    return null;
  }

  const horarioFinal = calculaHorarioFinal();
  const minutosTrabalhados = calculaMinutosTrabalhados();

  return (
    <Container>
      <Header tema={tema} toggleTema={toggleTema} />
      <CampoTempoDesejado
        tempoDesejado={tempoDesejado}
        setTempoDesejado={setTempoDesejado}
      />
      <ListaDeTurnos
        turnos={turnos}
        atualizarTurno={atualizarTurno}
        adicionarTurno={adicionarTurno}
        removerTurno={removerTurno} // <-- Passe aqui!
      />
      <SectionDivider />
      <ResumoJornada
        minutosTrabalhados={minutosTrabalhados}
        horarioFinal={horarioFinal}
        tempoDesejado={tempoDesejado}
      />
      <SectionDivider />
      <Footer />
    </Container>
  );
}
