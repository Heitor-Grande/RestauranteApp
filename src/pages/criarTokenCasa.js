import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function CriarTokenCasa() {

    const navigate = useNavigate()

    function BuscarToken() {
        alert(2)
        axios.get(`${process.env.REACT_APP_API}/criar/jwt/casa`).then(function (resposta) {
            alert(3)
            if (resposta.data.codigo == 400) {
                toast.error(resposta.data.message)
            }
            else {
                localStorage.setItem("tokenCasa", resposta.data.token)
                navigate("/")
            }
        }).catch(function (erro) {

            toast.error(erro)
        })

    }

    useEffect(function () {
        alert("1")
        BuscarToken()
    }, [])

    return (
        <>
            <h2>ENTRANDO</h2>
        </>
    )
}

export default CriarTokenCasa