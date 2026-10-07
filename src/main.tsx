import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import AppErrorBoundary from "./components/AppErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
