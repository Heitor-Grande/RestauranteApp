import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

function ListaDeCategorias() {

    const navigate = useNavigate()

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={function(){
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
                        <div className="col bg-secondary text-white">ID</div>
                        <div className="col bg-secondary text-white">Categoria</div>
                        <div className="col bg-secondary text-white">Ações</div>
                        <div className="w-100"></div>
                        <div className="col border-bottom">1</div>
                        <div className="col border-bottom">Lanche</div>
                        <div className="col border-bottom">
                            <MdDeleteForever onClick={function () {
                                alert("deletar")
                            }} />

                            <FaEdit onClick={function () {
                                alert("Editando")
                            }} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaDeCategorias