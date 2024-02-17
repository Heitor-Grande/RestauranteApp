import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


function CriarTokenCasa() {

    const navigate = useNavigate()
    const params = useParams()

    function BuscarToken() {

        axios.get(`${process.env.REACT_APP_API}/criar/jwt/casa/${params.token_acesso}`).then(function (resposta) {

            if (resposta.data.codigo == 400) {
                toast.error(resposta.data.message)
            }
            else {
                localStorage.setItem("tokenCasa", resposta.data.token)
                sessionStorage.setItem("token_acesso", params.token_acesso)
                navigate("/visualizar/mesas")
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

export default CriarTokenCasa