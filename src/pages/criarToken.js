import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


function CriarToken() {

    const navigate = useNavigate()
    const params = useParams()

    function BuscarToken() {
        axios.get(`${process.env.REACT_APP_API}/criar/jwt`).then(function (respostaToken) {

            if (respostaToken.data.codigo == 400) {
                toast.error(respostaToken.data.message)
            }
            else {

                validarMesa(respostaToken)
            }
        }).catch(function (erro) {

            toast.error(erro)
        })

    }

    function validarMesa(respostaToken) {

        axios.get(`${process.env.REACT_APP_API}/validar/mesa/${params.id_mesa}`).then(function (resposta) {

            if (resposta.data.codigo == 400) {
                toast.error(resposta.data.message)
            }
            else {

                sessionStorage.setItem("tokenCliente", respostaToken.data.token)
                sessionStorage.setItem("id_mesa", params.id_mesa)
                navigate("/comanda/mesa")
            }
        }).catch(function (erro) {

            toast.error(erro)
        })
    }

    useEffect(function () {
        BuscarToken()
    }, [])

    return (
        <>
            <h2>ENTRANDO</h2>
        </>
    )
}

export default CriarToken