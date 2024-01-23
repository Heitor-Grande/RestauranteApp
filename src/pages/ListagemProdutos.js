import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

function ListagemProdutos() {

    const params = useParams()

    const [produtos, set_produtos] = useState([])
    function carregarProdutosDaCategoria() {

        axios.get(`${process.env.REACT_APP_API}/carrega/produtos/by/categoria/${localStorage.getItem("tokenCliente") || localStorage.getItem("tokenCasa")}/${params.categoria}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    set_produtos(resposta.data.produtos)
                    set_produtoListaFormatada(resposta.data.produtos)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    //PESQUISA
    const [busca, set_busca] = useState("")
    const [produtosListaFormatada, set_produtoListaFormatada] = useState([])
    function search(string) {

        set_busca(string)

        if (string == "") {

            carregarProdutosDaCategoria()
            set_paginaAtual(1)
        }
        else {

            const search_formatada = string.toLowerCase()

            const encontrados = produtosListaFormatada.filter(function (produto) {

                const produto_formatada = produto.nome.toLowerCase()

                return produto_formatada.includes(search_formatada)
            })

            set_produtoListaFormatada(encontrados)
            set_ultimaPagina(Math.round(produtosListaFormatada.length / 10))
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

        const categorias_da_pagina = busca == "" ? produtos.slice(indice_inicial, indice_final) : produtosListaFormatada.slice(indice_inicial, indice_final)

        if (categorias_da_pagina.length == 0 && pgAtual != 1) {

            toast.error("Fim da lista.")
        }
        else {

            set_produtoListaFormatada(categorias_da_pagina)
        }

        //CALCULANDO A ULTIMA PAGINA
        if (busca == "") {

            set_ultimaPagina(Math.round(produtos.length / 10))
        }
        else {

            set_ultimaPagina(Math.round(produtosListaFormatada.length / 10))
        }

    }

    useEffect(function () {

        set_paginaAtual(1)
        carregarProdutosDaCategoria()
    }, [])

    useEffect(function(){

        paginacao(1)
    }, [produtos])

    return (
        <>

            <div className="col py-3">
                <nav className="navbar navbar-light bg-light d-block">
                    <form className="form">
                        <input className="form-control" type="search" value={busca} placeholder="Procure aqui ..." aria-label="Search" 
                        onChange={function(e){

                            search(e.target.value)
                        }} />
                    </form>
                </nav>

                {produtosListaFormatada.map(function (produto) {

                    return (
                        <>
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <img src={produto.img} className="img-fluid d-block" />
                                    <br />
                                    <h5 className="card-title text-center">{produto.nome}</h5>
                                    <textarea name="" className="form-control d-block" required value={produto.descricao} disabled id="" cols="30" rows="5"
                                        placeholder="Breve Descrição do produto" maxLength={100}></textarea>
                                    <br />
                                    <h5 className="text-center">R${produto.preco.toString().replace(/\./g, ',')}</h5>
                                    <a href={`/carregar/produto/${produto.id_produto}`} className="btn btn-secondary m-auto d-block" data-toggle="modal" data-target="#exampleModal"><span className="iconify" data-icon="ph:plus-square-bold"></span></a>
                                </div>
                            </div>
                        </>
                    )
                })}

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

export default ListagemProdutos