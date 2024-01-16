import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { GrFormView } from "react-icons/gr";

function ListagemPedidosConcluido() {

    const navigate = useNavigate()

    return (
        <>
            <div className="col py-3">

                <div className="text-center">
                    <i className="px-3">Pedidos Concluidos</i>
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
                            <MdDeleteForever onClick={function () {
                                alert("deletar")
                            }} />

                            <GrFormView onClick={function () {
                                navigate("/visualizar/pedido/1/CONCLUIDO")
                            }} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListagemPedidosConcluido