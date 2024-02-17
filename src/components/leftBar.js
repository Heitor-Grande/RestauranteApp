import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function LeftBar() {

    const navigate = useNavigate()

    const [Permissao, setPermissao] = useState("")

    function ValidarJWT() {

        axios.get(`${process.env.REACT_APP_API}/validar/token/${sessionStorage.getItem("tokenCliente") || localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("token_acesso")}`)
            .then(function (resposta) {
                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                    navigate("/ler/novamente/qr/code")
                }
                else if (resposta.data.codigo == 200) {
                    
                    setPermissao(resposta.data.infoToken.token_validado)
                    sessionStorage.setItem("id_cliente", resposta.data.infoToken.id_cliente)
                    carregarCategorias()
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }


    const [categorias, set_categorias] = useState([])
    function carregarCategorias() {

        axios.get(`${process.env.REACT_APP_API}/all/categorias/ativas/${sessionStorage.getItem("tokenCliente") || localStorage.getItem("tokenCasa")}/${sessionStorage.getItem("id_cliente")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    set_categorias(resposta.data.categorias)
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    useEffect(function () {

        ValidarJWT()
    }, [])

    return (
        <>
            <div id="leftBar" className="col-auto col-md-3 col-xl-2 px-sm-2 px-3 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="comanda">
                        {/*<li className="nav-item">
                            <a href="/destaque/restaurante" className="nav-link align-middle px-0">
                                <i className="bi bi-house-fill text-white"></i>
                                <span className="ms-1 d-none d-sm-inline text-white">Nome do Restaurante</span>
                            </a>
                        </li>

                        <br /> */}


                        {Permissao == "newLoginCasa" ? "" : <li className="w-100" hidden={Permissao == "newLoginCasa" ? true : false}>

                            <a href="#submenu0" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="bi bi-journal-bookmark-fill text-white"></i>
                                <span className="ms-1 d-none d-sm-inline text-white">Comanda</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1 bg-secondary p-1" id="submenu0">
                                <hr />
                                <li className="w-100">
                                    <a className="nav-link px-0 text-white" href="/comanda/mesa">Comanda da Mesa</a>
                                </li>
                                <hr />
                            </ul>
                        </li>}


                        <li className="w-100">
                            <hr />
                            <a href="#cardapio" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="bi bi-book-fill text-white"></i>
                                <span className="ms-1 d-none d-sm-inline text-white">Menu</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1 bg-secondary p-1" id="cardapio" data-bs-parent="#menu">
                                {categorias.map(function (categoria) {

                                    return (
                                        <>
                                            <hr />
                                            <li className="w-100">
                                                <a href={`/listar/produtos/categoria/${categoria.id_categoria}`} className="nav-link px-0 text-white"> {categoria.categoria} </a>
                                            </li>
                                        </>
                                    )
                                })}
                            </ul>
                        </li>

                        <br />
                        <br />
                        <br />


                        {Permissao == "newLoginCasa" ? <li className="w-100">
                            <hr />
                            <a href="#configuraCasa" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                <i className="bi bi-gear-fill text-white"></i>
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
                                            <a href="/carregar/produtos/lista" className="nav-link px-0 text-white"> Produtos </a>
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
                                            <a href="/visualizar/pedidos/pendentes" className="nav-link px-0 text-white"> Pendentes </a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a href="/visualizar/pedidos/processando" className="nav-link px-0 text-white"> Processando </a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a href="/visualizar/pedidos/concluido" className="nav-link px-0 text-white"> Concluido </a>
                                        </li>
                                    </ul>
                                </li>

                                <hr />
                                <li>
                                    <a href="/visualizar/mesas" className="nav-link px-0 text-white">
                                        Mesas
                                    </a>
                                </li>
                            </ul>
                        </li> : ''}

                    </ul>

                    <br />
                </div>
            </div>
        </>
    )
}

export default LeftBar