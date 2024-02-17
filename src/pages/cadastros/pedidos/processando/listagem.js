
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

function ListagemPedidosProcessando() {

    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    const [pedidos, set_pedidos] = useState([])
    function carregarPedidoS() {
        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/all/pedidos/pendentes/${localStorage.getItem("tokenCasa")}/PROCESSANDO/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {
                    set_carregando(true)
                    set_pedidos(resposta.data.pedidos)
                    set_pedidoListaFormatada(resposta.data.pedidos)
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


    //PESQUISA
    const [busca, set_busca] = useState("")
    const [pedidosListaFormatada, set_pedidoListaFormatada] = useState([])
    function search(string) {


        set_busca(string)

        if (string == "") {

            carregarPedidoS()
            set_paginaAtual(1)
        }
        else {

            const search_formatada = string.toString()

            const encontrados = pedidosListaFormatada.filter(function (pedido) {

                const pedido_formatada = pedido.id_pedido.toString().toLowerCase()

                return pedido_formatada.includes(search_formatada)
            })

            set_pedidoListaFormatada(encontrados)
            set_ultimaPagina(Math.round(pedidosListaFormatada.length / 10))
        }
    }

    //PAGINAÇÃO
    const [paginaAtual, set_paginaAtual] = useState("")
    const [ultimaPagina, set_ultimaPagina] = useState("")

    function paginacao(pgAtual) {

        //controle de paginação
        const itens_por_pagina = 10


        const indice_inicial = (pgAtual - 1) * itens_por_pagina
        const indice_final = indice_inicial + itens_por_pagina

        const categorias_da_pagina = busca == "" ? pedidos.slice(indice_inicial, indice_final) : pedidosListaFormatada.slice(indice_inicial, indice_final)

        if (categorias_da_pagina.length == 0 && pgAtual != 1) {

            toast.error("Fim da lista.")
        }
        else {

            set_pedidoListaFormatada(categorias_da_pagina)
        }

        //CALCULANDO A ULTIMA PAGINA
        if (busca == "") {

            set_ultimaPagina(Math.round(pedidos.length / 10))
        }
        else {

            set_ultimaPagina(Math.round(pedidosListaFormatada.length / 10))
        }

    }

    useEffect(function () {

        carregarPedidoS()
        set_paginaAtual(1)
    }, [])

    useEffect(function () {

        paginacao(1)
    }, [pedidos])

    return (
        <>
            <div className="col py-3">

                <div className="text-center">
                    <i className="px-3">Pedidos em Processamento</i>
                </div>
                <hr />

                <br />

                <nav className="navbar navbar-light bg-light d-block">
                    <form className="form">
                        <input className="form-control" type="search" value={busca} placeholder="Procure aqui ..." aria-label="Search"
                            onChange={function (e) {

                                search(e.target.value)
                            }} />
                    </form>
                </nav>

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
                        {pedidosListaFormatada.map(function (pedido) {

                            return (
                                <>


                                    <div className="col border-bottom">{pedido.id_pedido}</div>
                                    <div className="col border-bottom">{pedido.num_mesa}</div>
                                    <div className="col border-bottom">

                                        {/*<i className="bi bi-trash" onClick={function () {

                                        }}></i> */}

                                        <i className="bi bi-pencil-square" onClick={function () {
                                            navigate(`/visualizar/pedido/${pedido.id_pedido}/${pedido.status}`)
                                        }}></i>
                                    </div>

                                </>
                            )
                        })}
                    </div >
                </div>

                <br />

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link text-dark" onClick={function () {

                                if (paginaAtual <= 1) {

                                    paginacao(1)
                                    set_paginaAtual(1)
                                }
                                else {

                                    paginacao(paginaAtual - 1)
                                    set_paginaAtual(paginaAtual - 1)
                                }
                            }}>Voltar</a>
                        </li>
                        <li className="page-item"><a className="page-link text-dark">{paginaAtual} de {ultimaPagina == 0 ? "1" : ultimaPagina}</a></li>
                        <li className="page-item">
                            <a className="page-link text-dark" onClick={function () {

                                paginacao(paginaAtual + 1)
                                if (paginaAtual + 1 <= ultimaPagina) {

                                    set_paginaAtual(paginaAtual + 1)
                                }
                            }}>Próximo</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default ListagemPedidosProcessando