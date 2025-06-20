import { TurnoInput } from "./TurnoInput";

interface Turno {
  entrada: string;
  saida: string;
}

interface Props {
  turnos: Turno[];
  atualizarTurno: (
    idx: number,
    campo: "entrada" | "saida",
    valor: string
  ) => void;
  adicionarTurno: () => void;
  removerTurno: (idx: number) => void;
}

export function ListaDeTurnos({
  turnos,
  atualizarTurno,
  adicionarTurno,
  removerTurno,
}: Props) {
  return (
    <>
      {turnos.map((turno, idx) => (
        <TurnoInput
          key={idx}
          turno={turno}
          idx={idx}
          atualizarTurno={atualizarTurno}
          adicionarTurno={adicionarTurno}
          removerTurno={removerTurno}
          totalTurnos={turnos.length}
        />
      ))}
    </>
  );
}
