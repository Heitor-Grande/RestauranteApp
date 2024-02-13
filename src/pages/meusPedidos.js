import { useNavigate } from "react-router-dom"
import BtnVoltar from "../components/btnVoltar"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import ModalConfirmacao from "../components/modalConfirmacao"

function MeusPedidos() {

    const [pedidos, set_pedidos] = useState([])
    function carregarPedidosDaMesa() {

        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/carregar/pedidos/${sessionStorage.getItem("id_mesa")}/${sessionStorage.getItem("tokenCliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    set_pedidos(resposta.data.pedidos)
                }

            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    const [detalhes, set_detalhes] = useState([])
    function carregarPedidoDetalhe(id_pedido) {

        axios.get(`${process.env.REACT_APP_API}/carregar/detalhes/${id_pedido}/${sessionStorage.getItem("tokenCliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    set_detalhes(resposta.data.detalhes)
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [id_detalhe, set_id_detalhe] = useState("")
    const [id_pedido, set_id_pedido] = useState("")

    function deletarDetalhe(id_detalhe, id_pedido) {

        axios.get(`${process.env.REACT_APP_API}/deleta/detalhe/${id_detalhe}/${sessionStorage.getItem("tokenCliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                    //carregarPedidoDetalhe(id_pedido)
                    carregarPedidosDaMesa()
                    document.querySelector("#ModalConfirmacaoBtn").click()
                }
                else {

                    toast.success(resposta.data.message)
                    carregarPedidosDaMesa()
                    //carregarPedidoDetalhe(id_pedido)
                    document.querySelector("#ModalConfirmacaoBtn").click()
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }


    function enviar_cozinha(id_pedido) {

        axios.put(`${process.env.REACT_APP_API}/atualizar/status/${id_pedido}/${sessionStorage.getItem("tokenCliente")}/${sessionStorage.getItem("id_mesa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    toast.success(resposta.data.message)
                    carregarPedidosDaMesa()
                    document.querySelector("#ModalEnviarBtn").click()
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [carregando, set_carregando] = useState(true)

    useEffect(function () {

        carregarPedidosDaMesa()
    }, [])

    return (
        <>
            <div className="col py-3">

                <BtnVoltar />

                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" hidden={carregando}>

                    </div>
                </div>

                {

                    pedidos.length > 0 ? pedidos.map(function (pedido) {

                        return (
                            <>
                                <div className="card">
                                    <div className="card-body">

                                        <div className="d-flex">
                                            <h4 className="card-title">Pedido #{pedido.id_pedido} - <button type="button" className="border-0 bg-white" data-toggle="modal" data-target="#detalhesPedido">
                                                <i className="bi bi-pencil-square fs-4" onClick={function () {
                                                    carregarPedidoDetalhe(pedido.id_pedido)
                                                }}></i>
                                            </button></h4>

                                        </div>
                                        {/*<h6 className="card-subtitle mb-2 text-muted">Status: <i>Pendente</i></h6> */}
                                        <h6 className="card-subtitle mb-2 text-muted">Total: R${pedido.soma_pedido.toString().replace(".", ",")}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">Pedido de: <b>{pedido.cliente}</b></h6>
                                        <h6 className="card-subtitle mb-2 text-muted">Status: <b>{pedido.status}</b></h6>

                                        <br />

                                        <button hidden={pedido.status == "MONTANDO" ? false : true}
                                            type="button" className="btn btn-secondary w-100" id="ModalEnviarBtn"
                                            data-toggle="modal" data-target="#ModalEnviar">Enviar para cozinha</button>
                                    </div>
                                </div>
                                <br />
                            </>
                        )
                    }) : <>
                        <div className="text-center">
                            <i className="px-3">Nenhum pedido feito.</i>
                        </div>
                        <hr />
                    </>
                }


                {/*MODAL DETALHE PEDIDO */}
                <div className="modal fade" id="detalhesPedido" tabIndex={-1} role="dialog" aria-labelledby="detalhesPedidoLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="detalhesPedidoLabel">Editar Pedido</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {detalhes.map(function (detalhe) {

                                    return (
                                        <>
                                            <div className="prod text-center">
                                                <b><i>{detalhe.qtd} - {detalhe.produto}</i> - <i className="bi bi-trash" onClick={function () {

                                                    set_id_detalhe(detalhe.id_pedido_detalhe)
                                                    set_id_pedido(detalhe.id_pedido)

                                                    document.querySelector("#ModalConfirmacaoBtn").click()
                                                    document.querySelector("#detalhesPedido").click()
                                                }}></i></b>
                                                <i className="d-block">Valor und: R${detalhe.valor_und.toString().replace(".", ",")}</i>
                                                <i className="d-block">Total: R${detalhe.total.toString().replace(".", ",")}</i>
                                                <div className="pt-2"></div>
                                            </div>
                                            <br />
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>


                <ModalConfirmacao mensagem='Excluir o produto do pedido ?' funcao={deletarDetalhe} parametro={[id_detalhe, id_pedido]} mensagem_btn='Excluir' />
                <ModalConfirmacao mensagem='Enviar pedido para cozinha ?' funcao={enviar_cozinha} parametro={[]} mensagem_btn='Enviar' idModal={"ModalEnviar"} idBtnModal={"ModalEnviarBtn"} data_target={"#ModalEnviar"} />
            </div>
        </>
    )
}

export default MeusPedidos

