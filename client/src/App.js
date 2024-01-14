import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import LeftBar from "./components/leftBar";
import Mesa from "./pages/mesa";
import ListagemProdutos from "./pages/ListagemProdutos";
import PedirProduto from "./pages/pedirProduto";
import ListaDeCategorias from "./pages/cadastros/categorias/listaDeCategorias";
import EditarCategoria from "./pages/cadastros/categorias/editar";
import CriarCategoria from "./pages/cadastros/categorias/criar";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<><LeftBar /><Outlet /></>}>
                <Route path="comanda/mesa" element={<Mesa />} />
                <Route path="listar/produtos/categoria/:categoria" element={<ListagemProdutos />} />
                <Route path="carregar/produto/:id_produto" element={<PedirProduto />} />
                <Route path="carregar/categorias/lista" element={<ListaDeCategorias />} />
                <Route path="formulario/categoria/criar" element={<CriarCategoria />} />
                <Route path="formulario/categoria/editar/:id_categoria" element={<EditarCategoria />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <ToastContainer />
    </>

  )
}

export default App;
