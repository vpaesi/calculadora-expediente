export function formatarTempo(seg: number) {
  const m = Math.floor(seg / 60)
    .toString()
    .padStart(2, "0");
  const s = (seg % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function formatarHorasMinutos(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h > 0 && m > 0) return `${h}h e ${m}min`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
}
