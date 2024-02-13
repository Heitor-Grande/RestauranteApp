import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from "react"
import BtnVoltar from "../../../../../components/btnVoltar"
import axios from "axios"
import { toast } from "react-toastify"
import ModalConfirmacao from "../../../../../components/modalConfirmacao"

function VisualizarPedidoPendente() {

    //params
    const params = useParams()

    const navigate = useNavigate()

    const [detalhes, set_detalhes] = useState([])
    function carregarPedidoDetalhe(id_pedido) {

        axios.get(`${process.env.REACT_APP_API}/carregar/detalhes/${id_pedido}/${localStorage.getItem("tokenCasa")}`)
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

    function updatePedido(id_pedido, status) {

        axios.put(`${process.env.REACT_APP_API}/att/pedidos/stt/${localStorage.getItem("tokenCasa")}/${status}/${id_pedido}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    if (status == 'CANCELADO') {

                        document.querySelector("#ModalCancelarBtn").click()
                    }
                    else {

                        document.querySelector("#ModalConfirmacaoBtn").click()
                    }
                    toast.success(resposta.data.message)
                    navigate(-1)
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [statusAtualizar, set_statusAtualizar] = useState("")

    useEffect(function () {

        carregarPedidoDetalhe(params.id_pedido)
    }, [])

    return (
        <>
            <div className="col py-3">

                <BtnVoltar />


                <div className="float-right text-end">
                    <button hidden={params.status == "CONCLUIDO" || params.status == "CANCELADO" || params.status == "MONTANDO" ? true : false} className="btn btn-danger" onClick={function () {

                        set_statusAtualizar("CANCELADO")
                        document.querySelector("#ModalCancelarBtn").click()
                    }}>CANCELAR</button>
                </div>
                <br />
                <form className="form-inline" onSubmit={function (e) {
                    e.preventDefault()
                }}>

                    <div className="container">
                        <div className="row">
                            <div className="col bg-secondary text-white">Produto</div>
                            <div className="col bg-secondary text-white">Qtd</div>
                            <div className="col bg-secondary text-white">Obs</div>
                            <div className="w-100"></div>
                            {detalhes.map(function (detalhe) {

                                return (
                                    <>
                                        <div className="col border-bottom">{detalhe.produto}</div>
                                        <div className="col border-bottom">{detalhe.qtd}</div>
                                        <div className="col border-bottom"><i className={detalhe.obs != "" && detalhe.obs != null ? "bi bi-eye" : ""} onClick={function () {
                                            alert(`${detalhe.obs || "Sem observações"}`)
                                            {/*se houver obs renderiza btn se não nao */ }
                                        }}></i>
                                        </div>
                                        <div className="w-100"></div>
                                    </>
                                )
                            })}
                        </div>
                    </div>

                    <br />
                    <button disabled={params.status == "CONCLUIDO"  || params.status == "CANCELADO" || params.status == "MONTANDO" ? true : false} className="btn btn-secondary m-auto d-block" onClick={function () {

                        set_statusAtualizar(params.status == "PENDENTE" ? "PROCESSANDO" : params.status == "PROCESSANDO" ? "CONCLUIDO" : "")
                        document.querySelector("#ModalConfirmacaoBtn").click()
                    }}>
                        {params.status == "PENDENTE" ? "PROCESSAR" : params.status == "PROCESSANDO" ? "CONCLUIR" : params.status == "MONTANDO" ? "MONTANDO" : "CANCELADO"}</button>
                </form>

            </div>

            <ModalConfirmacao mensagem={`Atualizar pedido para status: ${statusAtualizar} ?`} funcao={updatePedido} mensagem_btn={"Atualizar"} parametro={[params.id_pedido, statusAtualizar]} />
            <ModalConfirmacao mensagem={`Atualizar pedido para status: ${statusAtualizar} ?`} funcao={updatePedido} mensagem_btn={"Atualizar"} parametro={[params.id_pedido, statusAtualizar]} idModal={'ModalCancelar'} idBtnModal={'ModalCancelarBtn'} data_target={'#ModalCancelar'} />
        </>
    )
}

export default VisualizarPedidoPendente