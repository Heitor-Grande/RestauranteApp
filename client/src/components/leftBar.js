import { Link } from "react-router-dom"

function LeftBar() {


    return (
        <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-3 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="comanda">
                        <li className="nav-item">
                            <a href="/" className="nav-link align-middle px-0">
                                <span className="iconify text-white" data-icon="bi:house-fill"></span>
                                <span className="ms-1 d-none d-sm-inline text-white">Nome do Restaurante</span>
                            </a>
                        </li>

                        <br />


                        <li className="w-100">
                            <hr />
                            <a href="#submenu0" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <span className="iconify text-white" data-icon="material-symbols-light:book"></span>
                                <span className="ms-1 d-none d-sm-inline text-white">Comanda</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1 bg-secondary p-1" id="submenu0">
                                <hr />
                                <li className="w-100">
                                    <a className="nav-link px-0 text-white" href="/comanda/mesa">Comanda da Mesa</a>
                                </li>
                                <hr />
                            </ul>
                        </li>

                        <li className="w-100">
                            <hr />
                            <a href="#cardapio" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <span className="iconify text-white" data-icon="bi:book-fill"></span>
                                <span className="ms-1 d-none d-sm-inline text-white">Menu</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1 bg-secondary p-1" id="cardapio" data-bs-parent="#menu">
                                <hr />
                                <li className="w-100">
                                    <a href="/listar/produtos/categoria/bebida" className="nav-link px-0 text-white"> Lanche </a>
                                </li>
                            </ul>
                        </li>

                        <br />
                        <br />
                        <br />

                        <li className="w-100">
                            <hr />
                            <a href="#configuraCasa" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                <span className="iconify text-white" data-icon="dashicons:admin-tools"></span>
                                <span className="ms-1 d-none d-sm-inline text-white">Menu Administrativo</span>
                            </a>

                            <ul className="collapse nav flex-column ms-1 bg-secondary p-1" id="configuraCasa" data-bs-parent="#menu">

                                <hr />
                                <li>
                                    <a href="#Cadastros" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                        Cadastros
                                    </a>

                                    <ul className="collapse nav flex-column ms-1" id="Cadastros" data-bs-parent="#menu">
                                        <hr />
                                        <li>
                                            <a href="/carregar/categorias/lista" className="nav-link px-0 text-white"> Categorias </a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a href="#" className="nav-link px-0 text-white"> Produtos </a>
                                        </li>
                                    </ul>
                                </li>

                                <hr />
                                <li>
                                    <a href="#Pedidos" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                        Pedidos
                                    </a>

                                    <ul className="collapse nav flex-column ms-1 bg-secondary p-1" id="Pedidos" data-bs-parent="#menu">
                                        <hr />
                                        <li>
                                            <a href="#" className="nav-link px-0 text-white"> Pendentes </a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a href="#" className="nav-link px-0 text-white"> Processando </a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a href="#" className="nav-link px-0 text-white"> Concluido </a>
                                        </li>
                                    </ul>
                                </li>

                                <hr />
                                <li>
                                    <a href="#Mesas" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                        Mesas
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <br />
                </div>
            </div>
        </>
    )
}

export default LeftBar