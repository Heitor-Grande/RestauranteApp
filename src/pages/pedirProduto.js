import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaQuestion } from "react-icons/fa"
import axios from "axios";
import { toast } from 'react-toastify'


function PedirProduto() {

    const params = useParams()
    const navigate = useNavigate()

    //controle modal
    const [show, setShow] = useState(false)

    //variaveis
    const [quantidadePedido, set_quantidadePedido] = useState("")
    const [nomeCliente, set_nomeCliente] = useState("")


    const [produto, set_produto] = useState([])
    function carregarProduto() {

        axios.get(`${process.env.REACT_APP_API}/produtoid/produtos/${localStorage.getItem("tokenCliente") || localStorage.getItem("tokenCasa")}/${params.id_produto}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    set_produto(resposta.data.produto)
                }
            }).catch(function (erro) {

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

                {produto.map(function (produto) {

                    return (
                        <>
                            <form onSubmit={function (e) {
                                e.preventDefault()
                                setShow(true)
                            }}>
                                <div className="card">

                                    <div className="card-body text-center">
                                        <img src={produto.img} className="d-inline-block h-50 w-50" alt="..." />
                                        <hr />
                                        <h5 className="card-title text-center">{produto.nome}</h5>
                                        <textarea name="" className="form-control d-block" required value={produto.descricao} disabled id="" cols="30" rows="5"
                                            placeholder="Breve Descrição do produto" maxLength={100}></textarea>
                                        <br />
                                        <div className="controle">
                                            <input type="text" className="text-center form-control w-75 d-block m-auto" value={nomeCliente} placeholder="Nome do Cliente" required onChange={function (e) {
                                                set_nomeCliente(e.target.value)
                                            }} />
                                            <br />
                                            <input type="number" placeholder="Quantidade" className="text-center form-control w-50 d-block m-auto" required value={quantidadePedido} onChange={function (e) {
                                                set_quantidadePedido(e.target.value)
                                            }} />
                                            <br />
                                            <h5 className="text-center">R${produto.preco.toString().replace('.', ',')}</h5>
                                            <span className="input-group-text">Obervações</span>
                                            <textarea className="form-control" aria-label="With textarea" placeholder="Escreva aqui suas obervações para o pedido"></textarea>
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-secondary m-auto d-block w-100">Adicionar ao Pedido</button>
                                    </div>
                                </div>
                            </form>
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