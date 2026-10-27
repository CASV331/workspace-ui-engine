import { Component } from "react";

export class WindowErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("La ventana falló al renderizar", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center font-mono text-xs">
        <p>Esta ventana encontró un error.</p>
        <button
          type="button"
          className="cursor-pointer rounded border px-3 py-1 hover:opacity-80"
          onClick={this.props.onClose}
        >
          Cerrar ventana
        </button>
      </div>
    );
  }
}
