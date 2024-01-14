import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import LeftBar from "./components/leftBar";
import Mesa from "./pages/mesa";
import ListagemProdutos from "./pages/ListagemProdutos";
import PedirProduto from "./pages/pedirProduto";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<><LeftBar /><Outlet/></>}>
                <Route path="comanda/mesa" element={<Mesa />} />
                <Route path="listar/produtos/categoria/:categoria" element={<ListagemProdutos />} />
                <Route path="carregar/produto/:id_produto" element={<PedirProduto />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>

  )
}

export default App;
