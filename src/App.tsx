
import "./styles/tailwind.css";
import "deo/Tailwind";
import { ThemeProvider } from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
