import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import qrcode from "qrcode"
import ModalConfirmacao from "../../../components/modalConfirmacao";

function ListagemMesas() {
    const navigate = useNavigate()

    const [mesas, set_mesas] = useState([])
    function criarMesa() {
        set_carregando(false)
        axios.post(`${process.env.REACT_APP_API}/criar/mesa/${localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    set_carregando(true)
                    toast.success(resposta.data.message)
                    carregarMesas()
                    document.querySelector("#btnModalCriar").click()
                }
                else {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                    document.querySelector("#btnModalCriar").click()
                }
            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
                document.querySelector("#btnModalCriar").click()
            })
    }

    function carregarMesas() {

        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/selecionar/mesas/${localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    set_mesas(resposta.data.mesas)
                }
            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    const [qrs, set_qrs] = useState([])
    const [hidden, set_hidden] = useState(false)
    function gerarQrdCodes() {
        set_hidden(true)

        Promise.all(mesas.map(async function (mesa) {

            return await qrcode.toDataURL(`${process.env.REACT_APP_LINKQR}/${mesa.num_mesa}/${sessionStorage.getItem("token_acesso")}`)
                .catch(function (erro) {

                    set_hidden(false)
                    toast.error(erro)
                })
        })).then(function (qrcodes64) {
            // qrcodes64 contém todos os qrcodes64 gerados
            set_qrs(qrcodes64)

            // Esconde o elemento #leftBar
            document.querySelector("#leftBar").style.display = 'none'

            setTimeout(() => {
                window.print()
                // Exibe novamente o elemento #leftBar após a impressão
                document.querySelector("#leftBar").style.display = 'block'
            }, 1000)
        })
    }

    const [carregando, set_carregando] = useState(true)

    useEffect(function () {

        set_carregando(false)
        setTimeout(function () {
            carregarMesas()
        }, 1000)
    }, [])



    return (
        <>
            <div className="col py-3">
                <div hidden={hidden}>

                    <div className="d-flex">
                        <button className="btn btn-secondary d-block me-1" onClick={function(){

                            document.querySelector("#btnModalCriar").click()
                        }}>Mesa <i className="bi bi-plus-circle"></i></button>
                        <button className="btn btn-warning d-block" onClick={gerarQrdCodes}>QRcodes <i className="bi bi-printer"></i></button>
                        <small className="p-1">v1.0.0</small>
                    </div>
                    <br />

                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status" hidden={carregando}>

                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            {mesas.map(function (mesa) {

                                return (
                                    <>
                                        <div className={mesa.qtdnao_pronto > 0 ? "col border text-center bg-warning" : mesa.status == true && mesa.chamado == false ? "col border text-center bg-success" : mesa.status == false && mesa.chamado == false ? "col border text-center bg-danger" : "col border text-center bg-primary"} onClick={function () {
                                            navigate(`/visualizar/detalhes/mesa/${mesa.id_mesa}`)
                                        }}>

                                            <i className="bi bi-table fs-4 text-white d-block"></i>
                                            <span className="text-white">{mesa.num_mesa}</span>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="pt-2 pb-2 imgQrcode text-center" hidden={qrs.length === 0 ? true : false}>
                    {qrs.map(function (qr, index) {

                        // Acessando a mesa correspondente pelo índice
                        const mesa = mesas[index]
                        return (
                            <div key={index}>
                                <img src={qr} alt="" className="d-block m-auto" />
                                <p>Mesa {mesa.num_mesa}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
            <ModalConfirmacao mensagem={"Criar nova mesa ?"} mensagem_btn={"Criar"} funcao={criarMesa} parametro={""} idBtnModal={"btnModalCriar"} data_target={"#modalConfirmar"} idModal={"modalConfirmar"}/>
        </>
    )
}

export default ListagemMesas