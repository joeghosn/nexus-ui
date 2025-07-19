import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./store/store";
import { ToastProvider } from "./components/Toast";
import { ToastContextProvider } from "./hooks/use-toast";
import "./index.css";
import App from "./App.tsx";
import AppErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AppErrorBoundary>
        <Provider store={store}>
          <ToastContextProvider>
            <ToastProvider>
              {/* Global SEO defaults */}
              <Helmet>
                <meta charSet="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                  name="apple-mobile-web-app-status-bar-style"
                  content="black-translucent"
                />

                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin="anonymous"
                />

                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/apple-touch-icon.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicon-32x32.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
              </Helmet>
              <App />
            </ToastProvider>
          </ToastContextProvider>
        </Provider>
      </AppErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);
