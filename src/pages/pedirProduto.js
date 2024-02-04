import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { toast } from 'react-toastify'
import BtnPedidos from "../components/buttonPedido";
import BtnVoltar from "../components/btnVoltar";


function PedirProduto() {

    const params = useParams()
    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    //variaveis
    const [quantidadePedido, set_quantidadePedido] = useState("")
    const [nomeCliente, set_nomeCliente] = useState("")


    const [produto, set_produto] = useState([])
    function carregarProduto() {

        set_carregando(false)

        axios.get(`${process.env.REACT_APP_API}/produtoid/produtos/${sessionStorage.getItem("tokenCliente") || localStorage.getItem("tokenCasa")}/${params.id_produto}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    set_produto(resposta.data.produto)
                }
            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    function addAoPedido() {

    }


    useEffect(function () {

        carregarProduto()
    }, [])

    return (
        <>
            <div className="col py-3">

                <BtnVoltar />

                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" hidden={carregando}>

                    </div>
                </div>

                {produto.map(function (produto) {

                    return (
                        <>

                            <form onSubmit={function (e) {

                                e.preventDefault()
                                document.querySelector("#btnAbrirModal_btn").click()

                            }}>
                                <div className="card">

                                    <div className="card-body p-0">
                                        <div className="container p-1">
                                            <div className="row">
                                                <div className="col text-center">
                                                    <img src={produto.img} className="d-inline-block h-25 w-50" alt="..." />
                                                    <h5 className="card-title text-center">{produto.nome}</h5>
                                                    <textarea name="" className="form-control d-block m-auto" required value={produto.descricao} disabled id="" cols="30" rows="5"
                                                        placeholder="Breve Descrição do produto" maxLength={100}></textarea>
                                                </div>
                                                <div className="col">
                                                    <div className="controle">

                                                        <div className="w-100 p-1"></div>
                                                        <input type="number" placeholder="Quantidade" className="text-center form-control w-100 d-block m-auto" required value={quantidadePedido} onChange={function (e) {
                                                            set_quantidadePedido(e.target.value)
                                                        }} />
                                                        <div className="w-100 p-1"></div>
                                                        <h5 className="text-center">R${produto.preco.toString().replace('.', ',')}</h5>
                                                        <textarea className="form-control" aria-label="With textarea" placeholder="Escreva aqui suas obervações para o pedido" cols={30} rows={5}></textarea>
                                                    </div>
                                                    <br />

                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col">
                                                    <button type="submit" className="btn btn-secondary m-auto w-100">Adicionar ao Pedido</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <BtnPedidos />
                        </>
                    )
                })}
            </div>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#btnAbrirModal" id="btnAbrirModal_btn" hidden>
                Launch demo modal
            </button>


            <div className="modal fade" id="btnAbrirModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Quem está pedindo ?</h5>
                            <button type="button" className="close" data-dismiss="modal" id="fecharModalNome" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={function (e) {
                            e.preventDefault()

                            document.querySelector("#fecharModalNome").click()
                            addAoPedido()
                        }}>
                            <div className="modal-body">
                                <p>Por que pedimos o nome nos pedidos ?</p>

                                <ul>
                                    <li><small>Solicitar o nome ajuda a garantir que cada refeição seja entregue ao destinatário correto.</small></li>
                                    <li><small>O nome dos clientes permite uma comunicação mais eficiente.</small></li>
                                </ul>

                                <br />
                                <input type="text" className="text-center form-control w-100 d-block m-auto" value={nomeCliente} placeholder="Nome" required onChange={function (e) {
                                    set_nomeCliente(e.target.value)
                                }} />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-secondary btn-sm">Finalizar Pedido</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PedirProduto