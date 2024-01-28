import { useEffect, useState } from "react"
import { useFetcher, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"
import { useParams } from "react-router-dom"


function FormularioProduto() {

    const params = useParams()
    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    const [id, set_id] = useState("")
    const [nome, set_nome] = useState("")
    const [preco, set_preco] = useState("")
    const [descricao, set_descricao] = useState("")
    const [img, set_img] = useState("")
    const [status, set_status] = useState(true)
    const [id_categoria, set_id_categoria] = useState("")

    function InsertProduto(e) {

        set_carregando(false)

        e.preventDefault()

        const dados = {
            nome: nome,
            status: status,
            preco: preco.replace(/,/g, '.'),
            descricao: descricao,
            img: img,
            id_categoria: id_categoria
        }


        axios.post(`${process.env.REACT_APP_API}/criar/produto/${localStorage.getItem("tokenCasa")}`, dados).then(function (resposta) {

            if (resposta.data.codigo != 200) {
                set_carregando(true)
                toast.error(resposta.data.message)
            }
            else {
                set_carregando(true)
                toast.success(resposta.data.message)
                navigate(-1)
            }
        }).catch(function (erro) {
            set_carregando(true)
            toast.error(erro)
        })
    }

    function UpdateProduto(e) {

        e.preventDefault()

        set_carregando(false)

        const dados = {
            id_produto: id,
            nome: nome,
            status: status,
            preco: preco,
            descricao: descricao,
            img: img,
            id_categoria: id_categoria
        }


        axios.put(`${process.env.REACT_APP_API}/editar/produto/${localStorage.getItem("tokenCasa")}`, dados).then(function (resposta) {

            if (resposta.data.codigo != 200) {

                set_carregando(true)
                toast.error(resposta.data.message)
            }
            else {

                set_carregando(true)
                toast.success(resposta.data.message)
                navigate(-1)
            }
        }).catch(function (erro) {

            set_carregando(true)
            toast.error(erro)
        })
    }

    function abrirInputFile() {

        document.getElementById('fileInput').click()
    }

    const [listaCategorias, set_listaCategorias] = useState([])
    function carregarCategorias() {

        set_carregando(false)

        axios.get(`${process.env.REACT_APP_API}/all/categorias/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.codigo)
                }
                else {

                    set_carregando(true)
                    set_listaCategorias(resposta.data.categorias)
                }

            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    function selectprodutoPorID(id_prod) {

        set_carregando(false)

        axios.get(`${process.env.REACT_APP_API}/produtoid/produtos/${localStorage.getItem("tokenCasa")}/${id_prod}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {

                    set_carregando(true)
                    set_nome(resposta.data.produto[0].nome)
                    set_status(resposta.data.produto[0].status)
                    set_preco(resposta.data.produto[0].preco)
                    set_descricao(resposta.data.produto[0].descricao)
                    set_img(resposta.data.produto[0].img)
                    set_id_categoria(resposta.data.produto[0].id_categoria)
                }
            }).catch(function (erro) {

                set_carregando(true)
                toast.error(erro)
            })
    }

    useEffect(function () {

        carregarCategorias()
        set_id(params.id_produto)
    }, [])

    useEffect(function () {

        if (params.id_produto != "novo") {

            selectprodutoPorID(params.id_produto)
        }
    }, [id])


    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block w-25 p-1"
                    onClick={function () {
                        navigate(-1)
                    }}>
                    <span className="iconify" data-icon="icon-park-solid:back"></span>
                </button>

                <br />

                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" hidden={carregando}>

                    </div>
                </div>

                <form className="form-inline" onSubmit={params.id_produto == "novo" ? InsertProduto : UpdateProduto}>

                    <div className="inputs">
                        <br />
                        <div className="formulario">

                            <div className="container">
                                <div className="row">
                                    <div className="col-10">
                                        <input type="text" disabled className="text-center d-inline form-control w-50" value={id} placeholder="ID" required />
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
                                    <div className="col text-center">
                                        <img src={img} alt="..." className="img-thumbnail h-75 w-100 d-inline-block" />
                                        <div className="w-100"></div>
                                        <br />
                                        <div>
                                            <button type="button" className={img == "" ? "btn btn-danger" : "btn btn-success"} onClick={abrirInputFile}>Imagem</button>
                                            <input type="file" id="fileInput" onChange={function (e) {
                                                const file = e.target.files[0]

                                                if (file) {
                                                    const reader = new FileReader()

                                                    reader.onloadend = () => {
                                                        // O resultado é uma string base64
                                                        const base64String = reader.result

                                                        // Define a string base64 no estado usando setImg
                                                        set_img(base64String)
                                                    }

                                                    // Lê o arquivo como uma string base64
                                                    reader.readAsDataURL(file)
                                                }
                                            }} hidden />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <input type="text" required className="text-center d-inline form-control" value={nome} onChange={function (e) {
                                            set_nome(e.target.value)
                                        }} placeholder="Nome" maxLength={25} />

                                        <div className="w-100 p-1"></div>

                                        <input type="number" required className="text-center d-inline form-control" value={preco} onChange={function (e) {

                                            set_preco(e.target.value)
                                        }} placeholder="Preço R$" />

                                        <div className="w-100 p-1"></div>

                                        <select className="form-select" value={id_categoria} required
                                            onChange={function (e) {

                                                set_id_categoria(e.target.value)
                                            }}>
                                            <option className="text-secondary" value="" disabled>Categoria</option>
                                            {listaCategorias.map(function (categoria) {

                                                return (
                                                    <>
                                                        <option value={categoria.id_categoria}>{categoria.categoria}</option>
                                                    </>
                                                )
                                            })}
                                        </select>

                                        <div className="w-100 p-1"></div>

                                        <textarea name="" className="form-control" required value={descricao} onChange={function (e) {
                                            set_descricao(e.target.value)
                                        }} id="" cols="30" rows="5"
                                            placeholder="Breve Descrição do produto"></textarea>

                                        <div className="w-100 p-1"></div>

                                        <button type="submit" className="btn btn-secondary w-75 d-block m-auto">Salvar</button>
                                    </div>

                                    <div className="col">
                                        <div className="form-check form-switch">
                                            <label className="form-check-label">Ativo</label>
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={status} onChange={function (e) {
                                                set_status(e.target.checked)
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default FormularioProduto