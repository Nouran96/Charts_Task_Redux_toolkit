import MainRoutes from "./routes";
import MainLayout from "./components/MainLayout";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <MainRoutes />
      </MainLayout>
    </Provider>
  );
}

export default App;
