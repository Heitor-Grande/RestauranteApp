import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
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
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    const [idDeletar, setIdDeletar] = useState("")
    function deletarCategoria() {

        axios.delete(`${process.env.REACT_APP_API}/del/categoria/${localStorage.getItem("tokenCasa")}/${idDeletar}`)
            .then(function(resposta){

                if(resposta.data.codigo != 200){

                    toast.error(resposta.data.message)
                }
                else{

                    toast.success(resposta.data.message)
                    ListarCategoriasAll()
                    setShow(false)
                }
            }).catch(function(erro){

                toast.error(erro)
            })
    }

    useEffect(function () {
        ListarCategoriasAll()
    }, [])

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={function () {
                    navigate("/formulario/categoria/criar")
                }}>Categorias <FaPlus /></button>

                <br />

                <form className="form-inline d-flex">
                    <input className="form-control mr-sm-2 m-1" type="search" placeholder="Buscar por categoria" aria-label="Search" />
                    <button className="btn btn-secondary m-1" type="submit">
                        <span className="iconify" data-icon="material-symbols:search"></span>
                    </button>
                </form>

                <br />

                <div className="container">
                    <div className="row">
                        <div className="col-1 bg-secondary text-white p-0">ID</div>
                        <div className="col bg-secondary text-white">Categoria</div>
                        <div className="col bg-secondary text-white">Status</div>
                        <div className="col bg-secondary text-white">Ações</div>

                        {listaCategorias.map(function (categoria) {

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