
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"



function ListagemPendentes() {

    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    const [pedidos, set_pedidos] = useState([])
    function carregarPedidosPendentes() {
        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/all/pedidos/pendentes/${localStorage.getItem("tokenCasa")}/PENDENTE`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {
                    set_carregando(true)
                    set_pedidos(resposta.data.pedidos)
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

    useEffect(function () {

        carregarPedidosPendentes()
    }, [])

    return (
        <>
            <div className="col py-3">

                <div className="text-center">
                    <i>Pedidos Pendentes</i>
                </div>
                <hr />

                <br />

                <form className="form-inline d-flex">
                    <input className="form-control mr-sm-2 m-1" type="search" placeholder="Buscar por mesa" aria-label="Search" />
                </form>

                <br />

                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" hidden={carregando}>

                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col bg-secondary text-white">Pedido</div>
                        <div className="col bg-secondary text-white">Mesa</div>
                        <div className="col bg-secondary text-white">Ações</div>
                        <div className="w-100"></div>
                        {pedidos.map(function (pedido) {

                            return (
                                <>


                                    <div className="col border-bottom">{pedido.id_pedido}</div>
                                    <div className="col border-bottom">{pedido.mesa}</div>
                                    <div className="col border-bottom">

                                        <i className="bi bi-trash" onClick={function () {

                                        }}></i>

                                        <i className="bi bi-pencil-square" onClick={function () {
                                            navigate("/visualizar/pedido/1/PENDENTE")
                                        }}></i>
                                    </div>

                                </>
                            )
                        })}
                    </div >
                </div>
            </div>
        </>
    )
}

export default ListagemPendentes