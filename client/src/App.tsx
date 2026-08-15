import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Explore from "./pages/Explore/Explore.tsx";
import Destination from "./pages/Destination/Destination.tsx";
import Discovery from "./pages/Discovery/Discovery.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route
          path="/destination/:name"
          element={<Destination />}
        />
        <Route
          path="/discover"
          element={<Discovery />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;