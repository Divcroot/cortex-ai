import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import useCurrentUser from "./hooks/useCurrentUser";
import NotFound from "./pages/NotFound";

const App = () => {
  useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
