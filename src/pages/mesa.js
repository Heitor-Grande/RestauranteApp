
import { useEffect, useState } from "react"
import BtnPedidos from "../components/buttonPedido"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Mesa() {

    const navigate = useNavigate()

    const [totalMesa, set_totalMesa] = useState("")
    function carregarTotalMesa() {

        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/total/${sessionStorage.getItem("id_mesa")}/${sessionStorage.getItem("tokenCliente")}`)
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

    function chamarGarcom() {

        axios.put(`${process.env.REACT_APP_API}/chamado/true/${sessionStorage.getItem("tokenCliente")}/${sessionStorage.getItem("id_mesa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    toast.success(resposta.data.message)
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

        carregarTotalMesa()
    }, [])

    return (
        <>

            <div className="col py-3">
                <div className="card h-50">

                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status" hidden={carregando}>

                        </div>
                    </div>

                    <div className="card-body">
                        <div id="carouselExampleInterval" className="carousel slide p-2 h-100" data-bs-ride="carousel">
                            <div className="carousel-inner h-100">
                                <div className="h-100 carousel-item bg-secondary active p-2" data-bs-interval="5000">
                                    <div className="p-1 text-center bg-white h-100">
                                        <p>Precisa de algo ?</p>
                                        <p>Chame um de nossos gaçons!</p>

                                        <button type="button" className="btn btn-secondary btn-sm w-75 mt-3 p-1" onClick={function () {
                                            chamarGarcom()
                                        }}>
                                            <i className="bi bi-info-circle"></i>
                                            <label htmlFor="" className="w-100">Chamar</label>
                                        </button>
                                    </div>
                                </div>
                                <div className="h-100 carousel-item bg-secondary p-2" data-bs-interval="5000">
                                    <div className="p-1 text-center bg-white h-100">
                                        <p>Total da Mesa</p>

                                        <button type="button" className="btn btn-secondary btn-sm w-75 mt-3 p-1">
                                            <i className="bi bi-wallet"></i>
                                            <label htmlFor="" className="w-100">R${totalMesa != "" && totalMesa != null ? totalMesa.toString().replace(".", ",") : "00,00"}</label>
                                        </button>
                                    </div>
                                </div>
                                <div className="h-100 carousel-item bg-secondary p-2" data-bs-interval="5000">
                                    <div className="p-1 text-center bg-white h-100">
                                        <p>Detalhes dos pedidos</p>

                                        <button type="button" className="btn btn-secondary btn-sm w-75 mt-3 p-1" onClick={function () {

                                            if (sessionStorage.getItem("id_mesa") != "" && sessionStorage.getItem("id_mesa") != " " && sessionStorage.getItem("id_mesa") != null && sessionStorage.getItem("id_mesa") != undefined) {

                                                navigate(`/meus/pedidos/${sessionStorage.getItem("id_mesa")}`)
                                            }
                                            else {

                                                toast.error("Nenhuma mesa vinculada.")
                                                navigate("/ler/novamente/qr/code")
                                            }
                                        }}>
                                            <i className="bi bi-card-checklist"></i>
                                            <label htmlFor="" className="w-100">Ver pedidos</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next text-dark" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <BtnPedidos />
            </div>

        </>
    )
}

export default Mesa