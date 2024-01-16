import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaQuestion } from "react-icons/fa"

function PedirProduto() {

    const params = useParams()
    const navigate = useNavigate()

    //controle modal
    const [show, setShow] = useState(false)

    //variaveis
    const [quantidadePedido, set_quantidadePedido] = useState("")
    const [nomeCliente, set_nomeCliente] = useState("")


    function addAoPedido(e) {
        e.preventDefault()
        setShow(true)
    }

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

                <form onSubmit={function (e) {
                    e.preventDefault()
                    setShow(true)
                }}>
                    <div className="card">
                        <img src="https://conteudo.imguol.com.br/c/entretenimento/ee/2022/04/28/hamburguer-sanduiche-lanche-1651166602338_v2_4x3.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Lanche Qualquer cosia</h5>
                            <p className="card-text">Uma descrição do produto direta e clara sobre o Lanche Qualquer coisa.</p>
                            <br />
                            <div className="controle">
                                <input type="text" className="text-center form-control w-75 d-block m-auto" value={nomeCliente} placeholder="Nome do Cliente" required onChange={function(e){
                                    set_nomeCliente(e.target.value)
                                }} />
                                <br />
                                <input type="number" placeholder="Quantidade" className="text-center form-control w-50 d-block m-auto" required value={quantidadePedido} onChange={function (e) {
                                    set_quantidadePedido(e.target.value)
                                }} />
                                <br />

                                <span className="input-group-text">Obervações</span>
                                <textarea className="form-control" aria-label="With textarea" placeholder="Escreva aqui suas obervações para o pedido"></textarea>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-secondary m-auto d-block w-100">Adicionar ao Pedido</button>
                        </div>
                    </div>
                </form>
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