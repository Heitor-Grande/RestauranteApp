import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, useToast } from "react-toastify"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function ListagemDeProdutos() {

    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    const [show, setShow] = useState(false)

    const [listaprodutos, set_listaprodutos] = useState([])
    function ListarprodutosAll() {

        set_carregando(false)
        axios.get(`${process.env.REACT_APP_API}/all/produtos/${localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    set_listaprodutos(resposta.data.produtos)
                    set_produtoListaFormatada(resposta.data.produtos)
                }

            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    const [idDeletar, setIdDeletar] = useState("")
    function deletarproduto() {

        set_carregando(false)

        axios.delete(`${process.env.REACT_APP_API}/del/produto/${localStorage.getItem("tokenCasa")}/${idDeletar}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {
                    set_carregando(true)
                    toast.success(resposta.data.message)
                    ListarprodutosAll()
                    setShow(false)
                }
            }).catch(function (erro) {
                set_carregando(true)
                toast.error(erro)
            })
    }

    //PESQUISA
    const [busca, set_busca] = useState("")
    const [produtoListaFormatada, set_produtoListaFormatada] = useState([])
    function search(string) {

        set_busca(string)

        if (string == "") {

            ListarprodutosAll()
            set_paginaAtual(1)
        }
        else {

            const search_formatada = string.toLowerCase()

            const encontrados = listaprodutos.filter(function (produtos) {

                const produtos_formatado = produtos.produtos.toLowerCase()

                return produtos_formatado.includes(search_formatada)
            })

            set_produtoListaFormatada(encontrados)
            set_ultimaPagina(Math.round(produtoListaFormatada.length / 10))
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

        const produtos_da_pagina = busca == "" ? listaprodutos.slice(indice_inicial, indice_final) : produtoListaFormatada.slice(indice_inicial, indice_final)


        if (produtos_da_pagina.length == 0 && pgAtual != 1) {

            toast.error("Fim da lista.")
        }
        else {

            set_produtoListaFormatada(produtos_da_pagina)
        }

        //CALCULANDO A ULTIMA PAGINA
        if (busca == "") {

            set_ultimaPagina(Math.round(listaprodutos.length / 10))
        }
        else {

            set_ultimaPagina(Math.round(produtoListaFormatada.length / 10))
        }

    }

    useEffect(function () {

        ListarprodutosAll()
        set_paginaAtual(1)
    }, [])

    useEffect(function () {

        paginacao(1)
    }, [listaprodutos])

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={function () {
                    navigate("/formulario/produto/novo")
                }}>Produtos <i className="bi bi-plus-circle"></i></button>

                <br />

                <form className="form-inline d-flex">
                    <input className="form-control mr-sm-2 m-1" type="search" placeholder="Buscar por nome" aria-label="Search"
                        value={busca}
                        onChange={function (e) {

                            search(e.target.value)
                        }}
                    />

                </form>

                <br />

                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" hidden={carregando}>

                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col bg-secondary text-white text-center">Nome</div>
                        <div className="col-1 bg-secondary text-white p-0 text-center">St</div>
                        <div className="col-3 bg-secondary text-white text-center">Ações</div>

                        {produtoListaFormatada.map(function (produto) {

                            return (
                                <>
                                    <div className="w-100"></div>
                                    <div className="col border-bottom">{produto.nome}</div>
                                    <div className={produto.status == true ? "col-1 border-bottom bg-success text-center p-0" : "col-1 border-bottom bg-danger text-center p-0"}>{produto.status == true ? "" : ""}</div>
                                    <div className="col-3 border-bottom">

                                        <i className="bi bi-trash" onClick={function () {
                                            setIdDeletar(produto.id_produto)
                                            setShow(true)
                                        }}></i>

                                        <i className="bi bi-pencil-square" onClick={function () {
                                            navigate(`/formulario/produto/${produto.id_produto}`)
                                        }}></i>
                                    </div>
                                </>
                            )
                        })}
                    </div>
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

            {/**MODAL CONFIRMAR DELETE */}
            <Modal show={show} onHide={function () {
                setShow(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center"><i className="bi bi-question-lg"></i></p>
                    <p className="text-center">Confirmar exclusão do produto ?</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button size="sm" variant="danger" onClick={function () {
                        setShow(false)
                    }}>
                        Cancelar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={function () {

                        deletarproduto()

                    }}>
                        Confirmar
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListagemDeProdutos