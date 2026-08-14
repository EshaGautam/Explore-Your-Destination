import { BrowserRouter, Routes, Route } from "react-router-dom";
// Force refresh of imports


import Explore from "./pages/Explore/Explore.tsx";
import Destination from "./pages/Destination/Destination.tsx";
import Discovery from "./pages/Discovery/Discovery.tsx";

function App() {
  return (
    <BrowserRouter>
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