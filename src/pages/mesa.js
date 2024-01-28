
import BtnPedidos from "../components/buttonPedido"

function Mesa() {
    return (
        <>

            <div className="col py-3">
                <div className="card h-50">
                    <div className="card-body">
                        <div id="carouselExampleInterval" className="carousel slide p-2 h-100" data-bs-ride="carousel">
                            <div className="carousel-inner h-100">
                                <div className="h-100 carousel-item bg-secondary active p-2" data-bs-interval="5000">
                                    <div className="p-1 text-center bg-white h-100">
                                        <p>Precisa de algo ?</p>
                                        <p>Chame um de nossos gaçons!</p>

                                        <button type="button" className="btn btn-secondary btn-sm w-75 mt-3 p-1">
                                            <span className="iconify" data-icon="ant-design:alert-filled"></span>
                                            <label htmlFor="" className="w-100">Chamar</label>
                                        </button>
                                    </div>
                                </div>
                                <div className="h-100 carousel-item bg-secondary p-2" data-bs-interval="5000">
                                    <div className="p-1 text-center bg-white h-100">
                                        <p>Total da Mesa</p>

                                        <button type="button" className="btn btn-secondary btn-sm w-75 mt-3 p-1">
                                            <span className="iconify" data-icon="grommet-icons:money"></span>
                                            <label htmlFor="" className="w-100">R$100,00</label>
                                        </button>
                                    </div>
                                </div>
                                <div className="h-100 carousel-item bg-secondary p-2" data-bs-interval="5000">
                                    <div className="p-1 text-center bg-white h-100">
                                        <p>Detalhes dos pedidos</p>

                                        <button type="button" className="btn btn-secondary btn-sm w-75 mt-3 p-1">
                                            <span className="iconify" data-icon="lets-icons:order"></span>
                                            <label htmlFor="" className="w-100">Ver pedidos</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next text-dark" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <BtnPedidos/>
            </div>

        </>
    )
}

export default Mesa