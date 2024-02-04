import { useNavigate } from "react-router-dom"
import BtnVoltar from "../components/btnVoltar"

function MeusPedidos() {


    return (
        <>
            <div className="col py-3">

                <BtnVoltar/>


                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Pedido #1</h4>
                        {/*<h6 className="card-subtitle mb-2 text-muted">Status: <i>Pendente</i></h6> */}
                        <h6 className="card-subtitle mb-2 text-muted">Total: R$9,00</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Pedido de: <b>Heitor Grande</b></h6>

                        <br />

                        <p className="mb-0"><b>Produtos pedidos:</b></p>
                        <p><i>2 - Coca-Cola Lata - R$4,50 und - total: R$9,00</i></p>
                        
                        <br />
                        <button className="btn btn-secondary w-100">Finalizar Pedido</button>
                    </div>
                </div>

                <br />
            </div>
        </>
    )
}

export default MeusPedidos

