import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function CriarToken() {

    const navigate = useNavigate()

    function BuscarToken(){
        axios.get(`${process.env.REACT_APP_API}/criar/jwt`).then(function(resposta){

            if(resposta.data.codigo == 400){
                toast.error(resposta.data.message)
            }
            else{
                localStorage.setItem("tokenCliente", resposta.data.token)
                navigate("/destaque/restaurante")
            }
        }).catch(function(erro){

            toast.error(erro)
        })

    }

    useEffect(function(){
        BuscarToken()
    }, [])

    return (
        <>
            <h2>ENTRANDO</h2>
        </>
    )
}

export default CriarToken