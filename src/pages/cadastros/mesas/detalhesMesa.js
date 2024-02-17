import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BtnVoltar from "../../../components/btnVoltar"
import ModalConfirmacao from "../../../components/modalConfirmacao"
import qrcode from "qrcode"

function DetalhesMesa() {

    const navigate = useNavigate()
    const params = useParams()

    function chamarGarcom() {

        axios.put(`${process.env.REACT_APP_API}/chamado/false/${localStorage.getItem("tokenCasa")}/${params.id_mesa}/${sessionStorage.getItem("id_cliente")}`)
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

    const [status, setStatus] = useState(false)
    const [chamado, setChamado] = useState(true)
    const [num_mesa, set_num_mesa] = useState("")
    function carregarMesas() {

        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/selecionar/mesa/${localStorage.getItem("tokenCasa")}/${params.id_mesa}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    setStatus(resposta.data.mesa[0].status)
                    setChamado(resposta.data.mesa[0].chamado)
                    set_num_mesa(resposta.data.mesa[0].num_mesa)
                }
            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    function alterarStatusMesa(status) {

        const dados = {
            status: status
        }

        axios.put(`${process.env.REACT_APP_API}/alterar/status/${localStorage.getItem("tokenCasa")}/${params.id_mesa}/${sessionStorage.getItem("id_cliente")}`, dados)
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

        axios.get(`${process.env.REACT_APP_API}/carregar/mesa/pedidosConcluidos/${localStorage.getItem("tokenCasa")}/${params.id_mesa}/${sessionStorage.getItem("id_cliente")}`)
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

        axios.get(`${process.env.REACT_APP_API}/load/mesa/pedidos/${localStorage.getItem("tokenCasa")}/${params.id_mesa}/${sessionStorage.getItem("id_cliente")}`)
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

        axios.put(`${process.env.REACT_APP_API}/limpa/mesa/${params.id_mesa}/${localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
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

        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/total/${params.id_mesa}/${localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    set_carregando(true)
                    set_totalMesa(resposta.data.total[0].sum)
                }
                else {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    const [qr, set_qr] = useState("")
    const [hidden, set_hidden] = useState(false)
    function gerarQrdCode() {

        set_hidden(true)
        qrcode.toDataURL(`${process.env.REACT_APP_LINKQR}/${params.id_mesa}/${sessionStorage.getItem("token_acesso")}`)
            .then(function (qrcode64) {
                set_qr(qrcode64)

                document.querySelector("#leftBar").style = 'display: none'
                setTimeout(() => {
                    window.print()
                    document.querySelector("#leftBar").style = 'display: block'
                }, 1000)
            }).catch(function (erro) {

                set_hidden(false)
                toast.error(erro)
            })
    }

    const [carregando, set_carregando] = useState(true)

    useEffect(function () {

        carregarMesas()
        carregarTotalMesa()
    }, [])




    return (
        <>
            <div className="col py-3" >

                <div hidden={hidden}>
                    <BtnVoltar />


                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status" hidden={carregando}>

                        </div>
                    </div>

                    <div className="text-center">
                        <i className="bi bi-table fs-4"></i>
                        <span className="d-block">Mesa {num_mesa}</span>
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

                    <p>Total da mesa: {totalMesa != "" && totalMesa != null ? totalMesa.toString().replace(".", ",") : "00,00"}</p>


                    <button type="button" className="btn btn-link d-block m-auto" onClick={function () {
                        gerarQrdCode()
                    }}>Gerar QR da mesa</button>
                    <br />
                    <div className="opcoes text-center">
                        <button type="button" id="btnHistorico" data-toggle="modal" data-target="#ModalHistorico" className="btn btn-secondary btn-sm mb-1"
                            onClick={function () {

                                carregarPedidosMesa()
                            }}>Pedidos</button>

                        <button type="button" className="btn btn-danger btn-sm me-1 ms-1 mb-1"
                            onClick={function () {

                                document.querySelector("#ModallimparMesaBtn").click()
                            }}>Limpar</button>

                        <button type="button" id="btnHistorico" className="btn btn-success btn-sm me-1 mb-1" data-toggle="modal" data-target="#ModalHistorico" onClick={function () {

                            carregarHistoricoMesa()
                        }}>Histórico</button>

                        <button hidden={chamado == false ? true : false} type="button" className="btn btn-primary btn-sm me-1 mb-1"
                            onClick={function () {
                                chamarGarcom()
                            }}>Atendido</button>
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

                <div className="pt-2 pb-2 imgQrcode text-center" hidden={qr == "" ? true : false}>

                    <img src={qr} alt="" className="d-block m-auto" />
                    <p>Mesa {params.id_mesa}</p>
                </div>
            </div>


        </>
    )
}

export default DetalhesMesa