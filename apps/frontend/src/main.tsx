import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ErrorBoundary } from "./app/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
