import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./css/style.css";
import "./css/satoshi.css";

import QueryProvider from "./config/provider/query-provider.tsx";
import { ToasterConfig } from "./config/toast-config.tsx";
import Routes from "./routes/routes.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ToasterConfig />
      <Suspense fallback="loading...">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Suspense>
    </QueryProvider>
  </StrictMode>
);
