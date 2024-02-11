import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BtnVoltar from "../../../components/btnVoltar"
import ModalConfirmacao from "../../../components/modalConfirmacao"

function DetalhesMesa() {

    const navigate = useNavigate()
    const params = useParams()

    const [status, setStatus] = useState(false)
    function carregarMesas() {

        axios.get(`${process.env.REACT_APP_API}/selecionar/mesa/${localStorage.getItem("tokenCasa")}/${params.id_mesa}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    setStatus(resposta.data.mesa[0].status)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    function alterarStatusMesa(status) {

        const dados = {
            status: status
        }

        axios.put(`${process.env.REACT_APP_API}/alterar/status/${localStorage.getItem("tokenCasa")}/${params.id_mesa}`, dados)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    toast.success(resposta.data.message)
                    carregarMesas()
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }


    function carregarPedidosMesa() {

        axios.get(`${process.env.REACT_APP_API}/carregar/mesa/pedidosConcluidos/${localStorage.getItem("tokenCasa")}/${params.id_mesa}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    set_historico(resposta.data.pedidos)
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [historico, set_historico] = useState([])
    function carregarHistoricoMesa() {

        axios.get(`${process.env.REACT_APP_API}/load/mesa/pedidos/${localStorage.getItem("tokenCasa")}/${params.id_mesa}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    set_historico(resposta.data.pedidos)
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    function LimparMesa() {

        axios.put(`${process.env.REACT_APP_API}/limpa/mesa/${params.id_mesa}/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    toast.success(resposta.data.message)
                    document.querySelector("#ModallimparMesaBtn").click()
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [totalMesa, set_totalMesa] = useState("")
    function carregarTotalMesa() {

        axios.get(`${process.env.REACT_APP_API}/total/${params.id_mesa}/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    set_totalMesa(resposta.data.total[0].sum)
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    useEffect(function () {

        carregarMesas()
        carregarTotalMesa()
    }, [])




    return (
        <>
            <div className="col py-3">

                <BtnVoltar />

                <div className="text-center">
                    <i className="bi bi-table fs-4"></i>
                    <span className="d-block">Mesa {params.id_mesa}</span>
                </div>
                <hr />

                <br />

                <div className="form-check form-switch">
                    <label className="form-check-label" for="flexSwitchCheckChecked">Aberta</label>
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={status}
                        onChange={function (e) {

                            setStatus(e.target.checked)
                            alterarStatusMesa(e.target.checked)
                        }}
                    />
                </div>

                <p>Total da mesa: {totalMesa}</p>

                <button type="button" className="btn btn-link d-block m-auto">Gerar QR da mesa</button>
                <br />
                <div className="opcoes text-center">
                    <button type="button" id="btnHistorico" data-toggle="modal" data-target="#ModalHistorico" className="btn btn-secondary btn-sm"
                        onClick={function () {

                            carregarPedidosMesa()
                        }}>Pedidos</button>

                    <button type="button" className="btn btn-danger btn-sm me-1 ms-1"
                        onClick={function () {

                            document.querySelector("#ModallimparMesaBtn").click()
                        }}>Limpar</button>

                    <button type="button" id="btnHistorico" className="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalHistorico" onClick={function () {

                        carregarHistoricoMesa()
                    }}>Histórico</button>
                </div>

                <ModalConfirmacao mensagem={"Confirmar limpeza da mesa ?"} funcao={LimparMesa} mensagem_btn={"Confirmar"} parametro={""} idModal={"ModallimparMesa"} idBtnModal={"ModallimparMesaBtn"} data_target={"#ModallimparMesa"} />



                <div className="modal fade" id="ModalHistorico" tabIndex={-1} role="dialog" aria-labelledby="ModalHistoricoLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalHistoricoLabel">Pedidos da mesa</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col bg-secondary text-white">N°</div>
                                        <div className="col bg-secondary text-white">Total</div>
                                        <div className="col bg-secondary text-white">Por</div>
                                        <div className="col bg-secondary text-white">Ações</div>

                                        {historico.map(function (pedido) {

                                            return (
                                                <>
                                                    <div className="w-100"></div>
                                                    <div className="col border-bottom">{pedido.id_pedido}</div>
                                                    <div className="col border-bottom">{pedido.sum.toString().replace(".", ",")}</div>
                                                    <div className="col border-bottom overflow-auto text-nowrap">{pedido.cliente}</div>
                                                    <div className="col border-bottom">
                                                        <i className="bi bi-eye" onClick={function () {

                                                            document.querySelector("#btnHistorico").click()
                                                            navigate(`/visualizar/pedido/${pedido.id_pedido}/${pedido.status}`)
                                                        }}></i>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Voltar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DetalhesMesa