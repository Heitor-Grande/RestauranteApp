import { GiTable } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";

function ListagemMesas() {
    const navigate = useNavigate()
    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={function () {
                    //função que ira criar uma nova mesa a cada click
                    alert("Criou mesa")
                }}>Mesa <FaPlus /></button>

                <br />

                <div className="container">
                    <div className="row">
                        <div className="col border text-center">
                            <GiTable size={50} onClick={function () {
                                navigate("/visualizar/detalhes/mesa/1")
                            }} />
                            <span>Mesa 1</span>
                        </div>
                        <div className="col border text-center">
                            <GiTable size={50} onClick={function () {
                                navigate("/visualizar/detalhes/mesa/2")
                            }} />
                            <span>Mesa 2</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListagemMesas