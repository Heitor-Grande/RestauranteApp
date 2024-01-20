import { useParams } from "react-router-dom"

function ListagemProdutos() {

    const params = useParams()

    return (
        <>

            <div className="col py-3">
                <nav className="navbar navbar-light bg-light">
                    <form className="form-inline d-flex">
                        <input className="form-control mr-sm-2 m-1" type="search" placeholder={params.categoria} aria-label="Search" />
                        <button className="btn btn-secondary m-1" type="submit">
                            <span className="iconify" data-icon="material-symbols:search"></span>
                        </button>
                    </form>
                </nav>
                <br />
                <br />

                <div className="card">
                    <img src="https://conteudo.imguol.com.br/c/entretenimento/ee/2022/04/28/hamburguer-sanduiche-lanche-1651166602338_v2_4x3.jpg" className="img-thumbnail" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Lanche Qualquer cosia</h5>
                        <p className="card-text">Uma descrição do produto direta e clara sobre o Lanche Qualquer coisa e seus igredientes de destaque</p>
                        <a href="/carregar/produto/1" className="btn btn-secondary m-auto d-block" data-toggle="modal" data-target="#exampleModal"><span className="iconify" data-icon="ph:plus-square-bold"></span></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListagemProdutos