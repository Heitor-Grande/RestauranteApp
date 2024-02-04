import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BtnVoltar from "../../../components/btnVoltar"

function DetalhesMesa() {

    const navigate = useNavigate()
    const params = useParams()

    const [status, setStatus] = useState(false)
    const [totalMesa, set_totalMesa] = useState("")
    function carregarMesas() {

        axios.get(`${process.env.REACT_APP_API}/selecionar/mesa/${localStorage.getItem("tokenCasa")}/${params.id_mesa}`)
            .then(function (resposta) {

                if (resposta.data.codigo != 200) {

                    toast.error(resposta.data.message)
                }
                else {

                    setStatus(resposta.data.mesa[0].status)
                    set_totalMesa("R$" + resposta.data.mesa[0].total.toString().replace(/\./g, ','))
                }
            }).catch(function (erro) {

                toast.error(erro)
            })
    }

    function alterarStatusMesa(status) {

        const dados = {
            status: status
        }

        axios.put(`${process.env.REACT_APP_API}/alterar/status/${localStorage.getItem("tokenCasa")}/${params.id_mesa}`, dados)
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

    useEffect(function () {

        carregarMesas()
    }, [])




    return (
        <>
            <div className="col py-3">
                
                <BtnVoltar/>

                <div className="text-center">
                    <i class="bi bi-table fs-4"></i>
                    <span className="d-block">Mesa {params.id_mesa}</span>
                </div>
                <hr />

                <br />

                <div class="form-check form-switch">
                    <label class="form-check-label" for="flexSwitchCheckChecked">Aberta</label>
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={status}
                        onChange={function (e) {

                            setStatus(e.target.checked)
                            alterarStatusMesa(e.target.checked)
                        }}
                    />
                </div>

                <p>Total da mesa: {totalMesa}</p>

                <button type="button" class="btn btn-link d-block m-auto">Gerar QR da mesa</button>
                <br />
                <button type="button" className="btn btn-secondary d-block m-auto">Ver Pedidos</button>
            </div>
        </>
    )
}

export default DetalhesMesa