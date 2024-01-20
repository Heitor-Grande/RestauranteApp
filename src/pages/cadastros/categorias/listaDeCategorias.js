import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { useFetcher, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, useToast } from "react-toastify"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaQuestion } from "react-icons/fa"

function ListaDeCategorias() {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const [listaCategorias, set_listaCategorias] = useState([])
    function ListarCategoriasAll() {
        axios.get(`${process.env.REACT_APP_API}/all/categorias/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.codigo)
                }
                else {

                    set_listaCategorias(resposta.data.categorias)
                    set_categoriaListaFormatada(resposta.data.categorias)
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [idDeletar, setIdDeletar] = useState("")
    function deletarCategoria() {

        axios.delete(`${process.env.REACT_APP_API}/del/categoria/${localStorage.getItem("tokenCasa")}/${idDeletar}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    toast.success(resposta.data.message)
                    ListarCategoriasAll()
                    setShow(false)
                }
            }).catch(function (erro) {

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


        if (categorias_da_pagina.length == 0) {

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

        ListarCategoriasAll()
        set_paginaAtual(1)
    }, [])

    useEffect(function () {

        paginacao(1)
    }, [listaCategorias])

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={function () {
                    navigate("/formulario/categoria/criar")
                }}>Categorias <FaPlus /></button>

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

                <div className="container">
                    <div className="row">
                        <div className="col-1 bg-secondary text-white p-0">ID</div>
                        <div className="col bg-secondary text-white">Categoria</div>
                        <div className="col bg-secondary text-white">Status</div>
                        <div className="col bg-secondary text-white">Ações</div>

                        {categoriasListaFormatada.map(function (categoria) {

                            return (
                                <>
                                    <div className="w-100"></div>
                                    <div className="col-1 border-bottom p-0">{categoria.id_categoria}</div>
                                    <div className="col border-bottom">{categoria.categoria}</div>
                                    <div className={categoria.ativo == true ? "col border-bottom bg-success text-center" : "col border-bottom bg-danger text-center"}>{categoria.ativo == true ? "ATIVO" : "INATIVO"}</div>
                                    <div className="col border-bottom">
                                        <MdDeleteForever onClick={function () {
                                            setIdDeletar(categoria.id_categoria)
                                            setShow(true)
                                        }} />

                                        <FaEdit onClick={function () {
                                            navigate(`/formulario/categoria/editar/${categoria.id_categoria}`)
                                        }} />
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
                            <a className="page-link" onClick={function () {

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
                        <li className="page-item disabled px-5 py-1 border">{paginaAtual} de {ultimaPagina}</li>
                        <li className="page-item">
                            <a className="page-link" onClick={function () {

                                paginacao(paginaAtual + 1)
                                if(paginaAtual + 1 <= ultimaPagina){

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
                    <p className="text-center"><FaQuestion size={50} /></p>
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