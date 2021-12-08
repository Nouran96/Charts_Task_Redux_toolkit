import MainRoutes from "./routes";
import MainLayout from "./components/MainLayout";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainLayout>
          <MainRoutes />
        </MainLayout>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
