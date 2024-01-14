import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import LeftBar from "./components/leftBar";
import Mesa from "./pages/mesa";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<><LeftBar /><Outlet/></>}>
                <Route path="comanda/mesa" element={<Mesa />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>

  )
}

export default App;
