import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/css/satoshi.css";
import "./assets/css/style.css";
import "rsuite/dist/rsuite.min.css";

import QueryProvider from "./config/provider/query-provider.tsx";
import { ToasterConfig } from "./config/toast-config.tsx";
import Routes from "./routes/routes.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";
import "./config/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ToasterConfig />
      <Suspense fallback="loading...">
        <BrowserRouter>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </QueryProvider>
  </StrictMode>
);
