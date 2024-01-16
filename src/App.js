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
import ListagemPendentes from './pages/cadastros/pedidos/pendentes/listagemPendentes';
import VisualizarPedidoPendente from './pages/cadastros/pedidos/pendentes/pedidoPendente/visualizar';
import ListagemPedidosProcessando from './pages/cadastros/pedidos/processando/listagem';
import ListagemPedidosConcluido from './pages/cadastros/pedidos/concluido/listagem';
import ListagemMesas from './pages/cadastros/mesas/listagemMesas';
import DetalhesMesa from './pages/cadastros/mesas/detalhesMesa';

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
                <Route path="visualizar/pedidos/pendentes" element={<ListagemPendentes />} />
                <Route path="visualizar/pedido/:id_pedido/:status" element={<VisualizarPedidoPendente />} />
                <Route path="visualizar/pedidos/processando" element={<ListagemPedidosProcessando />} />
                <Route path="visualizar/pedidos/concluido" element={<ListagemPedidosConcluido />} />
                <Route path="visualizar/mesas" element={<ListagemMesas />} />
                <Route path="visualizar/detalhes/mesa/:id_mesa" element={<DetalhesMesa />} />
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
