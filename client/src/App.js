import { BrowserRouter, Routes, Route } from "react-router-dom"
import LeftBar from "./pages/leftBar";
import Mesa from "./pages/mesa";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LeftBar />}>
          <Route path="comanda/mesa" element={<Mesa />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
