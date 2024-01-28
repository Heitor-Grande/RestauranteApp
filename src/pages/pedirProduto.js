import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaQuestion } from "react-icons/fa"
import axios from "axios";
import { toast } from 'react-toastify'
import BtnPedidos from "../components/buttonPedido";


function PedirProduto() {

    const params = useParams()
    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    //controle modal
    const [show, setShow] = useState(false)

    //variaveis
    const [quantidadePedido, set_quantidadePedido] = useState("")
    const [nomeCliente, set_nomeCliente] = useState("")


    const [produto, set_produto] = useState([])
    function carregarProduto() {

        set_carregando(false)

        axios.get(`${process.env.REACT_APP_API}/produtoid/produtos/${localStorage.getItem("tokenCliente") || localStorage.getItem("tokenCasa")}/${params.id_produto}`)
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

    function addAoPedido(e) {
        e.preventDefault()
        setShow(true)
    }


    useEffect(function () {

        carregarProduto()
    }, [])

    return (
        <>
            <div className="col py-3">

                <button className="btn btn-secondary d-block w-25 p-1"
                    onClick={function () {
                        navigate(-1)
                    }}>
                    <span className="iconify" data-icon="icon-park-solid:back"></span>
                </button>

                <br />

                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" hidden={carregando}>

                    </div>
                </div>

                {produto.map(function (produto) {

                    return (
                        <>
                            <form onSubmit={function (e) {
                                e.preventDefault()
                                setShow(true)
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
                                                        <input type="text" className="text-center form-control w-100 d-block m-auto" value={nomeCliente} placeholder="Nome do Cliente" required onChange={function (e) {
                                                            set_nomeCliente(e.target.value)
                                                        }} />
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


            {/**MODAL CONFIRMAR PEDIDO */}
            <Modal show={show} onHide={function () {
                setShow(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center"><FaQuestion size={50} /></p>
                    <p className="text-center">Adicionar ao pedido ?</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button size="sm" variant="danger" onClick={function () {
                        setShow(false)
                    }}>
                        Cancelar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={function () {
                        addAoPedido()
                    }}>
                        Adiocionar ao Pedido
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PedirProduto