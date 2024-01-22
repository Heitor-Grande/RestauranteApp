import { useEffect, useState } from "react"
import { useFetcher, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"
import { useParams } from "react-router-dom"


function FormularioProduto() {

    const params = useParams()
    const navigate = useNavigate()

    const [id, set_id] = useState("")
    const [nome, set_nome] = useState("")
    const [preco, set_preco] = useState("")
    const [descricao, set_descricao] = useState("")
    const [img, set_img] = useState("")
    const [status, set_status] = useState(true)
    const [id_categoria, set_id_categoria] = useState("")

    function InsertProduto(e) {

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

                toast.error(resposta.data.message)
            }
            else {

                toast.success(resposta.data.message)
                navigate(-1)
            }
        }).catch(function (erro) {

            toast.error(erro)
        })
    }

    function UpdateProduto(e) {

        e.preventDefault()

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

                toast.error(resposta.data.message)
            }
            else {

                toast.success(resposta.data.message)
                navigate(-1)
            }
        }).catch(function (erro) {

            toast.error(erro)
        })
    }

    function abrirInputFile() {

        document.getElementById('fileInput').click()
    }

    const [listaCategorias, set_listaCategorias] = useState([])
    function carregarCategorias() {

        axios.get(`${process.env.REACT_APP_API}/all/categorias/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.codigo)
                }
                else {

                    set_listaCategorias(resposta.data.categorias)
                }

            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    function selectprodutoPorID() {

        axios.get(`${process.env.REACT_APP_API}/produtoid/produtos/${localStorage.getItem("tokenCasa")}/${id}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    set_nome(resposta.data.produto[0].nome)
                    set_status(resposta.data.produto[0].status)
                    set_preco(resposta.data.produto[0].preco)
                    set_descricao(resposta.data.produto[0].descricao)
                    set_img(resposta.data.produto[0].img)
                    set_id_categoria(resposta.data.produto[0].id_categoria)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    useEffect(function () {
        
        carregarCategorias()
        set_id(params.id_produto)
    }, [])

    useEffect(function () {

        if(params.id_produto != "novo"){

            selectprodutoPorID() 
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
                                        <img src={img} alt="..." className="img-thumbnail" />
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
                                    <div className="col text-center">

                                        <button type="button" className={img == "" ? "btn btn-danger" : "btn btn-success"} onClick={abrirInputFile}>Imagem Ilustrativa</button>
                                        <input type="file" id="fileInput" onChange={function (e) {
                                            const file = e.target.files[0]

                                            if (file) {
                                                const reader = new FileReader()

                                                reader.onloadend = () => {
                                                    // O resultado é uma string base64
                                                    const base64String = reader.result

                                                    // Define a string base64 no estado usando setImg
                                                    set_img(base64String)
                                                };

                                                // Lê o arquivo como uma string base64
                                                reader.readAsDataURL(file)
                                            }
                                        }} hidden />
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
                                    <div className="col">
                                        <input type="text" required className="text-center d-inline form-control" value={nome} onChange={function (e) {
                                            set_nome(e.target.value)
                                        }} placeholder="Nome" maxLength={25} />
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
                                    <div className="col text-center">
                                        <input type="number" required className="text-center d-inline form-control w-75" value={preco} onChange={function (e) {

                                            set_preco(e.target.value)
                                        }} placeholder="Preço R$" />
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
                                    <div className="col text-center">

                                        <label className="">Categoria</label>
                                        <select className="form-select" value={id_categoria} required
                                            onChange={function (e) {

                                                set_id_categoria(e.target.value)
                                            }}>
                                            <option value=""></option>
                                            {listaCategorias.map(function (categoria) {

                                                return (
                                                    <>
                                                        <option value={categoria.id_categoria}>{categoria.categoria}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
                                    <div className="col">
                                        <textarea name="" className="form-control text-center" required value={descricao} onChange={function (e) {
                                            set_descricao(e.target.value)
                                        }} id="" cols="30" rows="5"
                                            placeholder="Breve Descrição do produto" maxLength={100}></textarea>
                                    </div>
                                    <div className="w-100"></div>
                                    <br />
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

                    <br />
                    <button type="submit" className="btn btn-secondary w-75 d-block m-auto">Salvar</button>
                </form>


            </div>
        </>
    )

}

export default FormularioProduto