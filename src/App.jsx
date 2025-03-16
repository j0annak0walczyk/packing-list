// eslint-disable-next-line no-unused-vars
import styles from "./App.module.css"; // this line is very ....
import AppNavContainer from "./components/AppNavContainer";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ToastProvider } from "./providers/ToastProvider";

export const App = () => {
  return (
    <ReactQueryProvider>
      <AppNavContainer />
      <ToastProvider />
    </ReactQueryProvider>
  );
};

export default App;
