import { Link } from "react-router-dom"

function LeftBar() {
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-2 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">

                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center  align-items-sm-start" id="comanda">
                                <li className="nav-item">
                                    <a href="#comanda" className="nav-link align-middle px-0">
                                        <span className="iconify text-white" data-icon="bi:house-fill"></span>
                                        <span className="ms-1 d-none d-sm-inline text-white">Nome do Restaurante</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#submenu0" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <span class="iconify text-white" data-icon="material-symbols-light:book"></span>
                                        <span className="ms-1 d-none d-sm-inline text-white">Comanda</span>
                                    </a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu0">
                                        <hr />
                                        <li className="w-100">
                                            <Link className="nav-link px-0 text-white" to="comanda/mesa">Comanda da Mesa</Link>
                                        </li>
                                        <hr />
                                    </ul>
                                </li>


                                <li>
                                    <a href="#cardapio" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <span className="iconify text-white" data-icon="bi:book-fill"></span>
                                        <span className="ms-1 d-none d-sm-inline text-white">Menu</span>
                                    </a>
                                    <ul className="collapse nav flex-column ms-1" id="cardapio" data-bs-parent="#menu">
                                        <hr />
                                        <li className="w-100">
                                            <a href="#" className="nav-link px-0 text-white"> Bebida </a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a href="#" className="nav-link px-0 text-white"> Lanche </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftBar