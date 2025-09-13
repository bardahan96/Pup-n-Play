import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DogProvider from "./DiegoApp/app/context/DogContext.jsx";
import UserProvider from "./DiegoApp/app/context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <DogProvider>
      <App />
    </DogProvider>
  </UserProvider>
);
