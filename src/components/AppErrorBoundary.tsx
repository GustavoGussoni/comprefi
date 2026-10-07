import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/** Não tenta reparar um DOM alterado por tradutores ou extensões; oferece uma saída visível. */
export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Falha ao exibir a CompreFi:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main
        role="alert"
        className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white"
      >
        <div className="max-w-lg rounded-2xl border border-white/15 bg-zinc-900 p-8 shadow-lg">
          <h1 className="text-2xl font-semibold">
            Não foi possível exibir esta página
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Se a tradução automática estiver ativada, selecione “Mostrar
            original” no navegador. Depois, recarregue a página.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Recarregar não apaga os dados de simulação já salvos neste
            navegador.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#FF6100] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e85900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Recarregar página
          </button>
        </div>
      </main>
    );
  }
}
