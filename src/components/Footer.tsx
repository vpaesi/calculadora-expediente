export function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        Aplicação desenvolvida por{" "}
        <a
          href="https://vitoria-de-camargo.vercel.app/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vitória de Camargo
        </a>
        . Código fonte disponível no{" "}
        <a
          href="https://github.com/vpaesi/calculadora-expediente"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
        Pomodoro ib:{" "}
        <a
          href="https://krjorn.github.io/fokus/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fokus
        </a>
        .
      </p>
      <p className="mt-2">
        v. 2.0.0 released 18-07-2025.
      </p>
    </footer>
  );
}
