
import { useNavigate } from "react-router-dom"


function ListagemPedidosProcessando() {

    const navigate = useNavigate()

    return (
        <>
            <div className="col py-3">

                <div className="text-center">
                    <i className="px-3">Pedidos em Processamento</i>
                </div>
                <hr />

                <br />

                <form className="form-inline d-flex">
                    <input className="form-control mr-sm-2 m-1" type="search" placeholder="Buscar por mesa" aria-label="Search" />
                    <button className="btn btn-secondary m-1" type="submit">
                        <span className="iconify" data-icon="material-symbols:search"></span>
                    </button>
                </form>

                <br />

                <div className="container">
                    <div className="row">
                        <div className="col bg-secondary text-white">Pedido</div>
                        <div className="col bg-secondary text-white">Mesa</div>
                        <div className="col bg-secondary text-white">Ações</div>
                        <div className="w-100"></div>
                        <div className="col border-bottom">1</div>
                        <div className="col border-bottom">Mesa 1</div>
                        <div className="col border-bottom">
                            <i className="bi bi-trash" onClick={function () {

                            }}></i>

                            <i className="bi bi-pencil-square" onClick={function () {

                            }}></i>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListagemPedidosProcessando