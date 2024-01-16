import { GiTable } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DetalhesMesa() {

    const navigate = useNavigate()

    const [status, setStatus] = useState(false)


    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block w-25 p-1"
                    onClick={function () {
                        navigate(-1)
                    }}>
                    <span className="iconify" data-icon="icon-park-solid:back"></span>
                </button>
                <div className="text-center">
                    <GiTable size={50} />
                    <span className="d-block">Mesa id</span>
                </div>
                <hr />

                <br />

                <div class="form-check form-switch">
                    <label class="form-check-label" for="flexSwitchCheckChecked">Aberta</label>
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                </div>

                <p>Total da mesa: R$100,00</p>

                <button type="button" class="btn btn-link d-block m-auto">Gerar QR da mesa</button>
                <br />
                <button type="button" className="btn btn-secondary d-block m-auto">Ver Pedidos</button>
            </div>
        </>
    )
}

export default DetalhesMesa