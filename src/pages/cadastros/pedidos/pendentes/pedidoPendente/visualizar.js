import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from "react"
import BtnVoltar from "../../../../../components/btnVoltar"

function VisualizarPedidoPendente() {

    //controle modal
    const [show, setShow] = useState(false)

    //params
    const params = useParams()

    const [cancelamento, setcancelamento] = useState(false)

    const navigate = useNavigate()

    function updatePedido(status) {

    }

    return (
        <>
            <div className="col py-3">

                <BtnVoltar/>


                <div className="float-right text-end">
                    <button disabled={params.status == "CONCLUIDO" ? true : false} className="btn btn-danger" onClick={function () {
                        setcancelamento(true)
                        setShow(true)
                    }}>cancelar</button>
                </div>
                <br />
                <form className="form-inline" onSubmit={function (e) {
                    e.preventDefault()
                    setShow(true)
                }}>

                    <div className="container">
                        <div className="row">
                            <div className="col bg-secondary text-white">Produto</div>
                            <div className="col bg-secondary text-white">Qtd</div>
                            <div className="col bg-secondary text-white">Obs</div>
                            <div className="w-100"></div>
                            <div className="col border-bottom">Lanche duble bacon</div>
                            <div className="col border-bottom">2</div>
                            <div className="col border-bottom"><i className="bi bi-eye" onClick={function () {
                                alert("Visualizar as observações do produto")
                                {/*se houver obs renderiza btn se não nao */ }
                            }}></i>
                            </div>
                        </div>
                    </div>

                    <br />
                    <button disabled={params.status == "CONCLUIDO" ? true : false} className="btn btn-secondary m-auto d-block">{params.status == "PENDENTE" ? "Processar" : params.status == "PROCESSANDO" ? "Concluir" : "Finalizado"}</button>
                </form>

            </div>

            {/**MODAL CONFIRMAR ATUALIZAÇÃO */}
            <Modal show={show} onHide={function () {
                setShow(false)
                setcancelamento(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center"><i className="bi bi-question-lg"></i></p>
                    <p className="text-center">{cancelamento == true ? "Atualizar pedido para status: CANCELADO ? " : params.status == "PENDENTE" ? "Atualizar pedido para status: PROCESSANDO ?" : params.status == "PROCESSANDO" ? "Atualizar pedido para status: CONCLUIDO ?" : ""}</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button size="sm" variant="danger" onClick={function () {
                        setShow(false)
                        setcancelamento(false)
                    }}>
                        Cancelar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={function () {

                        if (cancelamento == true) {
                            updatePedido("CANCELADO")
                        }
                        else if (params.status == "PENDENTE") {
                            updatePedido("PROCESSANDO")
                        }
                        else if (params.status == "PROCESSANDO") {
                            updatePedido("CONCLUIDO")
                        }
                    }}>
                        Atualizar
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VisualizarPedidoPendente