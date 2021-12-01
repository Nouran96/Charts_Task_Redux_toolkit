import React from "react";
import MainRoutes from "./routes";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <MainLayout>
      <MainRoutes />
    </MainLayout>
  );
}

export default App;
