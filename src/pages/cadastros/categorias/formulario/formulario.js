import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"

function FormularioCategoria(params) {

    const navigate = useNavigate()

    const [carregando, set_carregando] = useState(true)

    const [Categoria, set_Categoria] = useState("")
    const [ativo, set_ativo] = useState(true)

    function InsertCategoria(e) {

        e.preventDefault()

        set_carregando(false)

        const dados = {
            categoria: Categoria,
            ativo: ativo
        }

        axios.post(`${process.env.REACT_APP_API}/criar/categoria/${localStorage.getItem("tokenCasa")}`, dados).then(function (resposta) {

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


    function selectCategoriaPorID() {

        set_carregando(false)

        axios.get(`${process.env.REACT_APP_API}/categoriaid/categorias/${localStorage.getItem("tokenCasa")}/${params.id_categoria}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {
                    set_carregando(true)
                    toast.error(resposta.data.message)
                }
                else {
                    set_carregando(true)
                    set_Categoria(resposta.data.categoria[0].categoria)
                    set_ativo(resposta.data.categoria[0].ativo)
                }
            }).catch(function (erro) {
                set_carregando(true)
                toast.error(erro)
            })
    }

    function UpdateCategoria(e) {
        e.preventDefault()

        const dados = {
            categoria: Categoria,
            ativo: ativo,
            id_categoria: params.id_categoria
        }

        set_carregando(false)

        axios.put(`${process.env.REACT_APP_API}/editar/categoria/${localStorage.getItem("tokenCasa")}`, dados).then(function (resposta) {

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

    useEffect(function () {

        if (params.id_categoria != "novo") {
            selectCategoriaPorID()
        }
    }, [])

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
                <form className="form-inline" onSubmit={params.id_categoria == "novo" ? InsertCategoria : UpdateCategoria}>

                    <div className="inputs">
                        <div>
                            <input type="text" disabled className="text-center d-inline form-control w-25" value={params.id_categoria} placeholder="ID categoria" required />

                            <input type="text" required className="text-center d-inline form-control w-75" value={Categoria} onChange={function (e) {
                                set_Categoria(e.target.value)
                            }} placeholder="Categoria" />
                        </div>
                        <br />
                        <div className="form-check form-switch">
                            <label className="form-check-label">Ativo</label>
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={ativo} onChange={function (e) {
                                set_ativo(e.target.checked)
                            }} />
                        </div>
                    </div>

                    <br />
                    <button type="submit" className="btn btn-secondary w-75 d-block m-auto">Salvar</button>
                </form>
            </div>
        </>
    )
}

export default FormularioCategoria