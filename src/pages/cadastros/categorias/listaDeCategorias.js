import { useFetcher, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, useToast } from "react-toastify"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function ListaDeCategorias() {

    const [carregando, set_carregando] = useState(true)

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const [listaCategorias, set_listaCategorias] = useState([])
    function ListarCategoriasAll() {

        set_carregando(false)

        axios.get(`${process.env.REACT_APP_API}/all/categorias/${localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {
                    set_carregando(true)
                    toast.error(resposta.data.codigo)
                }
                else {
                    set_carregando(true)
                    set_listaCategorias(resposta.data.categorias)
                    set_categoriaListaFormatada(resposta.data.categorias)
                }

            }).catch(function (erro) {
                set_carregando(true)
                toast.error(erro)
            })
    }

    const [idDeletar, setIdDeletar] = useState("")
    function deletarCategoria() {

        set_carregando(false)
        axios.delete(`${process.env.REACT_APP_API}/del/categoria/${localStorage.getItem("tokenCasa")}/${idDeletar}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    toast.success(resposta.data.message)
                    ListarCategoriasAll()
                    setShow(false)
                }
            }).catch(function (erro) {
                set_carregando(true)
                toast.error(erro)
            })
    }

    //PESQUISA
    const [busca, set_busca] = useState("")
    const [categoriasListaFormatada, set_categoriaListaFormatada] = useState([])
    function search(string) {

        set_busca(string)

        if (string == "") {

            ListarCategoriasAll()
            set_paginaAtual(1)
        }
        else {

            const search_formatada = string.toLowerCase()

            const encontrados = listaCategorias.filter(function (categoria) {

                const categoria_formatada = categoria.categoria.toLowerCase()

                return categoria_formatada.includes(search_formatada)
            })

            set_categoriaListaFormatada(encontrados)
            set_ultimaPagina(Math.round(categoriasListaFormatada.length / 10))
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

        const categorias_da_pagina = busca == "" ? listaCategorias.slice(indice_inicial, indice_final) : categoriasListaFormatada.slice(indice_inicial, indice_final)

        if (categorias_da_pagina.length == 0 && pgAtual != 1) {

            toast.error("Fim da lista.")
        }
        else {

            set_categoriaListaFormatada(categorias_da_pagina)
        }

        //CALCULANDO A ULTIMA PAGINA
        if (busca == "") {

            set_ultimaPagina(Math.round(listaCategorias.length / 10))
        }
        else {

            set_ultimaPagina(Math.round(categoriasListaFormatada.length / 10))
        }

    }

    useEffect(function () {

        set_paginaAtual(1)
        ListarCategoriasAll()
    }, [])

    useEffect(function () {

        paginacao(1)
    }, [listaCategorias])

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={function () {
                    navigate("/formulario/categoria/criar")
                }}>Categorias <i className="bi bi-plus-circle"></i></button>

                <br />

                <form className="form-inline d-flex">
                    <input className="form-control mr-sm-2 m-1" type="search" placeholder="Buscar por categoria" aria-label="Search"
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

                        <div className="col bg-secondary text-white text-center">Categoria</div>
                        <div className="col-1 bg-secondary text-white p-0 text-center">St</div>
                        <div className="col-3 bg-secondary text-white text-center">Ações</div>

                        {categoriasListaFormatada.map(function (categoria) {

                            return (
                                <>
                                    <div className="w-100"></div>

                                    <div className="col border-bottom">{categoria.categoria}</div>

                                    {categoria.id_categoria != 1 ?

                                        <>

                                            <div className={categoria.ativo == true ? "col-1 border-bottom bg-success text-center p-0" : "col-1 border-bottom bg-danger text-center p-0"}>{categoria.ativo == true ? "" : ""}</div>
                                            <div className="col-3 border-bottom">

                                                <i className="bi bi-trash disabled" onClick={function () {
                                                    setIdDeletar(categoria.id_categoria)
                                                    setShow(true)
                                                }}></i>

                                                <i className="bi bi-pencil-square" onClick={function () {
                                                    navigate(`/formulario/categoria/editar/${categoria.id_categoria}`)
                                                }}></i>
                                            </div>
                                        </>


                                        : ""}
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
                    <p className="text-center">Confirmar exclusão da categoria ?</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button size="sm" variant="danger" onClick={function () {
                        setShow(false)
                    }}>
                        Cancelar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={function () {

                        deletarCategoria()

                    }}>
                        Confirmar
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListaDeCategorias