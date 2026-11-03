import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./provider/ThemeProvider";
import { App } from "./App";
import "./i18n/i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>{" "}
      <Toaster />
    </ThemeProvider>{" "}
  </StrictMode>,
);
console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
