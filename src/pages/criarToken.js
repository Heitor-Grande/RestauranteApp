import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


function CriarToken() {

    const navigate = useNavigate()
    const params = useParams()

    function BuscarToken() {
        axios.get(`${process.env.REACT_APP_API}/criar/jwt/${params.token_acesso}`).then(function (respostaToken) {

            if (respostaToken.data.codigo == 400) {
                toast.error(respostaToken.data.message)
            }
            else {

                sessionStorage.setItem("id_cliente", respostaToken.data.token.id_cliente)
                validarMesa(respostaToken)
            }
        }).catch(function (erro) {

            toast.error(erro)
        })

    }

    function validarMesa(respostaToken) {

        axios.get(`${process.env.REACT_APP_API}/validar/mesa/${params.num_mesa}/${sessionStorage.getItem("id_cliente")}`).then(function (resposta) {

            if (resposta.data.codigo == 400) {
                toast.error(resposta.data.message)
            }
            else {

                sessionStorage.setItem("tokenCliente", respostaToken.data.token.token)
                sessionStorage.setItem("id_mesa", resposta.data.mesa[0].id_mesa)
                sessionStorage.setItem("token_acesso", params.token_acesso)
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