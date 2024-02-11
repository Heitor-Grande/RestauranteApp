import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function ListagemMesas() {
    const navigate = useNavigate()

    const [mesas, set_mesas] = useState([])
    function criarMesa() {

        axios.post(`${process.env.REACT_APP_API}/criar/mesa/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo == 200) {

                    toast.success(resposta.data.message)
                    carregarMesas()
                }
                else {

                    toast.error(resposta.data.message)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    function carregarMesas() {

        axios.get(`${process.env.REACT_APP_API}/selecionar/mesas/${localStorage.getItem("tokenCasa")}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    set_mesas(resposta.data.mesas)
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    useEffect(function () {
        carregarMesas()
    }, [])

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block" onClick={criarMesa}>Mesa <i class="bi bi-plus-circle"></i></button>
                <small className="p-1">v1.0.0</small>
                <br />

                <div className="container">
                    <div className="row">
                        {mesas.map(function (mesa) {

                            return (
                                <>
                                    <div className={mesa.status == true ? "col border text-center bg-success" : "col border text-center bg-danger"} onClick={function () {
                                        navigate(`/visualizar/detalhes/mesa/${mesa.id_mesa}`)
                                    }}>

                                        <i class="bi bi-table fs-4 text-white d-block"></i>
                                        <span className="text-white">{mesa.id_mesa}</span>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListagemMesas